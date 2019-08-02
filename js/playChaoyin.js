'use strict';

const TONE_SANDHI = {
    1: 1,
    2: 6,
    3: 5,
    4: 8,
    5: 7,
    6: 7,
    7: 7,
    8: 4
};

function audioExists(chaoyin, teochewAudioDict) {
    let audioExists = false;

    if (teochewAudioDict) {
        audioExists = teochewAudioDict.hasOwnProperty(chaoyin);
    }

    return audioExists;
}