import { render, waitForElementToBeRemoved } from '@testing-library/react';
import * as React from 'react';
globalThis.React = React;

jest.mock("browser", () => {
    return {
        __esModule: true,
        runtime: {
            sendMessage: jest.fn(
                () => Promise.resolve({ playAllStr: "chaoyin1 chaoyin2" })
            )
        }
    }
}, { virtual: true });
const mozilla = require("browser");
globalThis.mozilla = mozilla;

describe("test_teochew-play-all-anchor", () => {
    let TeochewPlayAllAnchor;
    beforeAll(async () => {
        const module = await import('../../../js/components/teochew-play-all-anchor.js');
        return TeochewPlayAllAnchor = module.default;
    });
    
    it("renders the play all anchor and clears for one word", async () => {
        const { getByText, findByText, rerender } = render(<TeochewPlayAllAnchor singChaoyinNoParenArr={["chaoyin1", "chaoyin2"]} />);
        await findByText("Play all");

        const promise = waitForElementToBeRemoved(getByText("Play all"));
        rerender(<TeochewPlayAllAnchor singChaoyinNoParenArr={["chaoyin1"]} />);
        return await promise;
    });

    it("first renders cntPromiseComp only and then layoutEffectComp only", async () => {
        const { findByText, getByText, queryByText } = render(
            <TeochewPlayAllAnchor singChaoyinNoParenArr={["c1", "c2"]} cntPromiseComp={"cntPromiseComp"} layoutEffectComp={"layoutEffectComp"} />
        );

        getByText("cntPromiseComp");
        expect(queryByText("layoutEffectComp")).toBeNull();

        const promise = await findByText("layoutEffectComp");
        expect(queryByText("cntPromiseComp")).toBeNull();

        return promise;
    });
});