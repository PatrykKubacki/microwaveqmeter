import React from 'react';
import { SavedResult } from '../../types/SavedResult';
import { LabelData } from '../Controls';
import { useSelector } from 'react-redux';
import { selectSavedResultDisplay } from '../../store/settingsReducer';

type Props = {
    item: SavedResult;
}

const SavedResultsContent: React.FC<Props> = ({item}) => {
    const {
        displayF0,
        displayQFactor,
        displayBandwidth,
        displayPeakTransmittance,
        displayPointsOnScreen } = useSelector(selectSavedResultDisplay)

    return (
        <div>
         <ul>
            {displayF0 && <li>
                <LabelData label="f0" value={`${item.f0} Mhz`}/>
            </li>}
            {displayQFactor && <li>
                <LabelData label="Q" value={item.q}/>
            </li>}
            {displayBandwidth && <li>
                <LabelData label="3dB BW" value={`${item.bw} Mhz`}/>
            </li>}
            {displayPeakTransmittance && <li>
                <LabelData label="Peak" value={`${item.peak} dB`}/>
            </li>}
            {displayPointsOnScreen && <li>
                <LabelData label="Points" value={item.points}/>
            </li>}
        </ul> 
        </div>
    )
}

export default SavedResultsContent;