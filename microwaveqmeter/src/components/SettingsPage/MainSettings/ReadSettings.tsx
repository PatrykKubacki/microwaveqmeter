import React from 'react';
import { Grid, Checkbox, FormControlLabel } from '@material-ui/core';
import { LabelData } from '../../Controls';
import styles from './ReadSettings.module.css';
import { MainSettings } from '../../../types/MainSettings';
import useMediaQuery from '@material-ui/core/useMediaQuery';

type Props = {
    settings: MainSettings;
}

const ReadSettings: React.FC<Props> = ({ settings }) => {
    const isTabletOrMobile = useMediaQuery('(max-width: 1024px)');
    return (
        <Grid container>
            <Grid item xs={isTabletOrMobile ? 12: 4} xl={4}>
                <LabelData  label='Default resonator type' value={settings.defaultResonatorType}/>
                <FormControlLabel
                    disabled
                    label="Automatic measurement"
                    control={<Checkbox checked={settings.automaticMeasurement} name="automaticMeasurement" /> }
                />
            </Grid>
            <Grid item xs={6}>
                <h2 className={styles.header}>Connection</h2>
                <LabelData  label='Serial port' value={settings.connection.serialPort}/>
            </Grid>
            <Grid item xs={12} xl={12}>
                <h2 >Calculation settings</h2>
            </Grid>
            <Grid item xs={isTabletOrMobile ? 12: 4} xl={4}>
                <LabelData  label='Meas type' value={settings.calculation.measType}/>
                <LabelData  label='Algorithm' value={settings.calculation.algorithmSettings.algorithm}/>
                <FormControlLabel
                    disabled 
                    label="Unloaded Q correction"
                    control={<Checkbox checked={settings.calculation.algorithmSettings.unloadedQCorrection} name="checkedI" /> }
                />
            </Grid>
            <Grid item xs={6}>
                <h2 className={styles.header}>Noise reduction</h2>
                <LabelData  label='Oversampling' value={settings.calculation.noiseReduction.oversampling.toString()}/>
                <LabelData  label='Averaging' value={settings.calculation.noiseReduction.averaging.toString()}/>
            </Grid>
        </Grid>
    )
}

export { ReadSettings };