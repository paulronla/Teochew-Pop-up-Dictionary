/*
Teochew Pop-up Dictionary
Copyright (C) 2019 Paul La
https://github.com/paulronla/ 

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

const TONE_SANDHI = {
    '1': '1',
    '2': '6',
    '3': '5',
    '4': '8',
    '5': '7',
    '6': '7',
    '7': '7',
    '8': '4'
};

const SIMILAR_TONES = {
    '7': '3'
};

const SIMILAR_FINALS = {
    'eng': 'ng',
    'b': 'g',
    'g': 'h',
    'h': 'g',
    'n': '',
    'ng': 'eng'
};

function audioExists(chaoyin, teochewAudioDict) {
    if (teochewAudioDict) {
        return teochewAudioDict.hasOwnProperty(chaoyin);
    }

    return false;
}

function genToneSandhi(chaoyinArr, teochewAudioDict) {
    //last character in an utterance doesn't change tone
    for (let i = 0; i < chaoyinArr.length - 1; i++) {
        let newToneNum = TONE_SANDHI[chaoyinArr[i].slice(-1)];
        let tonelessChaoyin = chaoyinArr[i].slice(0, -1);

        chaoyinArr[i] = chaoyinIfExists(tonelessChaoyin + newToneNum, teochewAudioDict)
            || chaoyinIfExists(tonelessChaoyin + 'n' + newToneNum, teochewAudioDict);

        for (const final in SIMILAR_FINALS) {
            if (!chaoyinArr[i] && tonelessChaoyin.slice(-final.length) === final) {
                const similarChaoyin = tonelessChaoyin.slice(0,-final.length) + SIMILAR_FINALS[final];

                chaoyinArr[i] = chaoyinIfExists(similarChaoyin 
                    + newToneNum, teochewAudioDict);
            }
        }

        for (const tone in SIMILAR_TONES) {
            if (!chaoyinArr[i] && newToneNum === tone) {
                const similarTone = SIMILAR_TONES[tone];

                chaoyinArr[i] = chaoyinIfExists(tonelessChaoyin + similarTone, teochewAudioDict)
                    || chaoyinIfExists(tonelessChaoyin + 'n' + similarTone, teochewAudioDict);
            }
        }

        for (const final in SIMILAR_FINALS) {
            if (!chaoyinArr[i] && tonelessChaoyin.slice(-final.length) === final) {
                const similarChaoyin = tonelessChaoyin.slice(0,-final.length) + SIMILAR_FINALS[final];
            
                for (const tone in SIMILAR_TONES) {
                    if (!chaoyinArr[i] && newToneNum === tone) {
                        const similarTone = SIMILAR_TONES[tone];

                        chaoyinArr[i] = chaoyinIfExists(similarChaoyin 
                            + similarTone, teochewAudioDict);
                    }
                }
            }
        }

        if (!chaoyinArr[i]) {
            return '';
        }
    }

    return chaoyinArr.join(' ');
}

function chaoyinIfExists(chaoyin, teochewAudioDict) {
    if (teochewAudioDict && teochewAudioDict[chaoyin]) {
        return chaoyin;
    }

    return '';
}