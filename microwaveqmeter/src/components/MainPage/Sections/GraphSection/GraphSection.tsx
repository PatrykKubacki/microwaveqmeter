import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setChartData as setChartDataAction } from '../../../../store/chartDataReducer';
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
}

const initialChartData = {
    points: [],
    startFrequency: 0,
    stopFrequency: 0,
    pointsOnScreen: 0,
}

const GraphSection: React.FC = () => {
    const [hubConnection, setHubConnection] = useState<SignalR.HubConnection>();
    const [chartData, setChartData] = useState<ChartData>(initialChartData);
    const dispatch = useDispatch();

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
       
    },[hubConnection]);

    useEffect(()=> {
        const setChartDataReduxState = () => {
            const data = {
                startFrequency: chartData.startFrequency,
                stopFrequency: chartData.stopFrequency,
                pointsOnScreen: chartData.pointsOnScreen,
            }
            dispatch(setChartDataAction(data));
        }

        setChartDataReduxState();
    },[chartData.startFrequency, chartData.stopFrequency, chartData.pointsOnScreen, dispatch])

    return (
    <div>
        <Graph chartData={chartData}/>
    </div>)
}

export default GraphSection;