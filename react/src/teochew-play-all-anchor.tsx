export default function TeochewPlayAllAnchor({ singChaoyinNoParenArr, cntPromiseComp, layoutEffectComp }: {
    singChaoyinNoParenArr : string[],
    cntPromiseComp?: React.ReactNode,
    layoutEffectComp?: React.ReactNode
}) {
    const [playAllStr, setPlayAllStr] = React.useState("");
    const [promiseResolved, setPromiseResolved] = React.useState(false);
    
    React.useEffect(() => {
        if (singChaoyinNoParenArr.length >= 2) {
            let ignore = false;
            (async () => {
                const { playAllStr: result }: { playAllStr: string } = await mozilla.runtime.sendMessage({
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

    return (
        <>
            {playAllStr && (
            <a 
                href=""
                className="teochew-ext-play teochew-ext-ancr"
                data-chaoyin={ playAllStr }
            >
                Play all
            </a>
            )}
            {promiseResolved ? layoutEffectComp : cntPromiseComp}
        </>
    );
}