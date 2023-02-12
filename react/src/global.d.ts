// TODO: remove Microsoft bridges that conflict with Mozilla's browser API
// global browser var. Bridges were used to programmatically enable
// chrome extensions to work on proprietary Edge (pre-Chromium)
declare const mozilla: {
    runtime: {
        sendMessage(request: {}): any
    }
};

declare function parse(s: string): string[];
declare function tonify(vowels: string, tone: string): [string, string];
declare function pinyinAndZhuyin(syllables: string, showToneColors: boolean, pinyinClass: string): [string, string, string]

declare let config: {
    fontSize: string,
    simpTrad: string,
    pinyin: string,
    zhuyin: string,
    grammar: string,
};

// extension originally assigns an array and sets named property "grammar" on it
interface savedSearchResults {
    [idx: number]: [string, string, string, string, string],
    grammar?: { keyword: string, index: number }
}

interface Window {
    savedSearchResults: savedSearchResults
}
