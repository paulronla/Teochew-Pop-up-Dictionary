import TeochewPlayAllAnchor from "./teochew-play-all-anchor";
import TeochewPlayButton from "./teochew-play-button";

export default function Chaoyin({ syllables, showToneColors, pinyinClass }: 
        { syllables: string[], showToneColors: boolean, pinyinClass: string }
    ) {
    const playAllArr: string[] = [];
    const syllablesMarkup: JSX.Element[] = [];
    syllables.forEach((syllable, i) => {
        const singChaoyinArr = syllable.split('|');
        const toneNum = [1,3,4,5][i%4];
        
        const classes: string[] = [pinyinClass]
        showToneColors && classes.push(`tone${toneNum}`);

        syllablesMarkup.push(
            <React.Fragment key={i}>
                <span className={ classes.join(' ') }>

                </span>
                {' '}
            </React.Fragment>
        );
    });

    return (
        <>
            {syllablesMarkup}
            <TeochewPlayAllAnchor singChaoyinNoParenArr={playAllArr} />
        </>
    );
}