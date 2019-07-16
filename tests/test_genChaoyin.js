'use strict';

const rewire = require('rewire');
const lookupChaoyin = rewire('../js/genChaoyin.js').__get__('lookupChaoyin');
const pinyinChaoyinDict = require('../data/mandarin_teochew.json');
const assert = require('assert').strict;

assert.deepStrictEqual(
    lookupChaoyin('成熟', 'cheng2 shu2', pinyinChaoyinDict), 
    ['sêng5(文)|sian5(白)|zian5(白)|cian5', 'sêg8']
);
assert.deepStrictEqual(
    lookupChaoyin('美国', 'Mei3 guo2', pinyinChaoyinDict),
    ['mui2|bhuê2', 'gog4']
);
assert.deepStrictEqual(
    lookupChaoyin('半个', 'ban4 ge5', pinyinChaoyinDict),
    ['buan3', 'gai5|go6|gai7']
);
assert.deepStrictEqual(
    lookupChaoyin('502胶', 'wu3 ling2 er4 jiao1', pinyinChaoyinDict),
    ['ngou6(白)|ngou2|u2(文)|u5', 'lêng5', 'no6(训)|ri6', 'ga1']
);
assert.deepStrictEqual(
    lookupChaoyin('不怕慢，就怕站', 'bu4 pa4 man4 jiu4 pa4 zhan4', pinyinChaoyinDict),
    ['bug4', 'pan3', 'mang7|bhuang6', 'ziu6', 'pan3', 'zam6']
);
assert.deepStrictEqual(
    lookupChaoyin('〻', 'xx5', pinyinChaoyinDict),
    []
);
