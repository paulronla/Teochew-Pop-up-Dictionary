import TeochewPlayAllAnchor from "./teochew-play-all-anchor.js";
import TeochewPlayButton from "./teochew-play-button.js";
import PopupLayoutEffect from "./popup-layout-effect.js";
import CountPendingPromise from "./count-pending-promise.js";
export default function Chaoyin({ syllables, showToneColors, pinyinClass }) {
    const playAllArr = [];
    const syllablesElems = [];
    syllables.forEach((syllable, i) => {
        const singChaoyinArr = syllable.split('|');
        const toneNum = [1, 3, 4, 5][i % 4];
        const classes = [pinyinClass];
        showToneColors && classes.push(`tone${toneNum}`);
        const syllableElems = [];
        singChaoyinArr.forEach((singChaoyin, j) => {
            const [singChaoyinNoParen] = singChaoyin.split('(');
            if (j > 0) {
                if (['训', '俗'].some(marker => singChaoyin.includes(marker))) {
                    playAllArr[i] = singChaoyinNoParen;
                }
            }
            else {
                playAllArr.push(singChaoyinNoParen);
            }
            syllableElems.push(React.createElement(React.Fragment, { key: singChaoyin + j },
                j > 0 && '|',
                singChaoyin,
                React.createElement(TeochewPlayButton, { key: singChaoyinNoParen, singChaoyinNoParen: singChaoyinNoParen, cntPromiseComp: React.createElement(CountPendingPromise, null), layoutEffectComp: React.createElement(PopupLayoutEffect, null) })));
        });
        syllablesElems.push(React.createElement(React.Fragment, { key: syllable + i },
            React.createElement("span", { className: classes.join(' ') }, syllableElems),
            ' '));
    });
    return (React.createElement(React.Fragment, null,
        syllablesElems,
        React.createElement(TeochewPlayAllAnchor, { key: playAllArr.join(' '), singChaoyinNoParenArr: playAllArr, cntPromiseComp: React.createElement(CountPendingPromise, null), layoutEffectComp: React.createElement(PopupLayoutEffect, null) })));
}
