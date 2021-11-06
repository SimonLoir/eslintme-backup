import { airbnb, google, standadr } from 'utils/eslint.configs';
import style from '@style/ComparePage.module.scss';

export default function ComparePage() {
    return (
        <div className={style.wrapper}>
            <table className={style.table}>
                <thead>
                    <tr>
                        <th>Règle</th>
                        <th>Google</th>
                        <th>Airbnb</th>
                        <th>Standard</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys({ ...airbnb, ...google, ...standadr })
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
                                    <td style={{ wordBreak: 'break-all' }}>
                                        {google[key]
                                            ? JSON.stringify(google[key])
                                            : '/'}
                                    </td>
                                    <td style={{ wordBreak: 'break-all' }}>
                                        {airbnb[key]
                                            ? JSON.stringify(airbnb[key])
                                            : '/'}
                                    </td>
                                    <td style={{ wordBreak: 'break-all' }}>
                                        {standadr[key]
                                            ? JSON.stringify(standadr[key])
                                            : '/'}
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}
