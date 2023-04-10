import { render } from '@testing-library/react';
import * as React from 'react';
import * as $ from '../../../js/jquery-3.3.1.min.js';
import { jest } from '@jest/globals';
globalThis.React = React;
globalThis.$ = $;

jest.mock("browser", () => {
    return {
        __esModule: true,
        runtime: {
            sendMessage: jest.fn()
        }
    }
}, { virtual: true });
const mozilla = require("browser");
globalThis.mozilla = mozilla;
mozilla.runtime.sendMessage.mockImplementation(({ type, pinyin }: { type: string, pinyin: string }) => {
    switch(type) {
        case "audioCheck": return Promise.resolve({ audioExists: true });
        case "playAllAudioCheck": return Promise.resolve({ playAllStr: "le6 ho2" });
        case "chaoyin": return Promise.resolve({
            chaoyinArr: pinyin.split(' ')
                .map((_, i) => ["le2", "ho2(白)|hoh4(白)|haon3|hao2(文)"][i])
        });
    }
});

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

globalThis.config = {
    pinyin: "yes",
    zhuyin: "yes",
};

describe("test_popup-entry", () => {
    let PopupEntry;
    beforeAll(async () => {
        const module = await import("../../../js/components/popup-entry.js");
        return PopupEntry = module.default;
    });

    it("renders a PopupEntry", async () => {
        const { findByText } = render(<PopupEntry
            dentry={"你好 你好 [ni3 hao3] /hello/"}
            word={"你好"}
            idx={0}
            texts={[]}
            />);

        await findByText("Play all");
    });
});