import { ElemPropContext, XPntContext, YPntContext, PromiseCntContext } from "./contexts.js";
export default function PopupLayoutEffect() {
    const elem = React.useContext(ElemPropContext);
    const xPnt = React.useContext(XPntContext);
    const yPnt = React.useContext(YPntContext);
    const promiseCnt = React.useContext(PromiseCntContext);
    const altView = React.useSyncExternalStore(subscribeAltView, getAltView);
    React.useEffect(() => {
        let ignore = false;
        if (!ignore) {
            promiseCnt.current--;
        }
        if (promiseCnt.current <= 0) {
            const html = $(popup).html();
            let x = xPnt;
            let y = yPnt;
            if (elem) {
                if (!ignore) {
                    popup.style.top = '-1000px';
                    popup.style.left = '0px';
                    popup.style.display = 'table';
                }
                let pW = popup.offsetWidth;
                let pH = popup.offsetHeight;
                if (pW <= 0) {
                    pW = 200;
                }
                if (pH <= 0) {
                    pH = 0;
                    let j = 0;
                    while ((j = html.indexOf('<br/>', j)) !== -1) {
                        j += 5;
                        pH += 22;
                    }
                    pH += 25;
                }
                if (altView === 1) {
                    x = window.scrollX;
                    y = window.scrollY;
                }
                else if (altView === 2) {
                    x = (window.innerWidth - (pW + 20)) + window.scrollX;
                    y = (window.innerHeight - (pH + 20)) + window.scrollY;
                }
                else if (elem instanceof window.HTMLOptionElement) {
                    x = 0;
                    y = 0;
                    let p = elem;
                    while (p) {
                        x += p.offsetLeft;
                        y += p.offsetTop;
                        p = p.offsetParent;
                    }
                    if (elem.offsetTop > elem.parentNode.clientHeight) {
                        y -= elem.offsetTop;
                    }
                    if (x + popup.offsetWidth > window.innerWidth) {
                        // too much to the right, go left
                        x -= popup.offsetWidth + 5;
                        if (x < 0) {
                            x = 0;
                        }
                    }
                    else {
                        // use SELECT's width
                        x += elem.parentNode.offsetWidth + 5;
                    }
                }
                else {
                    // go left if necessary
                    if (x + pW > window.innerWidth - 20) {
                        x = (window.innerWidth - pW) - 20;
                    }
                    else {
                        x -= Math.floor(pW / 3);
                    }
                    if (x < 0) {
                        x = 0;
                    }
                    // below the mouse
                    let v = 0;
                    // go up if necessary
                    if (y + v + pH > window.innerHeight) {
                        let t = y - pH - savedLineHeight - 5;
                        if (t >= 0) {
                            y = t;
                            if (!ignore) {
                                popupAboveMouse = true;
                            }
                        }
                    }
                    else {
                        y += v;
                        if (!ignore) {
                            popupAboveMouse = false;
                        }
                    }
                    if (!ignore) {
                        savedDY = y - clientY;
                    }
                    x += window.scrollX;
                    y += window.scrollY;
                }
            }
            else {
                x += window.scrollX;
                y += window.scrollY;
            }
            // (-1, -1) indicates: leave position unchanged
            if (x !== -1 && y !== -1 && !ignore) {
                popup.style.left = x + 'px';
                popup.style.top = y + 'px';
                popup.style.display = 'table';
            }
        }
        return () => { ignore = true; };
    }, [altView, elem, promiseCnt, xPnt, yPnt]);
    return null;
}
function subscribeAltView(onStoreChange) {
    triggerRerender = onStoreChange;
    return () => { triggerRerender = undefined; };
}
function getAltView() {
    return altView;
}
