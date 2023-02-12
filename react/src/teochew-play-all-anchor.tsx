export default function TeochewPlayAllAnchor({ singChaoyinNoParenArr }: { singChaoyinNoParenArr : string[] }) {
    const [playAllStr, setPlayAllStr] = React.useState("");
    
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
                }
            })();

            return () => { ignore = true; };
        }
    }, [singChaoyinNoParenArr]);

    if (singChaoyinNoParenArr.length < 2) {
        return;
    }

    return playAllStr && (
        <a 
            href=""
            className="teochew-ext-play teochew-ext-ancr"
            data-chaoyin={ playAllStr }
        >
            Play all
        </a>
    );
}