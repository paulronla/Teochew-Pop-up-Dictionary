/*
 Teochew Pop-up Dictionary
 Copyright (C) 2019 Paul La
 https://github.com/paulronla/ 
 
 ---

 Zhongwen - A Chinese-English Pop-Up Dictionary
 Copyright (C) 2010-2019 Christian Schiller
 https://chrome.google.com/extensions/detail/kkmlkkjojmombglmlpbpapmhcaljjkde

 ---

 Originally based on Rikaikun 0.8
 Copyright (C) 2010 Erek Speed
 http://code.google.com/p/rikaikun/

 ---

 Originally based on Rikaichan 1.07
 by Jonathan Zarate
 http://www.polarcloud.com/

 ---

 Originally based on RikaiXUL 0.4 by Todd Rudick
 http://www.rikai.com/
 http://rikaixul.mozdev.org/

 ---

 This program is free software; you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation; either version 2 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program; if not, write to the Free Software
 Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA

 ---

 Please do not change or remove any of the copyrights or links to web pages
 when modifying any of the files.

 */

'use strict';

import { ZhongwenDictionary } from './dict.js';
import { genGraphQLQuery } from './background/graphql.js';

const API_URL = 'https://www.teochewspot.com';
const AWS_URL = 'https://ycsyuqckpfe5addllgynkolgba0dkniu.lambda-url.us-west-1.on.aws';
const API_URLS = [API_URL, AWS_URL];
const LB_API_URLS = [AWS_URL, API_URL, API_URL];

let isEnabled = localStorage['enabled'] === '1';

let isActivated = false;

let playingAudio = false;

let tabIDs = {};

let reversedMp3URLArr = [];

let dict;

let teochewDict = {};

let teochewAudioDict = {};

let zhongwenOptions = window.zhongwenOptions = {
    css: localStorage['popupcolor'] || 'yellow',
    tonecolors: localStorage['tonecolors'] || 'yes',
    fontSize: localStorage['fontSize'] || 'small',
    skritterTLD: localStorage['skritterTLD'] || 'com',
    pinyin: localStorage['pinyin'] || 'yes',
    zhuyin: localStorage['zhuyin'] || 'no',
    grammar: localStorage['grammar'] || 'yes',
    simpTrad: localStorage['simpTrad'] || 'classic',
    toneColorScheme: localStorage['toneColorScheme'] || 'standard'
};

function activateExtension(tabId, showHelp) {

    isEnabled = true;
    // values in localStorage are always strings
    localStorage['enabled'] = '1';
    
    API_URLS.forEach(url => fetch(url + '/extsearch')); //wake up services

    if (!dict) {
        loadDictionary().then(r => dict = r);
    }

    chrome.tabs.sendMessage(tabId, {
        'type': 'enable',
        'config': zhongwenOptions
    });

    if (showHelp) {
        chrome.tabs.sendMessage(tabId, {
            'type': 'showHelp'
        });
    }

    chrome.browserAction.setBadgeBackgroundColor({
        'color': [255, 0, 0, 255]
    });

    chrome.browserAction.setBadgeText({
        'text': 'On'
    });

    chrome.contextMenus.create(
        {
            title: 'Open word list',
            onclick: function () {
                let url = chrome.runtime.getURL('/wordlist.html');
                let tabID = tabIDs['wordlist'];
                if (tabID) {
                    chrome.tabs.get(tabID, function (tab) {
                        if (tab && tab.url && (tab.url.substr(-13) === 'wordlist.html')) {
                            chrome.tabs.reload(tabID);
                            chrome.tabs.update(tabID, {
                                active: true
                            });
                        } else {
                            chrome.tabs.create({
                                url: url
                            }, function (tab) {
                                tabIDs['wordlist'] = tab.id;
                                chrome.tabs.reload(tab.id);
                            });
                        }
                    });
                } else {
                    chrome.tabs.create(
                        { url: url },
                        function (tab) {
                            tabIDs['wordlist'] = tab.id;
                            chrome.tabs.reload(tab.id);
                        }
                    );
                }
            }
        }
    );
    chrome.contextMenus.create(
        {
            title: 'Show help in new tab',
            onclick: function () {
                let url = chrome.runtime.getURL('/help.html');
                let tabID = tabIDs['help'];
                if (tabID) {
                    chrome.tabs.get(tabID, function (tab) {
                        if (tab && (tab.url.substr(-9) === 'help.html')) {
                            chrome.tabs.reload(tabID);
                            chrome.tabs.update(tabID, {
                                active: true
                            });
                        } else {
                            chrome.tabs.create({
                                url: url
                            }, function (tab) {
                                tabIDs['help'] = tab.id;
                                chrome.tabs.reload(tab.id);
                            });
                        }
                    });
                } else {
                    chrome.tabs.create(
                        { url: url },
                        function (tab) {
                            tabIDs['help'] = tab.id;
                            chrome.tabs.reload(tab.id);
                        }
                    );
                }
            }
        }
    );

    let player = document.getElementById('teochew-ext-player');
    player.addEventListener('ended', playNext, false);

    isActivated = true;
}

async function loadDictData() {
    let wordDict = fetch(chrome.runtime.getURL(
        "data/cedict_ts.u8")).then(r => r.text());
    let wordIndex = fetch(chrome.runtime.getURL(
        "data/cedict.idx")).then(r => r.text());
    let grammarKeywords = fetch(chrome.runtime.getURL(
        "data/grammarKeywordsMin.json")).then(r => r.json());

    return Promise.all([wordDict, wordIndex, grammarKeywords]);
}


async function loadDictionary() {
    let [wordDict, wordIndex, grammarKeywords] = await loadDictData();
    return new ZhongwenDictionary(wordDict, wordIndex, grammarKeywords);
}

function deactivateExtension() {

    isEnabled = false;
    // values in localStorage are always strings
    localStorage['enabled'] = '0';

    dict = undefined;

    chrome.browserAction.setBadgeBackgroundColor({
        'color': [0, 0, 0, 0]
    });

    chrome.browserAction.setBadgeText({
        'text': ''
    });

    // Send a disable message to all tabs in all windows.
    chrome.windows.getAll(
        { 'populate': true },
        function (windows) {
            for (let i = 0; i < windows.length; ++i) {
                let tabs = windows[i].tabs;
                for (let j = 0; j < tabs.length; ++j) {
                    chrome.tabs.sendMessage(tabs[j].id, {
                        'type': 'disable'
                    });
                }
            }
        }
    );

    chrome.contextMenus.removeAll();

    let player = document.getElementById('teochew-ext-player');
    player.removeEventListener('ended', playNext, false);

    isActivated = false;
}

function activateExtensionToggle(currentTab) {
    if (isActivated) {
        deactivateExtension();
    } else {
        activateExtension(currentTab.id, true);
    }
}

function enableTab(tabId) {
    if (isEnabled) {

        if (!isActivated) {
            activateExtension(tabId, false);
        }

        chrome.tabs.sendMessage(tabId, {
            'type': 'enable',
            'config': zhongwenOptions
        });
    }
}

function search(text) {

    if (!dict) {
        // dictionary not loaded
        return;
    }

    let entry = dict.wordSearch(text);

    if (entry) {
        for (let i = 0; i < entry.data.length; i++) {
            let word = entry.data[i][1];
            if (dict.hasKeyword(word) && (entry.matchLen === word.length)) {
                // the final index should be the last one with the maximum length
                entry.grammar = { keyword: word, index: i };
            }
        }
    }

    return entry;
}

async function playAudio(chaoyin, teochewAudioDict) {
    if (playingAudio) {
        return;
    }

    playingAudio = true;

    //on the rare occasion array doesn't get cleared out in playNext callback
    while (reversedMp3URLArr.length) {
        URL.revokeObjectURL(reversedMp3URLArr.pop());
    }

    if (teochewAudioDict) {
        reversedMp3URLArr = await loadAudio(chaoyin, teochewAudioDict).catch(err => {
            console.log(err);
        }) || reversedMp3URLArr;
    }

    if (reversedMp3URLArr.length) {
        const player = document.getElementById('teochew-ext-player');
        player.src = reversedMp3URLArr[reversedMp3URLArr.length-1];
        player.play();
    }

    playingAudio = false;
}

function playNext() {
    URL.revokeObjectURL(reversedMp3URLArr.pop());

    if (reversedMp3URLArr.length) {
        const player = document.getElementById('teochew-ext-player');
        player.src = reversedMp3URLArr[reversedMp3URLArr.length-1];
        player.play();
    }
}

function loadAudio(chaoyin, teochewAudioDict) {
    const chaoyinArr = chaoyin.split(' ');

    return Promise.all(chaoyinArr.reverse().map(chaoyin => 
        fetch(API_URL + '/audio/' + teochewAudioDict[chaoyin] + '.mp3')
        .then(res => res.blob())
        .then(blob => URL.createObjectURL(blob))
    ));
}

function filterRepeatedChars(simpChars, tradChars) {
    const validSimpChars = mapInvalidChars(simpChars);
    const validTradChars = simpChars.length === validSimpChars.length ? tradChars
                            : mapInvalidChars(tradChars);
    const newSimpChars = [];
    const newTradChars = [];

    for (let i = 0; i < validSimpChars.length; i++) {
        if (teochewDict.hasOwnProperty(validSimpChars[i])
                || teochewDict.hasOwnProperty(validTradChars[i])) {
            continue;
        }
        
        newSimpChars.push(validSimpChars[i]);
        newTradChars.push(validTradChars[i]);
    }
    
    return  {
                newSimpChars: newSimpChars.join(''),
                newTradChars: newTradChars.join('')
            }
}

async function fetchAssets(backendHost, simpChin, tradChin) {
    if (backendHost.endsWith(".aws")) {
        let response = await genGraphQLQuery(backendHost, simpChin, tradChin);

        return response?.data?.genPartialDict || {pinyinChaoyinDictRes: {}, teochewAudioDictRes: {}};

    }
    else {
        return await fetch(`${backendHost}/extsearch/${simpChin}/${tradChin}`)
                    .then(res => res.json())
                    .catch(err => console.log(err))
                    || {pinyinChaoyinDictRes: {}, teochewAudioDictRes: {}};
    }
}

chrome.browserAction.onClicked.addListener(activateExtensionToggle);

chrome.tabs.onActivated.addListener(activeInfo => enableTab(activeInfo.tabId));
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
    if (changeInfo.status === 'complete') {
        enableTab(tabId);
    }
});

chrome.runtime.onMessage.addListener(function (request, sender, response) {

    let tabID;

    switch (request.type) {

        case 'playAudio': {
            if (!reversedMp3URLArr.length 
                    || document.getElementById('teochew-ext-player').paused) {
                playAudio(request.chaoyin, teochewAudioDict);
            }
        }
            break;

        case 'search': {
            let e = search(request.text);
            response(e);
        }
            break;

        case 'open':
            tabID = tabIDs[request.tabType];
            if (tabID) {
                chrome.tabs.get(tabID, function (tab) {
                    if (chrome.runtime.lastError) {
                        tab = undefined;
                    }
                    if (tab && tab.url && (tab.url.substr(-13) === 'wordlist.html')) {
                        // open existing word list
                        chrome.tabs.update(tabID, {
                            active: true
                        });
                    } else {
                        chrome.tabs.create({
                            url: request.url
                        }, function (tab) {
                            tabIDs[request.tabType] = tab.id;
                        });
                    }
                });
            } else {
                chrome.tabs.create({
                    url: request.url
                }, function (tab) {
                    tabIDs[request.tabType] = tab.id;
                    if (request.tabType === 'wordlist') {
                        // make sure the table is sized correctly
                        chrome.tabs.reload(tab.id);
                    }
                });
            }
            break;

        case 'copy': {
            let txt = document.createElement('textarea');
            txt.style.position = "absolute";
            txt.style.left = "-100%";
            txt.value = request.data;
            document.body.appendChild(txt);
            txt.select();
            document.execCommand('copy');
            document.body.removeChild(txt);
        }
            break;

        case 'add': {
            let json = localStorage['wordlist'];

            let saveFirstEntryOnly = localStorage['saveToWordList'] === 'firstEntryOnly';

            let wordlist;
            if (json) {
                wordlist = JSON.parse(json);
            } else {
                wordlist = [];
            }

            for (let i in request.entries) {

                let entry = {};
                entry.simplified = request.entries[i].simplified;
                entry.traditional = request.entries[i].traditional;
                entry.pinyin = request.entries[i].pinyin;
                entry.definition = request.entries[i].definition;

                wordlist.push(entry);

                if (saveFirstEntryOnly) {
                    break;
                }
            }
            localStorage['wordlist'] = JSON.stringify(wordlist);

            tabID = tabIDs['wordlist'];
            if (tabID) {
                chrome.tabs.get(tabID, function (tab) {
                    if (tab) {
                        chrome.tabs.reload(tabID);
                    }
                });
            }
        }
            break;

        default:
        // ignore
    }
});

mozilla.runtime.onMessage.addListener(function (request, sender, response) {
    switch(request.type) {
        case 'chaoyin': {
            const chaoyinArr = lookupChaoyin(request.simpChars, 
                request.tradChars, request.pinyin, teochewDict);

            response({'chaoyinArr': chaoyinArr});
        }
            break;

        case 'audioCheck': {
            response({'audioExists': audioExists(request.chaoyin, teochewAudioDict)});
        }
            break;

        case 'playAllAudioCheck': {
            response({'playAllStr': genToneSandhi(request.chaoyinArr, teochewAudioDict)});
        }
            break;
        default:
    }
});

mozilla.runtime.onMessage.addListener(async function (request, sender, response) {
    switch(request.type) {
        case 'updateTeochewAssets': {
            const {newSimpChars, newTradChars} = filterRepeatedChars(request.simpChars, 
                                                    request.tradChars);

            if (newSimpChars) {
                const backendHost = LB_API_URLS[Math.floor(Math.random() * LB_API_URLS.length)];

                const {
                    pinyinChaoyinDictRes,
                    teochewAudioDictRes,
                } = await fetchAssets(backendHost, newSimpChars, newTradChars);

                teochewDict = Object.assign(teochewDict, pinyinChaoyinDictRes);
                teochewAudioDict = Object.assign(teochewAudioDict, teochewAudioDictRes);
            }

            response();
        }
            break;
    }
});
