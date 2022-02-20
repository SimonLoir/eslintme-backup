import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import OverrideOrderListItem from './OverrideOrderListItem';

export default function OverrideOrderList({ worker }: { worker: Worker }) {
    const router = useRouter();
    const [options, setOptions] = useState<OOListItem[]>([]);

    /**
     * Notifies a change in the order list to the worker
     * @param opt The new order list
     */
    const notifyOptionsChange = (opt: OOListItem[]) => {
        worker.postMessage({ type: 'order-list-change', content: opt });
        return opt;
    };

    /**
     * Moves an element in the order list from a position to an other
     * @param from The current position of the element
     * @param to The desired position of the element
     */
    const moveFromTo = (from: number, to: number) => {
        setOptions((o) => {
            let item = o.splice(from, 1);
            o.splice(to, 0, item[0]);
            notifyOptionsChange(o);
            return [...o];
        });
    };
    /**
     * Moves an element up in the order list
     * @param index The current position of the element
     */
    const moveUp = (index: number) => {
        if (index > 0) moveFromTo(index, index - 1);
    };
    /**
     * Moves an element down in the order list
     * @param index The current position of the element
     */
    const moveDown = (index: number) => {
        if (index < options.length - 1) moveFromTo(index, index + 1);
    };

    useEffect(() => {
        setOptions(
            notifyOptionsChange([
                {
                    name: 'Rules found',
                    id: 'found',
                    enabled: true,
                    force: true,
                },
                {
                    name: `Rules from model (${router.query.model})`,
                    id: router.query.model?.toString(),
                    enabled: true,
                    force: true,
                },
                {
                    name: 'Rules recommended',
                    id: 'recommended',
                    enabled: true,
                    force: true,
                },
            ])
        );
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
                                notifyOptionsChange(o);
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
