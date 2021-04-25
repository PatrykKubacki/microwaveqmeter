import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { createRequestObject, apiCall } from '../../../../apiCall/apiCall';
import { selectViewportMinimum, selectDisplayFitErrorCurve } from '../../../../store/chartDataReducer';
import CanvasJSReact from '../../../../assets/canvasjs.react';
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
    // rangeChanged: handleRangeChange,
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
    },
    data: initialData
}

const GraphSection = ({ chartData }) => {
    const [options, setOptions] = useState(initialOptions);
    // const connectionId = useSelector(selectHubConnectionId);
    const viewportMinimum = useSelector(selectViewportMinimum);
    const displayFitErrorCurve = useSelector(selectDisplayFitErrorCurve);

    // const handleRangeChange = (e) => {
    //     if(e.axisX[0].viewportMinimum !== null && e.axisX[0].viewportMaximum)
    //     {
        // const request = createRequestObject(
        //     'POST',
        //     'https://localhost:44353/api/Home/SetStartStopRangeFrequency',
        //     JSON.stringify({ 
        //                     'connectionId': connectionId,
        //                     'start': e.axisX[0].viewportMinimum.toString().replace('.',','),
        //                     'stop': e.axisX[0].viewportMaximum.toString().replace('.',',') }));
        // return apiCall(request); 
    //  useEffect(() => {
    //     let newOptions = {...options};
    //     newOptions.rangeChanged = handleRangeChange;
    //     setOptions(newOptions);
    //  },[connectionId,options])

    useEffect(() => {
        let newOptions = {...initialOptions};
        let data = [];
        let dataSeries = { type: 'line', dataPoints:[...chartData.points]}
        data.push(dataSeries);

        for (const lorenzeCurve of chartData.lorenzeCurves) {
            const dataLorenzeCurve = { type: 'line', dataPoints:[...lorenzeCurve], color: "red",}
            data.push(dataLorenzeCurve);
        }

        if(displayFitErrorCurve){
            for (const fitCurve of chartData.fitCurves) {
                const dataFitCurve = { type: 'line', dataPoints:[...fitCurve], color: "green",  axisYType: "secondary"}
                data.push(dataFitCurve);
            }   
        }

        newOptions.data = data;

        if(viewportMinimum !== 0){
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