import ProgressBar from '@components/ProgressBar';
import WorkingArea from '@components/WorkingArea';
import pbStyle from '@style/ProgressBar.module.scss';
import { useEffect, useState } from 'react';

const steps = ['Upload Files', 'Manage Rules', 'Export'];
export default function ModelPage() {
    const [step, setStep] = useState(0);
    return (
        <div
            style={{
                position: 'relative',
                display: 'grid',
                gridTemplateRows: '30px 1fr',
                height: '100%',
                width: '100%',
                gap: 45,
            }}
        >
            <div
                style={{
                    position: 'relative',
                    display: 'grid',
                    gridTemplateColumns: '200px 1fr 200px',
                }}
            >
                <div
                    className={pbStyle.sideButton}
                    style={{ textAlign: 'right' }}
                >
                    {step > 0 ? (
                        <span
                            className={pbStyle.link}
                            onClick={() => setStep((s) => s - 1)}
                        >
                            &lt; {steps[step - 1]}
                        </span>
                    ) : null}
                </div>
                <ProgressBar
                    steps={steps}
                    current={step}
                    select={(e) => setStep(e)}
                />
                <div
                    className={pbStyle.sideButton}
                    style={{ textAlign: 'left' }}
                >
                    {step < steps.length - 1 ? (
                        <span
                            className={pbStyle.link}
                            onClick={() => setStep((s) => s + 1)}
                        >
                            {steps[step + 1]} &gt;
                        </span>
                    ) : null}
                </div>
            </div>
            <div style={{ overflow: 'hidden' }}>
                <WorkingArea state={step} />
            </div>
        </div>
    );
}
