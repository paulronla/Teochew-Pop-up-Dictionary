'use strict';

Number.isInteger = Number.isInteger || function(value) {
    return typeof value === 'number' && 
        isFinite(value) && 
        Math.floor(value) === value;
};

function lookupChaoyin(simpChars, pinyinStr, pinyinChaoyinDict) {
    let pinyinArr = pinyinStr.split(' ');
    let validSimpChars = mapInvalidChars(simpChars);
    let chaoyinArr = [];
    let chaoyinStr = '';

    if (pinyinArr.length > validSimpChars.length) {
        return '';
    }

    for (let i = 0; i < pinyinArr.length; i++) {
        let char = validSimpChars[i];
        let pinyin = pinyinArr[i].toLowerCase();

        if (pinyinChaoyinDict.hasOwnProperty(char)) {
            let pinyinChaoyinMapping = pinyinChaoyinDict[char];

            if (pinyinChaoyinMapping.hasOwnProperty(pinyin)) {
                let chaoyin = pinyinChaoyinMapping[pinyin];
                chaoyinArr.push(chaoyin);
            }
            else {
                let chaoyinSet = new Set();
                for (const p of Object.getOwnPropertyNames(pinyinChaoyinMapping)) {
                    pinyinChaoyinMapping[p].split('|').forEach(chaoyin => chaoyinSet.add(chaoyin));
                }

                chaoyinArr.push([...chaoyinSet].join('|'));
            }
        }
    }
}

function mapInvalidChars(chineseChars) {
    const ans = [];

    for (const char of chineseChars) {
        if (Number.isInteger(char)) {
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