import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import OverrideOrderListItem from './OverrideOrderListItem';

export interface OOListItem {
    name: string;
    id: string | undefined;
    force: boolean;
    enabled: boolean;
}

export default function OverrideOrderList({ worker }: { worker: Worker }) {
    const router = useRouter();
    const [options, setOptions] = useState<OOListItem[]>([]);

    const moveFromTo = (from: number, to: number) => {
        setOptions((o) => {
            let item = o.splice(from, 1);
            o.splice(to, 0, item[0]);
            return [...o];
        });
    };
    const moveUp = (index: number) => {
        if (index > 0) moveFromTo(index, index - 1);
    };
    const moveDown = (index: number) => {
        if (index < options.length - 1) moveFromTo(index, index + 1);
    };

    useEffect(() => {
        setOptions([
            { name: 'Rules found', id: 'r-found', enabled: true, force: false },
            {
                name: `Rules from model (${router.query.model})`,
                id: `model-${router.query.model}`,
                enabled: true,
                force: false,
            },
            {
                name: 'Rules recommended',
                id: 'recommended',
                enabled: true,
                force: false,
            },
        ]);
    }, [router.query.model]);

    return (
        <table className='table' style={{ width: '100%' }}>
            <thead>
                <tr>
                    <th>Order</th>
                    <th>Name</th>
                    <th>Force</th>
                    <th>Enable</th>
                </tr>
            </thead>
            <tbody>
                {options.map((o, i) => (
                    <OverrideOrderListItem
                        data={o}
                        key={o.id + '-' + i}
                        onChange={function (e, f) {
                            setOptions((o) => {
                                o[i].enabled = e;
                                o[i].force = f;
                                console.log(o);
                                return [...o];
                            });
                        }}
                        moveUp={() => moveUp(i)}
                        moveDown={() => moveDown(i)}
                        canGoUp={i > 0}
                        canGoDown={i < options.length - 1}
                    />
                ))}
            </tbody>
        </table>
    );
}
