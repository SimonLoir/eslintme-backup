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
