import { render } from '@testing-library/react';
import { genTonedPinyin, parse, config } from './stubs/stubs.js';
import { simpMozilla } from './stubs/mocks.js';
import * as React from 'react';
import * as $ from '../../../js/jquery-3.3.1.min.js';
import { jest } from '@jest/globals';

globalThis.React = React;
globalThis.$ = $;
globalThis.mozilla = simpMozilla;
globalThis.genTonedPinyin = genTonedPinyin;
globalThis.parse = parse;
globalThis.config = config;

jest.unstable_mockModule("../../../js/components/popup-layout-effect.js", () => {
    return {
        __esModule: true,
        default: () => null,
    };
});
jest.unstable_mockModule("../../../js/components/count-pending-promise.js", () => {
    return {
        __esModule: true,
        default: () => null,
    };
});

describe("test_popup-entry", () => {
    let PopupEntry;
    beforeAll(async () => {
        const module = await import("../../../js/components/popup-entry.js");
        return PopupEntry = module.default;
    });

    it("renders a PopupEntry", async () => {
        const { container, getByText, findByText, queryByText, rerender } = render(<PopupEntry
            dentry={"你好 你好 [ni3 hao3] /hello/"}
            word={"你好"}
            idx={0}
            texts={[]}
        />);

        await findByText("Play all");
        expect(container.textContent.match(/nǐ hǎo/g).length).toBe(1);
        expect(container.textContent.match(/ㄋㄧˇ\u00a0ㄏㄠˇ/g).length).toBe(1);
        expect(container.textContent.match(/le2▸ ho2▸/g).length).toBe(1);
        getByText("hello");
        expect(queryByText('Press "g" for grammar and usage notes.')).toBeNull();

        rerender(<PopupEntry
            dentry={"你好 你好 [ni3 hao3] /hello/"}
            word={"你好"}
            idx={0}
            grammarIdx={0}
            texts={[]}
        />);
        
        return await findByText('Press "g" for grammar and usage notes.');
    });
});