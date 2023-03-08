import { render } from '@testing-library/react';
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
    it("renders the play all anchor", async () => {
        const { default: TeochewPlayAllAnchor } = await import('../../../js/components/teochew-play-all-anchor.js');

        const { findByText } = render(<TeochewPlayAllAnchor singChaoyinNoParenArr={["chaoyin1", "chaoyin2"]} />);

        await findByText("Play all");
    });
});