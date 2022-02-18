export default function OverrideOrderListItem({
    data,
}: {
    data: {
        name: string;
        id: string | undefined;
        force: boolean;
        enabled: boolean;
    };
}) {
    return <div style={{ display: 'block', padding: '15px' }}>{data.name}</div>;
}
