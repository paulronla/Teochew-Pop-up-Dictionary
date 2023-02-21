import TeochewPlayAllAnchor from "./teochew-play-all-anchor.js";
import TeochewPlayButton from "./teochew-play-button.js";
import PopupLayoutEffect from "./popup-layout-effect.js";
import CountPendingPromise from "./count-pending-promise.js";

export default function Chaoyin({ syllables, showToneColors, pinyinClass }: {
    syllables: string[], showToneColors: boolean, pinyinClass: string
}) {
    const playAllArr: string[] = [];
    const syllablesElems: JSX.Element[] = [];
    syllables.forEach((syllable, i) => {
        const singChaoyinArr = syllable.split('|');
        const toneNum = [1,3,4,5][i%4];
        
        const classes: string[] = [pinyinClass]
        showToneColors && classes.push(`tone${toneNum}`);

        const syllableElems: JSX.Element[] = [];
        singChaoyinArr.forEach((singChaoyin, j) => {
            const [singChaoyinNoParen] = singChaoyin.split('(');
            
            if (j > 0) {
                if (['训','俗'].some(marker => singChaoyin.includes(marker))) {
                    playAllArr[i] = singChaoyinNoParen;
                }
            }
            else {
                playAllArr.push(singChaoyinNoParen);
            }

            syllableElems.push(
                <React.Fragment key={singChaoyin + j}>
                    {j > 0 && '|'}
                    {singChaoyin}
                    <TeochewPlayButton key={singChaoyinNoParen}
                        singChaoyinNoParen={singChaoyinNoParen}
                        cntPromiseComp={<CountPendingPromise />}
                        layoutEffectComp={<PopupLayoutEffect />}
                    />
                </React.Fragment>
            );
        });

        syllablesElems.push(
            <React.Fragment key={syllable + i}>
                <span className={ classes.join(' ') }>
                    {syllableElems}
                </span>
                {' '}
            </React.Fragment>
        );
    });

    return (
        <>
            {syllablesElems}
            <TeochewPlayAllAnchor key={playAllArr.join(' ')}
                singChaoyinNoParenArr={playAllArr}
                cntPromiseComp={<CountPendingPromise />}
                layoutEffectComp={<PopupLayoutEffect />}
            />
        </>
    );
}