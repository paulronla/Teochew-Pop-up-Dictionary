export default function TeochewPlayAllAnchor({ singChaoyinNoParenArr, cntPromiseComp, layoutEffectComp }) {
    const [playAllStr, setPlayAllStr] = React.useState("");
    const [promiseResolved, setPromiseResolved] = React.useState(false);
    React.useEffect(() => {
        if (singChaoyinNoParenArr.length >= 2) {
            let ignore = false;
            (async () => {
                const { playAllStr: result } = await mozilla.runtime.sendMessage({
                    type: 'playAllAudioCheck',
                    chaoyinArr: singChaoyinNoParenArr
                });
                if (!ignore) {
                    setPlayAllStr(result);
                    setPromiseResolved(true);
                }
            })();
            return () => { ignore = true; };
        }
    }, [singChaoyinNoParenArr]);
    if (singChaoyinNoParenArr.length < 2) {
        return;
    }
    return (React.createElement(React.Fragment, null,
        playAllStr && (React.createElement("a", { href: "", className: "teochew-ext-play teochew-ext-ancr", "data-chaoyin": playAllStr }, "Play all")),
        promiseResolved ? layoutEffectComp : cntPromiseComp));
}
