import { ElemPropContext, XPntContext, YPntContext, PromiseCntContext } from "./contexts.js";

export default function PopupProviderWrapper({ elem, xPnt, yPnt, children }: {
    elem: HTMLElement,
    xPnt: number,
    yPnt: number,
    children: React.ReactNode
}) {
    const promiseCnt = React.useRef(0);

    return (
        <ElemPropContext.Provider value={elem}>
            <XPntContext.Provider value={xPnt}>
                <YPntContext.Provider value={yPnt}>
                    <PromiseCntContext.Provider value={promiseCnt}>
                        {children}
                    </PromiseCntContext.Provider>
                </YPntContext.Provider>
            </XPntContext.Provider>
        </ElemPropContext.Provider>
    );
}