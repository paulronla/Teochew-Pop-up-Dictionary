'use strict';

const rewire = require('rewire');
const genToneSandhi = rewire('../js/playChaoyin.js').__get__('genToneSandhi');
const teochewAudioDict = require('../data/chaoyin_audio_map.json');
const assert = require('assert').strict;

assert.deepStrictEqual(
    genToneSandhi(['sêng5','sêg8'], teochewAudioDict),
    'sêng7 sêg8'
);

assert.deepStrictEqual(
    genToneSandhi(['hung1','biag8'], teochewAudioDict),
    'hung1 biag8'
);

assert.deepStrictEqual(
    genToneSandhi(['geg8','geh4','gan5','cou5','ti6','cuan6','dan6','gain3','guên5','ciu2'], teochewAudioDict),
    'geh4 geg8 gan3 cou3 tin7 cua7 dan3 gai5 guê3 ciu2'
);

assert.deepStrictEqual(
    genToneSandhi(['hng6','heng6','a1'], teochewAudioDict),
    ''
);

assert.deepStrictEqual(
    genToneSandhi(['eng2','a1'], teochewAudioDict),
    'ng6 a1'
);

assert.deepStrictEqual(
    genToneSandhi(['uanh4','a1'], teochewAudioDict),
    ''
);
