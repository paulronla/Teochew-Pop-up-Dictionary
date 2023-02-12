import PopupEntry from "./popup-entry.js";

export default function ReactPopup({ result, showToneColors }: {
    result: { 
        data: [[string, string]],
        grammar: { keyword: string, index: number },
        more: 1 | undefined
    },
    showToneColors: boolean
}) {
    const [isUpdated, setIsUpdated] = React.useState(false);
    const texts: React.MutableRefObject<[[string, string, string, string, string]?]> = React.useRef([]);

    React.useEffect(() => {
        if (result !== null && isUpdated) {
            window.savedSearchResults = texts.current;
            window.savedSearchResults.grammar = result.grammar;
        }
    }, [result, isUpdated, texts]);

    if (result === null) return;

    const dataJoins = result.data.map(datum => datum.join(' '));
    return (<>
        <PopupEntriesWrapper result={result} setIsUpdated={setIsUpdated}>{
            isUpdated && result.data.map(([dentry, word], i) => 
                <PopupEntry key={dataJoins[i] + i}
                    dentry={dentry}
                    word={word}
                    showToneColors={showToneColors}
                    grammarIdx={result.grammar?.index}
                    idx={i}
                    texts={texts.current}
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