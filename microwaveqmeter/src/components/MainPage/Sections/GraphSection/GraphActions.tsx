import React from 'react';
import { Button, ButtonGroup} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { setViewportMinimum, selectMaximums } from '../../../../store/chartDataReducer';
import { setInitialGrphsActions, initialState as hubParameters, setStartStopRange } from '../../../../store/graphActionsReducer';
import { selectActiveCurrentResult } from '../../../../store/resultReducer';
import { createRequestObject, apiCall } from '../../../../apiCall/apiCall';
import { ResultBackend } from '../../../../types/Result';
import { MaximumOnChart } from '../../../../types/Chart';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import styles from './GraphActions.module.css';

const GraphActions: React.FC = () => {
    const isTabletOrMobile = useMediaQuery('(max-width: 1024px)');
    const activeCurrentResult: ResultBackend = useSelector(selectActiveCurrentResult);
    const maximums: MaximumOnChart[] = useSelector(selectMaximums);
    const dispatch = useDispatch();

    const handleUnZoomFull = () => {
        const request = createRequestObject(
            'POST',
            'https://localhost:44353/api/Home/SetHubParameters',
            JSON.stringify({ 
                'start': hubParameters.startFrequency.toString(),
                'stop': hubParameters.stopFrequency.toString(),
                'points': hubParameters.pointsOnScreen.toString(),
                 }))
        apiCall(request);
        dispatch(setInitialGrphsActions());
    }

    const handleAutoCenter = () => {
        const bandwidthX3 = activeCurrentResult.Bandwidth * 3;
        const start = maximums[0].frequency - bandwidthX3;
        const stop = maximums[maximums.length - 1].frequency + bandwidthX3;

        const request = createRequestObject(
            'POST',
            'https://localhost:44353/api/Home/SetStartStopRangeFrequency',
            JSON.stringify({
                'start': start.toString().replace('.',','),
                'stop': stop.toString().replace('.',',')
                }));
        apiCall(request);
        dispatch(setStartStopRange({start: start, stop: stop}));
    }

    const handleAutoScale = () => {
        dispatch(setViewportMinimum())
    }

    return (
        <ButtonGroup className={styles.buttonsGroup} color="primary" size={isTabletOrMobile ? 'large' : 'small'} orientation={isTabletOrMobile ? 'vertical' : 'horizontal'}>
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