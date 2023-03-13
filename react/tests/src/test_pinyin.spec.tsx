import { render } from '@testing-library/react';
import * as React from 'react';
globalThis.React = React;

globalThis.genTonedPinyin = (syllables: string) => {
    switch(syllables) {
        case "ni3 hao3": return "nǐ hǎo";
        case "ni3": return "nǐ";
    }
}
globalThis.parse = (syllable: string) => {
    switch (syllable) {
        case "ni3": return ["ni3", 'n', 'i', '', '3'];
        case "hao3": return ["hao3", 'h', "ao", '', '3'];
    }
}

globalThis.config = {
    fontSize: "small",
};

describe("test_pinyin", () => {
    let Pinyin;
    beforeAll(async () => {
        const module = await import('../../../js/components/pinyin.js');
        return Pinyin = module.default;
    });

    it("renders pinyin", () => {
        const { container } = render(<Pinyin numTonedSyllables={"ni3 hao3"} tonedSyllables={"nǐ hǎo"} />);
        expect(container.textContent.match(/nǐ hǎo/g).length).toBe(1);
    });
});