'use strict';

Number.isInteger = Number.isInteger || function(value) {
    return typeof value === 'number' && 
        isFinite(value) && 
        Math.floor(value) === value;
};

function lookupChaoyin(simpChars, pinyinStr, pinyinChaoyinDict) {
    const pinyinArr = pinyinStr.split(' ');
    const validSimpChars = mapInvalidChars(simpChars);
    const chaoyinArr = [];

    if (!pinyinChaoyinDict || pinyinArr.length > validSimpChars.length) {
        return chaoyinArr;
    }

    for (let i = 0; i < pinyinArr.length; i++) {
        const char = validSimpChars[i];
        const pinyin = pinyinArr[i].toLowerCase();

        if (pinyinChaoyinDict.hasOwnProperty(char)) {
            const pinyinChaoyinMapping = pinyinChaoyinDict[char];

            if (pinyinChaoyinMapping.hasOwnProperty(pinyin)) {
                const chaoyin = pinyinChaoyinMapping[pinyin];
                chaoyinArr.push(chaoyin);
            }
            else {
                const chaoyinSet = new Set();
                Object.getOwnPropertyNames(pinyinChaoyinMapping).forEach( 
                    pinyin => pinyinChaoyinMapping[pinyin].split('|').forEach(
                        chaoyin => chaoyinSet.add(chaoyin)
                    )
                );

                chaoyinArr.push([...chaoyinSet].join('|'));
            }
        }
        else {
            chaoyinArr.push('???');
        }
    }

    for (const chaoyin of chaoyinArr) {
        if (chaoyin !== '???') {
            return chaoyinArr;
        }
    }

    return [];
}

function mapInvalidChars(chineseChars) {
    const ans = [];

    for (const char of chineseChars) {
        if (char.trim() && !isNaN(char)) {
            ans.push(['〇','一','二','三','四','五','六','七','八','九'][parseInt(char, 10)]);
        }
        else if (~'，。？！'.indexOf(char)) {
            continue;
        }
        else {
            ans.push(char);
        }
    }

    return ans.join('');
}