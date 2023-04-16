import { render } from '@testing-library/react';
import { genTonedPinyin, parse, config } from './stubs/stubs.js';
import * as React from 'react';
import * as $ from '../../../js/jquery-3.3.1.min.js';
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
mozilla.runtime.sendMessage.mockImplementation(({ type, pinyin }: { type: string, pinyin: string}) => {
    switch(type) {
        case "audioCheck": return Promise.resolve({ audioExists: true });
        case "playAllAudioCheck": return Promise.resolve({ playAllStr: "le6 ho2" });
        case "chaoyin": return Promise.resolve({
            chaoyinArr: pinyin.split(' ')
                .map((_, i) => ["le2", "ho2(白)|hoh4(白)|haon3|hao2(文)"][i])
        });
        case "updateTeochewAssets": return Promise.resolve();
    }
});
globalThis.mozilla = mozilla;
globalThis.genTonedPinyin = genTonedPinyin;
globalThis.parse = parse;
globalThis.savedSearchResults = [];
globalThis.altView = 0;
globalThis.popupAboveMouse = false;
globalThis.clientY = 0;
globalThis.savedDY = 0;
globalThis.config = config;

describe("test_react-popup", () => {
    it("renders a popup", async () => {
        const { default: ReactPopup } = await import('../../../js/components/react-popup.js');

        const result = {
            data: [
                ['你好 你好 [ni3 hao3] /hello/hi/\r', '你好'],
                ['你 你 [ni3] /you (informal, as opposed to courteous 您[nin2])/\r', '你'],
            ],
            matchLen: 2,
        };
        const elem = document.createElement("span");
        globalThis.popup = document.createElement("div");

        const { container, findByText, findAllByText, getByText, getAllByText } = render(
            <ReactPopup result={result} showToneColors={true} elem={elem} x={0} y={0} />,
            { container: document.body.appendChild(globalThis.popup) }
        );

        const anchor = await findByText("Play all");
        expect(anchor.tagName.toLowerCase()).toBe("a");
        const buttons = await findAllByText("▸");
        expect(buttons.length).toBe(6);
        expect(
            buttons.every(button => button.parentElement.tagName.toLowerCase() === "button")
        ).toBe(true);

        getByText("你好");
        expect(getAllByText("你", { exact: false }).length).toBe(2);
        expect(container.textContent.match(/nǐ hǎo/g).length).toBe(1);
        expect(getAllByText("nǐ").length).toBe(2);
        expect(container.textContent.match(/ㄋㄧˇ\u00a0ㄏㄠˇ/g).length).toBe(1);
        expect(getAllByText("ㄋㄧˇ").length).toBe(2);
        expect(
            container.textContent.match(/le2▸ ho2(白)▸|hoh4(白)▸|haon3▸|hao2(文)▸/g).length
        ).toBe(1);
        expect(getAllByText("le2").length).toBe(2);
        getByText("hello; hi");
        getByText("you (informal, as opposed to courteous 您[nin2])");
    });
});