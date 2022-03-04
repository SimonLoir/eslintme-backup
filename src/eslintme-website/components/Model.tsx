import style from '@style/Model.module.scss';
import Link from 'next/link';
interface ModelProps {
    name: string;
    features: string[];
}

/**
 * Component representing a model on the home page.
 * @prop name The name of the model.
 * @prop features The list of features of the model.
 */
export default function Model({ name, features }: ModelProps) {
    console.assert(name != undefined, 'No model name provided');
    console.assert(
        features != undefined && features.length > 0,
        'No feature provided'
    );
    return (
        <Link href={'/' + name} passHref>
            <div className={style.model}>
                <h2>{name}</h2>
                {features.map((f) => (
                    <p key={f}>{f}</p>
                ))}
            </div>
        </Link>
    );
}
