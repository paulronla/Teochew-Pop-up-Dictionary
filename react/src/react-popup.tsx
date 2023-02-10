import PopupEntry from "./popup-entry";

export default function ReactPopup({ result, showToneColors }: {
    result: { 
        data: [[string, string]],
        grammar: { keyword: string, index: number },
        more: 1 | undefined
    },
    showToneColors: boolean
}) {
    const [isUpdated, setIsUpdated] = React.useState(false);
    const texts: [[string, string, string, string, string]?] = [];

    if (result === null) return;

    // TODO: move this state reset key to the render root
    const dataJoins = result.data.map(datum => datum.join(' '));
    return (<>
        <PopupEntriesWrapper key={ dataJoins.join(' ') } result={result} setIsUpdated={setIsUpdated}>{
            isUpdated && result.data.map(([dentry, word], i) => 
                <PopupEntry key={dataJoins[i] + i}
                    dentry={dentry}
                    word={word}
                    showToneColors={showToneColors}
                    grammarIdx={result.grammar?.index}
                    idx={i}
                    texts={texts}
                />
            )
        }
        </PopupEntriesWrapper>
        {result.more && <>&hellip;<br /></>}
    </>);
}

function PopupEntriesWrapper({ result, setIsUpdated, children }: {
    result: { 
        data: [[string, string]],
        grammar: { keyword: string, index: number },
        more: number
    },
    setIsUpdated: React.Dispatch<React.SetStateAction<boolean>>
    children: React.ReactNode
}) {
    const dentry = result.data[0][0];

    React.useEffect(() => {
        let ignore = false;
        (async () => {
            const [, tradChars, simpChars] = dentry.match(/^([^\s]+?)\s+([^\s]+?)\s+\[(.*?)\]?\s*\/(.+)\//);
            await mozilla.runtime.sendMessage({
                'type': 'updateTeochewAssets',
                tradChars,
                simpChars
            });

            if (!ignore) {
                setIsUpdated(true);
            }
        })();
    
        return () => { ignore = true; };
    }, [dentry, setIsUpdated]);

    return <>{children}</>;
}