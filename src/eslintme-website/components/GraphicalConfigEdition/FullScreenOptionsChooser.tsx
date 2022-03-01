import RuleRepresentation from '@components/RuleGraphicalRepresentation';
import ReactMarkdown from 'react-markdown';
import Rule from '@core/Rule';
import style from '@style/FullScreenModal.module.scss';
import {
    airbnb,
    eslint_rules,
    google,
    recommended_rules,
    standard,
} from 'utils/eslint.configs';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import Loader from '@components/Loader';
import CustomConfig from './CustomConfig';

const data = [
    { name: 'Airbnb', data: airbnb },
    { name: 'Google', data: google },
    { name: 'Standard', data: standard },
    { name: 'Recommended', data: recommended_rules },
];
export default function FullScreenOptionsChooser({
    name,
    quit,
    options,
    select,
    current,
}: {
    name: string;
    quit: () => void;
    options: RuleData[];
    select: (data: any) => void;
    current: any;
}) {
    const { data: description, error } = useSWR(`rules/${name}.md`, fetcher);
    const choose = (d: any) => {
        select(d);
        quit();
    };
    return (
        <>
            <div className={style.mask} onClick={() => quit()}></div>
            <div className={style.modal}>
                <div className={style.header}>{name}</div>
                <div className={style.content}>
                    <div>
                        <h3>Custom config</h3>
                        <CustomConfig
                            current_config={current}
                            name={name}
                            validate={choose}
                        />
                        <h3>From the files</h3>
                        {options.length == 0 ? (
                            <p>Could not find other options for this rule.</p>
                        ) : (
                            <div className={style.horizontal}>
                                {options.map(function (opt, i) {
                                    const data: any[] = [2];

                                    if (
                                        !opt.noValue &&
                                        opt.options != undefined
                                    )
                                        data.push(opt.options);
                                    if (!opt.noValue && opt.value != undefined)
                                        data.push(opt.value);

                                    return (
                                        <div className={style.vertical} key={i}>
                                            <h4>Custom</h4>
                                            <RuleRepresentation
                                                value={Rule.normalize(data)}
                                            />
                                            <div className={style.bottom}>
                                                <button
                                                    onClick={() => choose(data)}
                                                >
                                                    Use this config
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
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
                                            <button
                                                onClick={() =>
                                                    choose(data[name])
                                                }
                                            >
                                                Use this config
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div
                        style={{
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            padding: '5px',
                            lineHeight: 1.6,
                        }}
                    >
                        {error ? (
                            <p>
                                An error occurred.{' '}
                                {eslint_rules[name] == undefined
                                    ? 'This rule is not a valid eslint rule (it may be deprecated). We could not find the documentation for it.'
                                    : ''}
                            </p>
                        ) : description ? (
                            <ReactMarkdown>{description}</ReactMarkdown>
                        ) : (
                            <Loader text='loading' />
                        )}
                    </div>
                </div>
                <div className={style.toolbar}>
                    <button onClick={() => quit()}>Cancel</button>
                </div>
            </div>
        </>
    );
}
