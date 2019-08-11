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

Number.isInteger = Number.isInteger || function(value) {
    return typeof value === 'number' && 
        isFinite(value) && 
        Math.floor(value) === value;
};

function lookupChaoyin(simpChars, tradChars, pinyinStr, pinyinChaoyinDict) {
    const pinyinArr = pinyinStr.split(' ');
    const validSimpChars = mapInvalidChars(simpChars);
    const validTradChars = simpChars.length === validSimpChars.length ? tradChars : mapInvalidChars(tradChars);
    const chaoyinArr = [];

    if (!pinyinChaoyinDict || pinyinArr.length > validSimpChars.length) {
        return chaoyinArr;
    }

    for (let i = 0; i < pinyinArr.length; i++) {
        const char = validSimpChars[i];
        const pinyin = pinyinArr[i].toLowerCase();

        if (pinyinChaoyinDict.hasOwnProperty(char)
                || pinyinChaoyinDict.hasOwnProperty(validTradChars[i])) {
            const pinyinChaoyinMapping = pinyinChaoyinDict[char]
                    || pinyinChaoyinDict[validTradChars[i]];

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