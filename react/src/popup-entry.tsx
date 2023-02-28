import Pinyin from "./pinyin.js";
import Zhuyin from "./zhuyin.js";
import Chaoyin from "./chaoyin.js";

export default function PopupEntry({ dentry, word, showToneColors, grammarIdx, idx, texts }: {
    dentry: string,
    word: string,
    showToneColors: boolean,
    grammarIdx: number,
    idx: number,
    texts: [[string, string, string, string, string]?]
}) {
    const [{ didEffectRun, chaoyinArr }, setState] = React.useState({didEffectRun: false, chaoyinArr: []});
    const entry = dentry.match(/^([^\s]+?)\s+([^\s]+?)\s+\[(.*?)\]?\s*\/(.+)\//);

    if (!entry) return;

    const [, tradChars, simpChars, numTonedPinyin, english] = entry;
    const nondefClass = config.fontSize === "small" ? "w-nondef-small" : "w-nondef";

    // Hanzi

    const hanziClass = config.fontSize === "small" ? "w-hanzi-small" : "w-hanzi";
    const hanziElems = (
        <>
            <span className={hanziClass}>{config.simpTrad === "auto" ? word : simpChars}</span>&nbsp;
            {config.simpTrad !== "auto" && tradChars !== simpChars && (<>
            <span className={hanziClass}>{tradChars}</span>&nbsp;</>)}
        </>
    );

    // Pinyin

    const pinyinClass = config.fontSize === "small" ? "w-pinyin-small" : "w-pinyin";
    const tonedPinyin = genTonedPinyin(numTonedPinyin);

    // Chaoyin

    const chaoyinElems = (
        <>
            <span className={hanziClass}>&nbsp;</span>
            <Chaoyin syllables={chaoyinArr} showToneColors={showToneColors} pinyinClass={pinyinClass} />
        </>
    );

    // Definition

    const defClass = config.fontSize === "small" ? "w-def-small" : "w-def";
    const translation = english.replace(/\//g, '; ');

    // Grammar
    const grammar = (config.grammar !== "no" && grammarIdx === idx) && (
        <>
            <br />
            <span className="grammar">Press "g" for grammar and usage notes.</span>
            <br />
            <br />
        </>
    );

    texts[idx] = [simpChars, tradChars, tonedPinyin, translation, numTonedPinyin];

    return (<>
        <PopupEntryEffect tradChars={tradChars} simpChars={simpChars} pinyin={numTonedPinyin} setState={setState} />
        {didEffectRun && (<>
        <div className={nondefClass}>
            {hanziElems}
            {config.pinyin === "yes" &&
            <Pinyin numTonedSyllables={numTonedPinyin}
                showToneColors={showToneColors}
                pinyinClass={pinyinClass}
                tonedSyllables={tonedPinyin}
            />}
            {config.zhuyin !== "yes" && chaoyinElems}
        </div>
        {config.zhuyin === "yes" && (
        <div className={nondefClass}>
            <Zhuyin numTonedSyllables={numTonedPinyin} />
            {chaoyinElems}
        </div>)}
        <span className={defClass}>{translation}</span><br />
        {grammar}
        </>)}
    </>);
}

function PopupEntryEffect({ tradChars, simpChars, pinyin, setState }: {
    tradChars: string,
    simpChars: string,
    pinyin: string,
    setState: React.Dispatch<React.SetStateAction<{
        didEffectRun: boolean;
        chaoyinArr: any[];
    }>>
}) {
    React.useEffect(() => {
        let ignore = false;
        (async () => {
            const {chaoyinArr: result} = await mozilla.runtime.sendMessage({
                type: "chaoyin",
                tradChars,
                simpChars,
                pinyin
            });

            if (!ignore) {
                setState({didEffectRun: true, chaoyinArr: result});
            }
        })();

        return () => {ignore = true;};
    }, [tradChars, simpChars, pinyin, setState]);

    return null;
}