import React, { useState, useEffect } from 'react';
import CanvasJSReact from '../../../../assets/canvasjs.react';
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

const initialData = [
    { type: 'line', 
      dataPoints: [ {x:0, y:0}]
    }
] 

const initialOptions = {
    zoomEnabled: true,
    animationEnabled: true,
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