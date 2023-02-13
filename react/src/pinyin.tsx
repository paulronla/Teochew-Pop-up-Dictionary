const dict = {
    r5: "r",
    xx5: "??",
};

export default function Pinyin({ syllables, showToneColors, pinyinClass }:{
    syllables: string, showToneColors: boolean, pinyinClass: string
}) {
    return (<>{
        syllables.split(/[\s·]+/).map((syllable, i) => {
            const key = syllable + i;

            // ',' in pinyin
            if (syllable === ',') {
                return <React.Fragment key={key}>{" ,"}</React.Fragment>;
            }

            const spaceElem = (i > 0) ? <>{' '}</> : null;

            if (dict.hasOwnProperty(syllable)) {
                return (
                    <PinyinFragment key={key}
                        spaceElem={spaceElem}
                        className={pinyinClass + (showToneColors ? " tone5" : '')}
                    >
                        {dict[syllable]}
                    </PinyinFragment>
                );
            }

            const m = parse(syllable);
            const [, t] = tonify(m[2], m[4]);
            return (
                <PinyinFragment key={key}
                    spaceElem={spaceElem}
                    className={pinyinClass + (showToneColors ? ` tone${m[4]}` : '')}
                >
                    {m[1] + t + m[3]}
                </PinyinFragment>
            );
        })
    }</>);
}

function PinyinFragment({ spaceElem, className, children }:
    { key: string, spaceElem: JSX.Element, className: string, children: React.ReactNode }
) {
    return (
        <>
            {spaceElem}
            <span className={className}>
                {children}
            </span>
        </>
    );
}