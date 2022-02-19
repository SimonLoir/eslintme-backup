import { useEffect, useState } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
export default function OverrideOrderListItem({
    data,
    onChange,
    moveUp,
    moveDown,
    canGoUp,
    canGoDown,
}: {
    onChange: (enable: boolean, force: boolean) => void;
    moveUp: () => void;
    moveDown: () => void;
    data: OOListItem;
    canGoUp: boolean;
    canGoDown: boolean;
}) {
    const [enable, setEnable] = useState(false);
    const [force, setForce] = useState(false);

    const changeEnable = (enable: boolean) => {
        setEnable(enable);
        onChange(enable, force);
    };
    const changeForce = (force: boolean) => {
        setForce(force);
        onChange(enable, force);
    };

    useEffect(() => {
        setEnable(data.enabled);
        setForce(data.force);
    }, []);

    return (
        <>
            <tr>
                <td>
                    {canGoUp ? (
                        <ArrowUpwardIcon onClick={moveUp}></ArrowUpwardIcon>
                    ) : (
                        ''
                    )}
                    {canGoDown ? (
                        <ArrowDownwardIcon
                            onClick={moveDown}
                        ></ArrowDownwardIcon>
                    ) : (
                        ''
                    )}
                </td>
                <td>{data.name}</td>
                <td>
                    <input
                        type='checkbox'
                        checked={force}
                        onChange={(e) => changeForce(e.target.checked)}
                    />
                </td>

                <td>
                    <input
                        type='checkbox'
                        checked={enable}
                        onChange={(e) => changeEnable(e.target.checked)}
                    />
                </td>
            </tr>
        </>
    );
}
