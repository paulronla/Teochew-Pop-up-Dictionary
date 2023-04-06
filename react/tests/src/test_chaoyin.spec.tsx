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
mozilla.runtime.sendMessage.mockImplementation(({ type }: { type: string}) => {
    switch(type) {
        case "audioCheck": return Promise.resolve({ audioExists: true });
        case "playAllAudioCheck": return Promise.resolve({ playAllStr: "le6 ho2" });
    }
});

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

describe("test_chaoyin", () => {
    let Chaoyin;
    beforeAll(async () => {
        const module = await import('../../../js/components/chaoyin.js');
        return Chaoyin = module.default;
    });

    it("renders Chaoyin", async () => {
        const { container, findByText } = render(<Chaoyin syllables={["le2", "ho2"]} />);

        await findByText("Play all");
        expect(container.textContent.match(/le2▸ ho2▸/g).length).toBe(1);
    });
});