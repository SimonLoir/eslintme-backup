import style from '@style/Header.module.scss';
export default function Header() {
    return (
        <header className={style.header}>
            <h1>ESLintME</h1>
            <nav>
                <a
                    href='https://eslint.org/docs/rules'
                    target='_blank'
                    rel='noreferrer'
                >
                    ESLint Rules
                </a>
            </nav>
        </header>
    );
}
