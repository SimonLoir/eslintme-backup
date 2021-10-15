import style from '@style/Header.module.scss';
import Link from 'next/link';
export default function Header() {
    return (
        <header className={style.header}>
            <h1>ESLintME</h1>
            <nav>
                <Link href='https://eslint.org/docs/rules'>ESLint Rules</Link>
            </nav>
        </header>
    );
}
