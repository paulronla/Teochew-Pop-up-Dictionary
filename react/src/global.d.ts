// TODO: remove Microsoft bridges that conflict with Mozilla's browser API
// global browser var. Bridges were used to programmatically enable
// chrome extensions to work on proprietary Edge (pre-Chromium)
declare const mozilla: any;

declare function parse(s: string): string[];
declare function tonify(vowels: string, tone: string): [string, string];

declare let config: {
    fontSize: string
};