import React from 'react';
import GraphActions from '../../MainPage/Sections/GraphSection/GraphActions';
import GraphSwipeInputs from '../../MainPage/Sections/GraphSection/GraphSwipeInputs';
import { Grid } from '@material-ui/core';

const ActionPanelMobile: React.FC = () => {
    return (
        <Grid container
            direction="row"
            alignItems="flex-end">
                <Grid item xs={6}>
                    <GraphActions />
                </Grid>
                <Grid item xs={6}>
                    <GraphSwipeInputs />
                </Grid>
        </Grid>
    )
}

export default ActionPanelMobile;