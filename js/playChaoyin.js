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
    'g': 'h',
    'h': 'g',
    'n': ''
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
            || chaoyinIfExists(tonelessChaoyin + 'n' + newToneNum);

        for (const tone in SIMILAR_TONES) {
            const similarTone = SIMILAR_TONES[tone];

            if (!chaoyinArr[i] && newToneNum === tone) {
                chaoyinArr[i] = chaoyinIfExists(tonelessChaoyin + similarTone, teochewAudioDict)
                    || chaoyinIfExists(tonelessChaoyin + 'n' + similarTone);
            }
        }

        for (const final in SIMILAR_FINALS) {
            if (!chaoyinArr[i] && tonelessChaoyin.slice(-final.length) === final) {
                const similarChaoyin = tonelessChaoyin.slice(0,-final.length) + SIMILAR_FINALS[final];

                chaoyinArr[i] = chaoyinIfExists(similarChaoyin 
                    + newToneNum, teochewAudioDict);
            
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