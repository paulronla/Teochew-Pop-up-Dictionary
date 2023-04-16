import { render } from '@testing-library/react';
import { parse, config } from './stubs/stubs.js'; 
import * as React from 'react';
globalThis.React = React;

globalThis.parse = parse;

globalThis.config = config;

describe("test_zhuyin", () => {
    let Zhuyin;
    beforeAll(async () => {
        const module = await import('../../../js/components/zhuyin.js');
        return Zhuyin = module.default;
    });

    it("renders zhuyin", () => {
        const { container } = render(<Zhuyin numTonedSyllables={"ni3 hao3"} />);
        expect(container.textContent.match(/ㄋㄧˇ\u00a0ㄏㄠˇ/g).length).toBe(1);
    });
});