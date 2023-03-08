import { render } from '@testing-library/react';
import * as React from 'react';
globalThis.React = React;

jest.mock("browser", () => {
    return {
        __esModule: true,
        runtime: {
            sendMessage: jest.fn(
                () => Promise.resolve({ audioExists: true })
            )
        }
    }
}, { virtual: true });
const mozilla = require("browser");
globalThis.mozilla = mozilla;

describe("test_teochew-play-button", () => {
    it("renders a play button", async () => {
        const { default: TeochewPlayButton } = await import('../../../js/components/teochew-play-button.js');

        const { findByText } = render(<TeochewPlayButton singChaoyinNoParen={"chaoyin"} />);

        await findByText("▸");
    });
});