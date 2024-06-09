'use strict';

const API_URL = 'https://www.teochewspot.com';
let playingAudio = false;
let reversedMp3URLArr = [];

const player = document.getElementById('teochew-ext-player');
player.addEventListener('ended', playNext, false);

chrome.runtime.onMessage.addListener(
    async function (request, sender, response) {
        if (request.target !== 'offscreen') {
            return false;
        }

        switch(request.type) {
            case 'migrateStorage':
                response(await migrateStorage(request.options));
                break;

            case 'playAudioOffscreen': {
                if (!reversedMp3URLArr.length 
                        || document.getElementById('teochew-ext-player').paused) {
                    playAudio(request.chaoyin, request.teochewAudioDict);
                }
            }
                break;
            default:
        }
    }
)

async function migrateStorage(options) {
    const {
        popupcolor,
        tonecolors,
        fontSize,
        skritterTLD,
        pinyin,
        zhuyin,
        grammar,
        simpTrad,
        toneColorScheme,
        saveToWordList,
        wordlist
    } = options || {};

    return {
        'popupcolor': popupcolor || localStorage['popupcolor'] || 'yellow',
        'tonecolors': tonecolors|| localStorage['tonecolors'] || 'yes',
        'fontSize': fontSize || localStorage['fontSize'] || 'small',
        'skritterTLD': skritterTLD || localStorage['skritterTLD'] || 'com',
        'pinyin': pinyin || localStorage['pinyin'] || 'yes',
        'zhuyin': zhuyin || localStorage['zhuyin'] || 'no',
        'grammar': grammar || localStorage['grammar'] || 'yes',
        'simpTrad': simpTrad || localStorage['simpTrad'] || 'classic',
        'toneColorScheme': toneColorScheme || localStorage['toneColorScheme'] || 'standard',
        'saveToWordList': saveToWordList || localStorage['saveToWordList'],
        'wordlist': wordlist || localStorage['wordlist']
    };
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
