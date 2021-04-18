import React from 'react';
import { Button, ButtonGroup} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { selectHubConnectionId, setViewportMinimum, selectMaximums } from '../../../../store/chartDataReducer';
import { selectCurrentResult } from '../../../../store/resultReducer';
import { createRequestObject, apiCall } from '../../../../apiCall/apiCall';
import { ResultBackend } from '../../../../types/Result';
import { MaximumOnChart } from '../../../../types/Chart';
import styles from './GraphActions.module.css';

const GraphActions: React.FC = () => {
    const connectionId: string = useSelector(selectHubConnectionId);
    const currentResult: ResultBackend = useSelector(selectCurrentResult);
    const maximums: MaximumOnChart[] = useSelector(selectMaximums);
    const dispatch = useDispatch();

    const handleUnZoomFull = () => {
        const request = createRequestObject(
            'POST',
            'https://localhost:44353/api/Home/UnZoomFull',
            JSON.stringify({ 'connectionId': connectionId }));
        apiCall(request);
    }

    const handleAutoCenter = () => {
        const bandwidthX3 = currentResult.Bandwidth * 3;
        const start = maximums[0].frequency - bandwidthX3;
        const stop = maximums[maximums.length - 1].frequency + bandwidthX3;

        const request = createRequestObject(
            'POST',
            'https://localhost:44353/api/Home/SetStartStopRangeFrequency',
            JSON.stringify({
                'connectionId': connectionId,
                'start': start.toString().replace('.',','),
                'stop': stop.toString().replace('.',',')
                }));
        apiCall(request);
    }

    const handleAutoScale = () => {
        dispatch(setViewportMinimum())
    }

    return (
        <ButtonGroup className={styles.buttonsGroup}  color="primary" size="small">
            <Button onClick={handleAutoCenter}>
                {'Autocenter'}
            </Button>
            <Button onClick={handleAutoScale}>
                {'Autoscale'}
            </Button>
            <Button onClick={handleUnZoomFull}>
                {'Un-zoom full'}
            </Button>
        </ButtonGroup>
    );
}

export default GraphActions;