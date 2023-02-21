export default function TeochewPlayButton({ singChaoyinNoParen, cntPromiseComp, layoutEffectComp }: {
    singChaoyinNoParen: string,
    cntPromiseComp?: React.ReactNode,
    layoutEffectComp?: React.ReactNode
}) {
    const [audioExists, setAudioExists] = React.useState(false);

    React.useEffect(() => {
        let ignore = false;
        (async () => {
            const { audioExists: result }: { audioExists: boolean } = await mozilla.runtime.sendMessage({
                type: 'audioCheck',
                chaoyin: singChaoyinNoParen
            });

            if (!ignore) {
                setAudioExists(result);
            }
        })();

        return () => { ignore = true; };
    }, [singChaoyinNoParen]);

    return audioExists ? (
        <>
            <button 
                className="teochew-ext-play teochew-ext-btn"
                data-chaoyin={ singChaoyinNoParen }
                type="button"
            >
                <span className="teochew-ext-btn-span">▸</span>
            </button>
            {layoutEffectComp}
        </>
    ) : <>{cntPromiseComp}</>;
}