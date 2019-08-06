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
