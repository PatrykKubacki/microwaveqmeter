import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectHubConnectionId } from '../../../../store/chartDataReducer';
import CanvasJSReact from '../../../../assets/canvasjs.react';
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

const initialData = [
    { type: 'line', 
      dataPoints: [ {x:0, y:0}]
    }
] 

const initialOptions = {
    // rangeChanged: handleRangeChange,
    zoomEnabled: false,
    animationEnabled: true,
    interactivityEnabled: true,
    title: {
        text: "Measured"
    },
    axisY: {
        includeZero: false
    },
    data: initialData
}

const GraphSection = ({ chartData }) => {
    const [options, setOptions] = useState(initialOptions);
    const connectionId = useSelector(selectHubConnectionId);

    const handleRangeChange = (e) => {
        if(e.axisX[0].viewportMinimum !== null && e.axisX[0].viewportMaximum)
        {
            const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'connectionId': connectionId,
                'start': e.axisX[0].viewportMinimum.toString().replace('.',','),
                'stop': e.axisX[0].viewportMaximum.toString().replace('.',',') })
            };
        fetch('https://localhost:44353/api/Home/SetStartStopRangeFrequency', requestOptions)
            .then(response => response.json())
            .catch((error) => {
                console.error('Error:', error);
            });
        }
     }

     useEffect(() => {
        let newOptions = {...options};
        newOptions.rangeChanged = handleRangeChange;
        setOptions(newOptions);
     },[connectionId,options])

    useEffect(() => {
        let newOptions = {...initialOptions};
        let data = [];
        let dataSeries = { type: 'line', dataPoints:[...chartData.points]}
        data.push(dataSeries);
        newOptions.data = data

        setOptions(newOptions);

    },[chartData]);

    return (
        <>
        <CanvasJSChart options = {options} 
                       onRef={ref => {
                           if(this !== undefined){
                               this.chart = ref
                           }
                       }
                        }
			/>
        </>
    )
};

export default GraphSection;