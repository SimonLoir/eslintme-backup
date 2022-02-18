import { useRouter } from 'next/router';
import { useState } from 'react';
import OverrideOrderListItem from './OverrideOrderListItem';

export default function OverrideOrderList({ worker }: { worker: Worker }) {
    const router = useRouter();
    const model = router.query.model;
    const [options, setOptions] = useState([
        { name: 'Rules found', id: 'r-found', enabled: true, force: false },
        {
            name: `Rules from model (${model})`,
            id: model?.toString(),
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

    return (
        <>
            {options.map((o) => (
                <OverrideOrderListItem key={o.id} data={o} />
            ))}
        </>
    );
}
