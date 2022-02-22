import RuleRepresentation from '@components/RuleGraphicalRepresentation';
import Rule from '@core/Rule';
import style from '@style/FullScreenModal.module.scss';
import {
    airbnb,
    google,
    recommended_rules,
    standard,
} from 'utils/eslint.configs';
const data = [
    { name: 'Airbnb', data: airbnb },
    { name: 'Google', data: google },
    { name: 'Standard', data: standard },
    { name: 'Recommended', data: recommended_rules },
];
export default function FullScreenOptionsChooser({
    name,
    quit,
}: {
    name: string;
    quit: () => void;
}) {
    return (
        <>
            <div className={style.mask}></div>
            <div className={style.modal}>
                <div className={style.header}>{name}</div>
                <div className={style.content}>
                    <h3>From the files</h3>
                    <div className={style.horizontal}></div>
                    <h3>In the models</h3>
                    <div className={style.horizontal}>
                        {data.map(function ({ name: set_name, data }, i) {
                            if (data[name] == undefined)
                                return (
                                    <div
                                        key={i}
                                        style={{ display: 'none' }}
                                    ></div>
                                );
                            return (
                                <div className={style.vertical} key={i}>
                                    <h4>{set_name}</h4>
                                    <RuleRepresentation
                                        value={Rule.normalize(data[name])}
                                    />
                                    <div className={style.bottom}>
                                        <button>Use this config</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={style.toolbar}>
                    <button onClick={() => quit()}>Cancel</button>
                </div>
            </div>
        </>
    );
}
