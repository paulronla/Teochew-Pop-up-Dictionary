import { render } from '@testing-library/react';
import * as React from 'react';
globalThis.React = React;

globalThis.parse = (syllable: string) => {
    switch (syllable) {
        case "ni3": return ["ni3", 'n', 'i', '', '3'];
        case "hao3": return ["hao3", 'h', "ao", '', '3'];
    }
}

globalThis.config = {
    fontSize: "small",
};

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