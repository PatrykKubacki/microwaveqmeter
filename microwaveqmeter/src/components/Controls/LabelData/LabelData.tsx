import React from 'react';
import Label from './Label';
import { Grid } from '@material-ui/core';

type Props = {
    label: string;
    value: string;
    bold?: boolean;
    doubleSize?: boolean;
}

const LabelDataWithGrid: React.FC<Props> = ({label, value, bold, doubleSize}) => {
    return (
        <>
            <Grid item xs={7}>
                <Label bold={bold} doubleSize={doubleSize} value={`${label}: `} />
            </Grid>
            <Grid item xs={5}>
                <Label bold={bold} doubleSize={doubleSize} value={value} />
            </Grid>
         </>
    )
}

const LabelData: React.FC<Props> = ({label, value, bold, doubleSize}) => {
    return (
        <>
            <Label bold={bold} doubleSize={doubleSize} value={`${label}: ${value}`} />
         </>
    )
}

export { LabelData };
export default LabelDataWithGrid;