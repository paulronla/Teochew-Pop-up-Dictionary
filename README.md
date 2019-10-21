![# Teochew-Pop-up-Dictionary](teochew_popup_dict_tile.png)

A Chrome Extension that displays the Mandarin and Teochew pronunciations 
and English definitions for all Chinese vocabulary and plays back 
Teochew Text-to-Speech

https://chrome.google.com/webstore/detail/teochew-pop-up-dictionary/jhmfddlpcbhnjmnbkagdaoghacglnmii

## Update

\[v. 2.0.0\]
- Extension download size reduced by 60%
- "Play all" bug fixed when final character in a word does not have audio

\[v. 1.1.0\]
- Pop-up implemented using Shadow DOM to isolate the play buttons from the web page CSS
- Dictionary updated with more Standard Chinese words

## Screenshots

![Image from 汕了个头, a Teochew web variety show channel based in Shantou](screenshots/shanlegetou.png)
*汕了个头 is a Teochew variety show web channel based in Shantou, the city  
considered to be the economic capital of the Teochew region*


## What is Teochew?

[Teochew](https://en.wikipedia.org/wiki/Teochew_dialect) belongs to the 
Southern Min branch of Chinese with over 25 million speakers worldwide. 
Outside of China, it is among one of the most spoken Chinese varieties only 
surpassed by Mandarin, Cantonese, and Taiwanese/Hokkien. Phonetically, it has 
not changed very much and many vocabularies from Japanese, Korean, and 
Vietnamese that originated from China centuries ago still sound similar to 
Teochew.

For example, consider 肉 which means flesh. \[Niku\] is one of the common 
Japanese readings borrowed from China along with the character. Compare with 
Teochew \[nek8\] \([POJ spelling](https://en.wikipedia.org/wiki/Pe̍h-ōe-jī)\) 
and Mandarin \[rou4\].

## Usage

Teochew Pop-up Dictionary is based on [Zhongwen: Chinese-English 
Dictionary](https://chrome.google.com/webstore/detail/zhongwen-chinese-english/kkmlkkjojmombglmlpbpapmhcaljjkde) 
(v. 5.4.3) by Christian Schiller. For non-Teochew usage info (like useful 
keyboard shortcuts), please refer to his page or the in-extension help. 
If Teochew functionality isn't needed at all, please directly use 
Zhongwen for Mandarin learning instead.

Press the \[潮\] button to enable the extension and bring up the mini-help menu. 
Move the mouse outside the help menu to clear it or hit the \[Esc\] keyboard button.
Mouse over Chinese to bring up the entry in a pop-up.

For most users, you'll get the most mileage looking up a word in English on a translation 
website and then mousing over the Chinese characters.

### Layout

Each entry shows Simplified Chinese and then Traditional Chinese, if the 
characters are different, and then the Pinyin and Teochew Romanization 
with the definition underneath. The layout, including omitting Pinyin, 
can be customized on the options page.

In many cases, a single Chinese character will have many Teochew pronunciations 
and the correct one for a multi-character word cannot be determined by software. 
In that scenario, the possible pronunciations are listed together. In order 
to help with the clutter that may cause, the Teochew pronunciations that belong 
to a character will be grouped by color. For example, in a three Chinese character 
word, all pronunciations associated with the first character will be red, with the 
second character green, and with the third blue.

As it turns out, Teochew can differ from one location to the next where 
the amount of differences correlate strongly with geographical barriers. 
The Teochew in this extension is based on the prestige form found in 
the city center of Shantou and most widely reflects the Teochew spoken 
worldwide.

### Teochew Romanization: Peng'im

While Pinyin is the most universally accepted Romanization system for 
Mandarin, the same level of acceptance has not been attained for Teochew, 
resulting in people making up their own systems and inconsistent spellings. 
Such is so even for most native speakers in China. On the other hand, 
professional Teochew linguists and Teochew-Chinese dictionaries use the 
government backed [Peng'im](https://en.wikipedia.org/wiki/Peng%27im) system, 
which is the most Pinyin-like compared to other Southern Min Romanization 
systems.

Given that most users aren't familiar with Peng'im, almost every Teochew syllable 
also has a playable pronunciation. 

### Play All Feature

Like Mandarin, Teochew is tonal but with 
[8 tones](https://www.teochewdialect.net/tone.php?code=en). Note the tone 
line graph in the previous link, where the x-axis is time and the y-axis is 
pitch. Tones 4 and 8 have a shorter duration and sudden stops compared to 
the other tones. Also note that the tones will change under certain circumstances 
in a phenomenon known as Tone Sandhi. Generally speaking, all tones will change 
when they're not the last character of a noun or an utterance. The mapping 
is as follows for the Shantou variant:

Original Tone | New Tone
------------- | --------
1 | 1
2 | 6
3 | 5
4 | 8
5 | 7
6 | 7
7 | 7
8 | 4

Example: computer = 電\[diang6\](electricity) + 腦\[nao2\](brain) = 電腦, effectively (diang**7** nao2)

To facilitate learning the tone changes, a Play All button when clicked will 
play the audio for all characters with the tone changes. When a Chinese 
character has multiple pronunciations, the first pronunciation or a pronunciation 
marked with 训 or 俗 will be used.

## Vocabulary Differences between Written Chinese and Teochew

In the 1920s, the writing system was reformed from Classical Chinese to Standard 
Written Chinese, based on spoken Mandarin. Though it is possible to write Chinese 
mirroring Teochew, this is mostly limited to informal settings like in 
messaging apps or song lyrics. Anything more formal than that will be written in 
standard Chinese. The important thing to note here is that while grammar is more or 
less very similar, certain kinds of vocabulary can be different. This comes up more 
often with daily discussion vocabulary, like pronouns, food, basic verbs, etc, while 
more intermediate and advanced subjects or abstract ideas use the same Chinese 
characters (but of course different pronunciations). Here are examples:

English | Mandarin | Teochew
------- | -------- | -------
eyes | 眼睛 (yan3 jing1) | 目 (mag8)
eat | 吃 (chi1) | 食 (ziah8)
descend | 下 (xia4) | 落 (loh8)
Japan | 日本 (ri4 ben3) | 日本 (rig8 bung2)
tooth decay | 蛀牙 (zhu4 ya2) | 蛀牙 (zu3 ghê5)
insurance | 保險 (bao3 xian3) | 保險 (bo2 hiam2)

## Goal of Chrome Extension

Given the differences between written Chinese and Teochew, this software 
does not intend to teach anybody how to speak Teochew. There are already 
websites and mobile apps that will get you started. Instead, this extension 
intends to supplement those who already have a Teochew or Chinese background 
to expand and reinforce their vocabulary when talking with family or if 
they're studying Mandarin to leverage familiarity from already speaking 
Teochew. Confirm the correct Teochew pronunciation or character by asking a 
family member. My hope is that your Teochew and communication with family 
will both improve!

## Legal

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

Teochew Pop-up Dictionary
Copyright (C) 2019 Paul La