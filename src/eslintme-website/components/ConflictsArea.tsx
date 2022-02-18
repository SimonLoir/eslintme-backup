import { useRouter } from 'next/router';

export default function ConflictsArea({ rules }: { rules: any }) {
    const router = useRouter();
    const model = router.query.model;
    if (model == 'None')
        return <p>You chose not to use a model. There are no conflicts.</p>;

    return (
        <>
            <p>All conflicts with the model "{model}" were fixed.</p>
        </>
    );
}
