import style from '@style/Loader.module.scss';
export default function Loader({ text = '' }: { text: string }) {
    return (
        <p style={{ textAlign: 'center' }}>
            <div className={style.loader}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <br />
            {text}
        </p>
    );
}
