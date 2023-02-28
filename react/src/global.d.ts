// TODO: remove Microsoft bridges that conflict with Mozilla's browser API
// global browser var. Bridges were used to programmatically enable
// chrome extensions to work on proprietary Edge (pre-Chromium)
declare const mozilla: {
    runtime: {
        sendMessage(request: {}): any
    }
};

declare function parse(s: string): string[];
declare function genTonedPinyin(syllables: string): string

declare let config: {
    fontSize: string,
    simpTrad: string,
    pinyin: string,
    zhuyin: string,
    grammar: string,
};

declare let popup: HTMLElement;
