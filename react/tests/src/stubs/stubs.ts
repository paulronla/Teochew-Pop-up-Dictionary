export const genTonedPinyin = (syllables: string) => {
    switch(syllables) {
        case "ni3 hao3": return "nǐ hǎo";
        case "ni3": return "nǐ";
    }
}

export const parse = (syllable: string) => {
    switch (syllable) {
        case "ni3": return ["ni3", 'n', 'i', '', '3'];
        case "hao3": return ["hao3", 'h', "ao", '', '3'];
    }
}

export const config = {
    pinyin: "yes",
    zhuyin: "yes",
    grammar: "yes",
    fontSize: "small",
}