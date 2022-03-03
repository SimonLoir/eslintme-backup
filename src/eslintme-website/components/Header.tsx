import style from '@style/Header.module.scss';
import Link from 'next/link';

/**
 * Component representing the header of the app.
 */
export default function Header() {
    return (
        <header className={style.header}>
            <Link href='/'>
                <h1>ESLintME</h1>
            </Link>
            <nav>
                <Link href='/compare'>Compare Models</Link>
                <a
                    href='https://eslint.org/docs/rules'
                    target='_blank'
                    rel='noreferrer'
                >
                    ESLint Rules
                </a>
                <Link href='/about'>About</Link>
            </nav>
        </header>
    );
}
