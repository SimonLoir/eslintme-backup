import style from '@style/Loader.module.scss';

/**
 * Component representing a Loader that can display a waiting text.
 * @prop text The text that should be displayed while the user waits.
 */
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
