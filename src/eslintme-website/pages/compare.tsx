import { airbnb, google, standard } from 'utils/eslint.configs';
import style from '@style/ComparePage.module.scss';
import RuleRepresentation from '@components/RuleGraphicalRepresentation';

export default function ComparePage() {
    return (
        <div className={style.wrapper}>
            <table className={style.table}>
                <thead>
                    <tr>
                        <th>Rule</th>
                        <th>Google</th>
                        <th>Airbnb</th>
                        <th>Standard</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys({ ...airbnb, ...google, ...standard })
                        .sort()
                        .map((key) => {
                            return (
                                <tr key={key} className={style.tr}>
                                    <td>
                                        <a
                                            href={
                                                'https://eslint.org/docs/rules/' +
                                                key
                                            }
                                            target='_blank'
                                            rel='noreferrer'
                                        >
                                            {key}
                                        </a>
                                    </td>
                                    <td>
                                        <RuleRepresentation
                                            value={google[key]}
                                        />
                                    </td>
                                    <td>
                                        <RuleRepresentation
                                            value={airbnb[key]}
                                        />
                                    </td>
                                    <td>
                                        <RuleRepresentation
                                            value={standard[key]}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}
