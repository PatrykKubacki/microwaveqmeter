import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setChartData as setChartDataAction, setHubConnectionId } from '../../../../store/chartDataReducer';
import { setCurrentResult } from '../../../../store/resultReducer';
import { ResultBackend } from '../../../../types/Result';
import Graph from './Graph';
import * as SignalR from '@microsoft/signalr';

type Point = {
    x: number;
    y: number;
}

type ChartData = {
    points: Point[]
    startFrequency: number;
    stopFrequency: number;
    pointsOnScreen: number;
    qFactorResult: ResultBackend;
}

const initialChartData = {
    points: [],
    startFrequency: 0,
    stopFrequency: 0,
    pointsOnScreen: 0,
    qFactorResult: {
        Q_factor: 0,
        CenterFrequency: 0,
        Bandwidth: 0,
        PeakTransmittance: 0,
        CenterFrequencyDifference: 0,
    }
}

const GraphSection: React.FC = () => {
    const [hubConnection, setHubConnection] = useState<SignalR.HubConnection>();
    const [chartData, setChartData] = useState<ChartData>(initialChartData);
    const dispatch = useDispatch();

    const setHubConnectionIdApiCall = (connectionId: string|null) => {
        if(connectionId !== null)
        {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'connectionId': connectionId })
            };

            fetch('https://localhost:44353/api/Home/SetChartHubConnection', requestOptions)
                .then(response => response.json())
                .catch((error) => {
                    console.error('Error:', error);
                  });
        }
       
    }

    useEffect(() => {
        const connection = new SignalR.HubConnectionBuilder()
            .withUrl("https://localhost:44353/chart")
            .configureLogging(SignalR.LogLevel.Information)
            .build();

        setHubConnection(connection);    
    },[])

    useEffect(() => {
        if(hubConnection) {
             hubConnection.start()
                          .then(() => console.log('Connection started!'))
                          .then(() => dispatch(setHubConnectionId(hubConnection.connectionId)))
                          .then(() => setHubConnectionIdApiCall(hubConnection.connectionId))
                          .catch(err => console.log('Error while establishing connection :('));
            
            hubConnection.on('sendChart',(chartData: ChartData) => {
                if(chartData && chartData.points) {
                //    console.log(`X: ${chartData.points[0].x} Y: ${chartData.points[0].y}`) 
                //    console.log(`X: ${chartData.points[1].x} Y: ${chartData.points[1].y}`) 
                //    console.log(`X: ${chartData.points[2].x} Y: ${chartData.points[2].y}`) 
                //    console.log(`X: ${chartData.points[3].x} Y: ${chartData.points[3].y}`) 
                    setChartData(chartData);
                }
                
            });
        }
       
    },[hubConnection,dispatch]);

    useEffect(()=> {
        const setChartDataReduxState = () => {
            const data = {
                startFrequency: chartData.startFrequency,
                stopFrequency: chartData.stopFrequency,
                pointsOnScreen: chartData.pointsOnScreen,
            }
            dispatch(setChartDataAction(data));
            dispatch(setCurrentResult(chartData.qFactorResult))
        }

        setChartDataReduxState();
    },[chartData.qFactorResult, chartData.startFrequency, chartData.stopFrequency, chartData.pointsOnScreen, dispatch])

    return (
    <div>
        <Graph chartData={chartData}/>
    </div>)
}

export default GraphSection;