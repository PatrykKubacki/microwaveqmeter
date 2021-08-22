import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setChartData as setChartDataAction, setHubConnectionId } from '../../../../store/chartDataReducer';
import { selectStartFrequency, selectStopFrequency, selectPointsOnScreen } from '../../../../store/graphActionsReducer';
import { setCurrentResult, setLastSessionsNames } from '../../../../store/resultReducer';
import { ResultBackend } from '../../../../types/Result';
import { MaximumOnChart } from '../../../../types/Chart';
import { createRequestObject, apiCall } from '../../../../apiCall/apiCall';
import GraphActions from './GraphActions';
import GraphSwipeInputs from './GraphSwipeInputs';
import styles from './GraphSection.module.css';
import Graph from './Graph';
import { DesktopOnly, MobileOnly } from '../../../MediaQuery';
import ActionPanelMobile from '../../../Mobile/ActionPanelMobile/ActionPanelMobile';
import { useSelector } from 'react-redux';
import * as SignalR from '@microsoft/signalr';

type Point = {
    x: number;
    y: number;
}

type FitCurve = {
    points: Point[];
    isFitError: boolean;
}

type ChartData = {
    points: Point[]
    qFactorResults: ResultBackend[];
    maximums: MaximumOnChart[];
    minimumPointValue: number;
    lorenzeCurves: Point[][];
    fitCurves: FitCurve[];
    measuredPointsPerSecond: number;
}

const initialChartData = {
    points: [],
    maximums: [],
    minimumPointValue: 0,
    lorenzeCurves:[],
    fitCurves: [],
    measuredPointsPerSecond: 0,
    qFactorResults: [{
        Q_factor: 0,
        CenterFrequency: 0,
        Bandwidth: 0,
        PeakTransmittance: 0,
        CenterFrequencyDifference: 0,
        NumberOfPoints: 0,
    }],
}

const GraphSection: React.FC = () => {
    const [hubConnection, setHubConnection] = useState<SignalR.HubConnection>();
    const [chartData, setChartData] = useState<ChartData>(initialChartData);
    const startFrequency: number = useSelector(selectStartFrequency);
    const stopFrequency: number = useSelector(selectStopFrequency);
    const pointsOnScreen: number = useSelector(selectPointsOnScreen);
    const dispatch = useDispatch();

     const setHubConnectionParams = () => {
        const request = createRequestObject('POST',
                'https://localhost:44353/api/Home/SetHubParameters',
                JSON.stringify({ 
                    'start': startFrequency.toString(),
                    'stop': stopFrequency.toString(),
                    'points': pointsOnScreen.toString(),
                     }));
        apiCall(request);
     }

     const handleSetLastSession = (sessions: object) => {
        dispatch(setLastSessionsNames(sessions))
    }

     const getSavedMeasurementsFilesList = () => {
        const request = createRequestObject('GET',
            'https://localhost:44353/api/Home/GetSavedMeasurementsFilesList',
            undefined, 
            handleSetLastSession);
        apiCall(request);
     }

    useEffect(() => {
        const connection = new SignalR.HubConnectionBuilder()
            .withUrl("https://localhost:44353/chart")
            .configureLogging(SignalR.LogLevel.Information)
            .withAutomaticReconnect()
            .build();

        setHubConnection(connection);    
    },[])

    useEffect(() => {
        if(hubConnection) {
             hubConnection.start()
                          .then(() => console.log('Connection started!'))
                          .then(() => dispatch(setHubConnectionId(hubConnection.connectionId)))
                          .then(() => setHubConnectionParams())
                          .then(() => getSavedMeasurementsFilesList())
                          .catch(err => console.log('Error while establishing connection :('));
            
            hubConnection.on('sendChart',(chartData: ChartData) => {
                if(chartData && chartData.points) {
                //    console.log(`X: ${chartData.points[0].x} Y: ${chartData.points[0].y}`) 
                //    console.log(`X: ${chartData.points[1].x} Y: ${chartData.points[1].y}`) 
                //    console.log(`X: ${chartData.points[2].x} Y: ${chartData.points[2].y}`) 
                //    console.log(`X: ${chartData.points[3].x} Y: ${chartData.points[3].y}`) 
                //console.log(new Date(Date.now()).toString())
                //console.log(`punkty: ${chartData.points.length.toString()}`)
                setChartData(chartData);
                }
            });
        }
       
    },[hubConnection,dispatch]);

    useEffect(()=> {
        const setChartDataReduxState = () => {
            const data = {
                maximums: chartData.maximums,
                minimumPointValue: chartData.minimumPointValue,
                isFitErrors: chartData.fitCurves.map(x => x.isFitError),
                measuredPointsPerSecond: chartData.measuredPointsPerSecond,
            }
            dispatch(setChartDataAction(data));
            dispatch(setCurrentResult(chartData.qFactorResults))
        }

        setChartDataReduxState();
    },[chartData.minimumPointValue,chartData.qFactorResults,chartData.maximums,chartData.fitCurves, dispatch, chartData.measuredPointsPerSecond])

    return (
    <div>
        <DesktopOnly>
        <div className={styles.actionPanel}>
            <GraphActions />
            <GraphSwipeInputs />
        </div>
        </DesktopOnly>
        <div className={styles.graphPanel}>
           <Graph chartData={chartData}/>
        </div>
        <MobileOnly>
            <ActionPanelMobile />
        </MobileOnly>
    </div>)
}

export default GraphSection;