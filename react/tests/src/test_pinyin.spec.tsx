import { render } from '@testing-library/react';
import { genTonedPinyin, parse } from './stubs/stubs.js';
import * as React from 'react';
globalThis.React = React;

globalThis.genTonedPinyin = genTonedPinyin;
globalThis.parse = parse;

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