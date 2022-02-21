import RuleRepresentation from '@components/RuleGraphicalRepresentation';
import Rule from '@core/Rule';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';
import RuleLevelChooser from './RuleLevelChooser';
export default function RuleGraphicalEditor({
    worker,
    data,
    exception,
    name,
}: {
    worker: Worker;
    data: any;
    exception: any;
    name: string;
}) {
    const [showMore, setShowMore] = useState(false);
    const rule_data = Rule.normalize(exception ?? data);
    return (
        <div
            style={{
                lineHeight: '60px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 45px',
                borderBottom: '1px solid gray',
                outline: 'none',
                userSelect: 'none',
            }}
        >
            <span
                onClick={() => setShowMore((e) => !e)}
                style={{ cursor: 'pointer' }}
            >
                {name}
            </span>
            <div style={{ textAlign: 'right' }}>
                <RuleLevelChooser selected={rule_data[0]} />
            </div>
            <div>
                <SettingsIcon
                    style={{ verticalAlign: 'middle', cursor: 'pointer' }}
                    onClick={() => setShowMore((e) => !e)}
                ></SettingsIcon>
            </div>
            <div
                style={{
                    wordBreak: 'break-word',
                    gridColumn: '1 / span 3',
                    display: showMore ? 'block' : 'none',
                }}
            >
                <RuleRepresentation value={rule_data} icon={false} />
            </div>
        </div>
    );
}
