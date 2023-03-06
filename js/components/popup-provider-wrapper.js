import { ElemPropContext, XPntContext, YPntContext, PromiseCntContext } from "./contexts.js";
export default function PopupProviderWrapper({ elem, xPnt, yPnt, children }) {
    const promiseCnt = React.useRef(0);
    return (React.createElement(ElemPropContext.Provider, { value: elem },
        React.createElement(XPntContext.Provider, { value: xPnt },
            React.createElement(YPntContext.Provider, { value: yPnt },
                React.createElement(PromiseCntContext.Provider, { value: promiseCnt }, children)))));
}
