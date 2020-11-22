import React from 'react';
import './LabelData.css'

type Props = {
    label: string;
    value: string;
    boldMode?: boolean;
}

const LabelData: React.FC<Props> = ({label, value, boldMode}) => {
    return (
    boldMode ? (
        <label className="labelData">
            <b>{`${label}: ${value}`}</b>
        </label>
    ) : (
        <label className="labelData">
            {`${label}: ${value}`}
        </label>
    )
    )
} 

export default LabelData;