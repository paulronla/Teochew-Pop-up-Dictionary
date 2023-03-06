import PopupEntry from "./popup-entry.js";
import PopupProviderWrapper from "./popup-provider-wrapper.js";
export default function ReactPopup({ result, showToneColors, elem, x, y }) {
    const [isUpdated, setIsUpdated] = React.useState(false);
    const texts = React.useRef([]);
    React.useEffect(() => { popup.style.display = "none"; }, []);
    React.useEffect(() => {
        if (result !== null && isUpdated) {
            savedSearchResults = texts.current;
            savedSearchResults.grammar = result.grammar;
        }
    }, [result, isUpdated, texts]);
    if (result === null)
        return;
    const dataJoins = result.data.map(datum => datum.join(' '));
    return (React.createElement(React.Fragment, null,
        React.createElement(PopupEntriesEffect, { result: result, setIsUpdated: setIsUpdated }),
        isUpdated && (React.createElement(PopupProviderWrapper, { elem: elem, xPnt: x, yPnt: y }, result.data.map(([dentry, word], i) => React.createElement(PopupEntry, { key: dataJoins[i] + i, dentry: dentry, word: word, showToneColors: showToneColors, grammarIdx: result.grammar?.index, idx: i, texts: texts.current })))),
        result.more && React.createElement(React.Fragment, null,
            "\u2026",
            React.createElement("br", null))));
}
function PopupEntriesEffect({ result, setIsUpdated }) {
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
    return null;
}
