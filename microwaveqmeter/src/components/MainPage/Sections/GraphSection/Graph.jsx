import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRequestObject, apiCall } from '../../../../apiCall/apiCall';
import { selectViewportMinimum, selectDisplayFitErrorCurve } from '../../../../store/chartDataReducer';
import { setStartStopRange } from '../../../../store/graphActionsReducer';
import CanvasJSReact from '../../../../assets/canvasjs.react';
import configData from "../../../../configuration/config.json";
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

const initialData = [{
      type: 'line', 
      dataPoints: [ {x:0, y:0}]
    }, {
        type: 'line', 
        dataPoints: [ {x:0, y:0}]
      }
] 

const initialOptions = {
    zoomEnabled: true,
    animationEnabled: true,
    interactivityEnabled: true,
    title: {
        text: "Measured |S21|"
    },
    axisX:{
        title: "Frequency [MHz]",
        gridDashType: "dot",
        gridThickness: 2
       },
    axisY: {
        includeZero: true,
        title: "|S21| [dB]",
        gridDashType: "dot",
        gridThickness: 2
    },
    axisY2: {
        title: "",  
        minimum: configData.settings.fitErrorCurve.axisY.start,
        maximum: configData.settings.fitErrorCurve.axisY.stop
    },
    data: initialData
}

const GraphSection = ({ chartData }) => {
    const [options, setOptions] = useState(initialOptions);
    const viewportMinimum = useSelector(selectViewportMinimum);
    const displayFitErrorCurve = useSelector(selectDisplayFitErrorCurve);
    const dispatch = useDispatch();

    const handleRangeChange = (e) => {
        let start = e.axisX[0].viewportMinimum;
        let stop = e.axisX[0].viewportMaximum;
        if(start !== null && stop !== null) {
            start = start.toFixed(2);   
            stop = stop.toFixed(2);  
            const request = createRequestObject('POST',
                'https://localhost:44353/api/Home/SetStartStopRangeFrequency',
                JSON.stringify({ 
                    'start': start.toString().replace('.',','),
                    'stop': stop.toString().replace('.',',') }));
            apiCall(request); 
            dispatch(setStartStopRange({start: start, stop: stop}));         
        }
    }

    useEffect(() => {
        let newOptions = {...initialOptions};
        let data = [];
        let dataSeries = { type: 'line', dataPoints:[...chartData.points]}
        data.push(dataSeries);

        if(chartData.lorenzeCurves) {
            for (const lorenzeCurve of chartData.lorenzeCurves) {
                const dataLorenzeCurve = { type: 'line', dataPoints:[...lorenzeCurve], color: "red",}
                data.push(dataLorenzeCurve);
            }
        }

        if(displayFitErrorCurve && chartData.fitCurves !== undefined && chartData.fitCurves.length > 0){
            for (const fitCurve of chartData.fitCurves) {
                const dataFitCurve = { type: 'line', dataPoints:[...fitCurve.points], color: "green",  axisYType: "secondary"}
                data.push(dataFitCurve);
            }   
        }

        newOptions.data = data;
        newOptions.rangeChanged = handleRangeChange;

        if(viewportMinimum !== 0) {
            newOptions.axisY.viewportMinimum = viewportMinimum;
        }

        setOptions(newOptions);

    },[chartData, viewportMinimum, displayFitErrorCurve]);

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