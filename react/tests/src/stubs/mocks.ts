jest.mock("browser", () => {
    return {
        __esModule: true,
        runtime: {
            sendMessage: jest.fn()
        }
    }
}, { virtual: true });
export const mozilla = require("browser");
mozilla.runtime.sendMessage.mockImplementation(
    implmentationFactory(["le2", "ho2(白)|hoh4(白)|haon3|hao2(文)"])
);

export const simpMozilla = {
    ...require("browser"),
    runtime: {
        sendMessage: jest.fn()
    }
};
simpMozilla.runtime.sendMessage.mockImplementation(
    implmentationFactory(["le2", "ho2"])
);

function implmentationFactory(chaoyins: string[]) {
    return ({ type, pinyin }: { type: string, pinyin: string }) => {
        switch(type) {
            case "audioCheck": return Promise.resolve({ audioExists: true });
            case "playAllAudioCheck": return Promise.resolve({ playAllStr: "le6 ho2" });
            case "chaoyin": return Promise.resolve({
                chaoyinArr: pinyin?.split(' ')
                    .map((_, i) => chaoyins[i])
            });
            case "updateTeochewAssets": return Promise.resolve();
        }
    }
}