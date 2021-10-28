import Model from '@components/Model';
import type { NextPage } from 'next';
import Link from 'next/link';
import style from '@style/Home.module.scss';

const Home: NextPage = () => {
    return (
        <>
            <div className={style.homeLayout}>
                <h1>Choose your model</h1>
                <div className={style.chooseModel}>
                    <Model
                        name='Airbnb'
                        features={[
                            'Semicolon required',
                            'Trailing comma required',
                            'No space before function ()',
                        ]}
                    />
                    <Model
                        name='Google'
                        features={[
                            'Semicolon required',
                            'Trailing comma required',
                            'Template string preferred',
                            'No space before function ()',
                        ]}
                    />
                    <Model
                        name='Standard'
                        features={[
                            'Trailing comma not allowed',
                            'Space before function ()',
                        ]}
                    />
                </div>
                <div className={style.other}>
                    <Link href='from-files/Empty'>
                        I don&apos;t want to use a model, start from scratch
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Home;
