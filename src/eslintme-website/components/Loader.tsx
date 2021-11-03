import style from '@style/Loader.module.scss';
export default function Loader({ text = '' }: { text: string }) {
    return (
        <div style={{ textAlign: 'center', padding: '25px' }}>
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
        </div>
    );
}
