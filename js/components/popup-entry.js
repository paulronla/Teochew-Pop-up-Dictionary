import Pinyin from "./pinyin.js";
import Zhuyin from "./zhuyin.js";
import Chaoyin from "./chaoyin.js";
export default function PopupEntry({ dentry, word, showToneColors, grammarIdx, idx, texts }) {
    const [{ didEffectRun, chaoyinArr }, setState] = React.useState({ didEffectRun: false, chaoyinArr: [] });
    const entry = dentry.match(/^([^\s]+?)\s+([^\s]+?)\s+\[(.*?)\]?\s*\/(.+)\//);
    if (!entry)
        return;
    const [, tradChars, simpChars, numTonedPinyin, english] = entry;
    const nondefClass = config.fontSize === "small" ? "w-nondef-small" : "w-nondef";
    // Hanzi
    const hanziClass = config.fontSize === "small" ? "w-hanzi-small" : "w-hanzi";
    const hanziElems = (React.createElement(React.Fragment, null,
        React.createElement("span", { className: hanziClass }, config.simpTrad === "auto" ? word : simpChars),
        "\u00A0",
        config.simpTrad !== "auto" && tradChars !== simpChars && (React.createElement(React.Fragment, null,
            React.createElement("span", { className: hanziClass }, tradChars),
            "\u00A0"))));
    // Pinyin
    const pinyinClass = config.fontSize === "small" ? "w-pinyin-small" : "w-pinyin";
    const tonedPinyin = genTonedPinyin(numTonedPinyin);
    // Chaoyin
    const chaoyinElems = (React.createElement(React.Fragment, null,
        React.createElement("span", { className: hanziClass }, "\u00A0"),
        React.createElement(Chaoyin, { syllables: chaoyinArr, showToneColors: showToneColors, pinyinClass: pinyinClass })));
    // Definition
    const defClass = config.fontSize === "small" ? "w-def-small" : "w-def";
    const translation = english.replace(/\//g, '; ');
    // Grammar
    const grammar = (config.grammar !== "no" && grammarIdx === idx) && (React.createElement(React.Fragment, null,
        React.createElement("br", null),
        React.createElement("span", { className: "grammar" }, "Press \"g\" for grammar and usage notes."),
        React.createElement("br", null),
        React.createElement("br", null)));
    texts[idx] = [simpChars, tradChars, tonedPinyin, translation, numTonedPinyin];
    return (React.createElement(React.Fragment, null,
        React.createElement(PopupEntryEffect, { tradChars: tradChars, simpChars: simpChars, pinyin: numTonedPinyin, setState: setState }),
        didEffectRun && (React.createElement(React.Fragment, null,
            React.createElement("div", { className: nondefClass },
                hanziElems,
                config.pinyin === "yes" &&
                    React.createElement(Pinyin, { numTonedSyllables: numTonedPinyin, showToneColors: showToneColors, pinyinClass: pinyinClass, tonedSyllables: tonedPinyin }),
                config.zhuyin !== "yes" && chaoyinElems),
            config.zhuyin === "yes" && (React.createElement("div", { className: nondefClass },
                React.createElement(Zhuyin, { numTonedSyllables: numTonedPinyin }),
                chaoyinElems)),
            React.createElement("span", { className: defClass }, translation),
            React.createElement("br", null),
            grammar))));
}
function PopupEntryEffect({ tradChars, simpChars, pinyin, setState }) {
    React.useEffect(() => {
        let ignore = false;
        (async () => {
            const { chaoyinArr: result } = await mozilla.runtime.sendMessage({
                type: "chaoyin",
                tradChars,
                simpChars,
                pinyin
            });
            if (!ignore) {
                setState({ didEffectRun: true, chaoyinArr: result });
            }
        })();
        return () => { ignore = true; };
    }, [tradChars, simpChars, pinyin, setState]);
    return null;
}
