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

const rewire = require('rewire');
const lookupChaoyin = rewire('../js/genChaoyin.js').__get__('lookupChaoyin');
const pinyinChaoyinDict = require('../data/mandarin_teochew.json');
const assert = require('assert').strict;

assert.deepStrictEqual(
    lookupChaoyin('成熟', '成熟', 'cheng2 shu2', pinyinChaoyinDict), 
    ['sêng5(文)|sian5(白)|zian5(白)|cian5', 'sêg8']
);
assert.deepStrictEqual(
    lookupChaoyin('美国', '美國', 'Mei3 guo2', pinyinChaoyinDict),
    ['mui2|bhuê2', 'gog4']
);
assert.deepStrictEqual(
    lookupChaoyin('半个', '半個', 'ban4 ge5', pinyinChaoyinDict),
    ['buan3', 'gai5|go6|gai7']
);
assert.deepStrictEqual(
    lookupChaoyin('502胶', '502膠', 'wu3 ling2 er4 jiao1', pinyinChaoyinDict),
    ['ngou6(白)|ngou2|u2(文)|u5', 'lêng5', 'no6(训)|ri6', 'ga1']
);
assert.deepStrictEqual(
    lookupChaoyin('不怕慢，就怕站', '不怕慢，就怕站', 'bu4 pa4 man4 jiu4 pa4 zhan4', pinyinChaoyinDict),
    ['bug4', 'pan3', 'mang7|bhuang6', 'ziu6', 'pan3', 'zam6']
);
assert.deepStrictEqual(
    lookupChaoyin('〻', '〻', 'xx5', pinyinChaoyinDict),
    []
);
assert.deepStrictEqual(
    lookupChaoyin('𬒈', '礐', 'que4', pinyinChaoyinDict),
    ['gag4']
);
