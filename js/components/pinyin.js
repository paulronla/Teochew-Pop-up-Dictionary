const dict = {
    r5: "r",
    xx5: "??",
};
export default function Pinyin({ numTonedSyllables, showToneColors, pinyinClass, tonedSyllables }) {
    const tonedSyllableList = tonedSyllables.split(/[\s·]+/);
    return (React.createElement(React.Fragment, null, numTonedSyllables.split(/[\s·]+/).map((syllable, i) => {
        const key = syllable + i;
        // ',' in pinyin
        if (syllable === ',') {
            return React.createElement(React.Fragment, { key: key }, " ,");
        }
        const spaceElem = (i > 0) ? React.createElement(React.Fragment, null, ' ') : null;
        if (dict.hasOwnProperty(syllable)) {
            return (React.createElement(PinyinFragment, { key: key, spaceElem: spaceElem, className: pinyinClass + (showToneColors ? " tone5" : '') }, dict[syllable]));
        }
        const m = parse(syllable);
        return (React.createElement(PinyinFragment, { key: key, spaceElem: spaceElem, className: pinyinClass + (showToneColors ? ` tone${m[4]}` : '') }, tonedSyllableList[i]));
    })));
}
function PinyinFragment({ spaceElem, className, children }) {
    return (React.createElement(React.Fragment, null,
        spaceElem,
        React.createElement("span", { className: className }, children)));
}
