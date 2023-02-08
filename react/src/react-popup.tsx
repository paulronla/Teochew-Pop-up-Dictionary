import PopupEntry from "./popup-entry";

export default function ReactPopup({ result, showToneColors }: {
    result: { 
        data: [[string, string]],
        grammar: { keyword: string, index: number },
        more: number
    },
    showToneColors: boolean
}) {
    const [isUpdated, setIsUpdated] = React.useState(false);
    React.useEffect(() => {
        if (result !== null) {
            let ignore = false;
            (async () => {
                const [, tradChars, simpChars] = result.data[0][0].match(/^([^\s]+?)\s+([^\s]+?)\s+\[(.*?)\]?\s*\/(.+)\//);
                await mozilla.runtime.sendMessage({
                    'type': 'updateTeochewAssets',
                    'tradChars': tradChars,
                    'simpChars': simpChars
                });

                if (!ignore) {
                    setIsUpdated(true);
                }
            })();
            
            return () => { ignore = true; };
        }
    }, [result?.data[0][0]]);

    if (result === null) return;

    const dataJoins = isUpdated && result.data.map(datum => datum.join(' '));
    return isUpdated && (
        <React.Fragment key={ dataJoins.join(' ') }>
            {
                result.data.map((datum, i) => 
                    <PopupEntry key={dataJoins[i] + i}
                        datum={datum}
                        showToneColors={showToneColors}
                        grammarIdx={result.grammar?.index}
                    />
                )
            }
        </React.Fragment>
    );
}