export default function TeochewPlayButton({ singChaoyinNoParen, cntPromiseComp, layoutEffectComp }) {
    const [audioExists, setAudioExists] = React.useState(false);
    const [promiseResolved, setPromiseResolved] = React.useState(false);
    React.useEffect(() => {
        let ignore = false;
        (async () => {
            const { audioExists: result } = await mozilla.runtime.sendMessage({
                type: 'audioCheck',
                chaoyin: singChaoyinNoParen
            });
            if (!ignore) {
                setAudioExists(result);
                setPromiseResolved(true);
            }
        })();
        return () => { ignore = true; };
    }, [singChaoyinNoParen]);
    return (React.createElement(React.Fragment, null,
        audioExists && (React.createElement("button", { className: "teochew-ext-play teochew-ext-btn", "data-chaoyin": singChaoyinNoParen, type: "button" },
            React.createElement("span", { className: "teochew-ext-btn-span" }, "\u25B8"))),
        promiseResolved ? layoutEffectComp : cntPromiseComp));
}
