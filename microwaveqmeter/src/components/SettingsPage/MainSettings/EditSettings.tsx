import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import styles from './ReadSettings.module.css';
import { 
    Grid,
    Checkbox,
    FormControlLabel,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    TextField,
    MenuItem
 } from '@material-ui/core';
import {
    MainSettings,
    DefaultResonatorType,
    Algorithm,
    MeasType,
    SerialPort
} from '../../../types/MainSettings';
import { MobileOnly } from '../../MediaQuery';


type Props = {
    settings: MainSettings,
    defaultResonatorType: string,
    measType: string,
    algorithm: string,
    automaticMeasurement: boolean,
    unloadedQCorrection: boolean,
    oversampling: string,
    averaging: string,
    serialPort: string,
    setDefaultResonatorType: (value: DefaultResonatorType) =>void,
    setMeasType: (value: MeasType) =>void,
    setAlgorithm: (value: Algorithm) =>void,
    setAutomaticMeasurement: (value: boolean) =>void,
    setUnloadedQCorrection: (value: boolean) =>void,
    setOversampling: (value: string) =>void,
    setAveraging: (value: string) =>void,
    setSerialPort: (value: SerialPort) =>void,
}

const EditSettings: React.FC<Props> = ({
    settings,
    defaultResonatorType,
    measType,
    algorithm,
    automaticMeasurement,
    unloadedQCorrection,
    oversampling,
    averaging,
    serialPort,
    setDefaultResonatorType,
    setMeasType,
    setAlgorithm,
    setAutomaticMeasurement,
    setUnloadedQCorrection,
    setOversampling,
    setAveraging,
    setSerialPort
}) => {
    const isTabletOrMobile = useMediaQuery('(max-width: 1024px)');
    const allSerialPort = [SerialPort.com1, SerialPort.auto];

    return (
        <Grid container>
        <Grid item xs={isTabletOrMobile ? 12: 4} xl={4}>
            <FormControl component="fieldset">
                <FormLabel component="legend">Default resonator type</FormLabel>
                    <RadioGroup name="DefaultResonatorType" value={defaultResonatorType} onChange={(event) => setDefaultResonatorType(event.target.value as DefaultResonatorType)}>
                        <FormControlLabel value={DefaultResonatorType.singlePost} control={<Radio />} label={DefaultResonatorType.singlePost} />
                        <FormControlLabel value={DefaultResonatorType.splitPost} control={<Radio />} label={DefaultResonatorType.splitPost} />
                    </RadioGroup>
            </FormControl>
            <br/>
            <FormControlLabel
                label="Automatic measurement"
                control={<Checkbox checked={automaticMeasurement} name="automaticMeasurement" onChange={(event) => setAutomaticMeasurement(event.target.checked)}/> }
            />
        </Grid>
        <Grid item xs={6}>
            <h2 className={styles.header}>Connection</h2>
            <TextField
                select
                className={styles.serialPortSelect}
                label="Serial port"
                value={serialPort}
                onChange={(event)=>setSerialPort(event.target.value as SerialPort)}
            >
          {allSerialPort.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        </Grid>
        <Grid item xs={12} xl={12}>
            <h2 >Calculation settings</h2>
        </Grid>
        <Grid item xs={isTabletOrMobile ? 12: 4} xl={4}>
            <FormControl component="fieldset">
                <FormLabel component="legend">Meas type</FormLabel>
                    <RadioGroup name="Meas type" value={measType} onChange={(event) => setMeasType(event.target.value as MeasType)}>
                        <FormControlLabel value={MeasType.s21} control={<Radio />} label={MeasType.s21} />
                        <FormControlLabel value={MeasType.power} control={<Radio />} label={MeasType.power} />
                    </RadioGroup>
            </FormControl>
            <MobileOnly> <br/></MobileOnly>
            <FormControl component="fieldset">
                <FormLabel component="legend">Algorithm</FormLabel>
                    <RadioGroup name="Algorithm" value={algorithm} onChange={(event) => setAlgorithm(event.target.value as Algorithm)}>
                        <FormControlLabel value={Algorithm.db3Bandwidth} control={<Radio />} label={Algorithm.db3Bandwidth} />
                        <FormControlLabel value={Algorithm.leastSquaresFit} control={<Radio />} label={Algorithm.leastSquaresFit} />
                    </RadioGroup>
            </FormControl>
            <br/>
            <FormControlLabel
                label="Unloaded Q correction"
                control={<Checkbox checked={unloadedQCorrection} name="unloadedQCorrection"  onChange={(event) => setUnloadedQCorrection(event.target.checked)}/> }
            />
        </Grid>
        <Grid item xs={6}>
            <h2 className={styles.header}>Noise reduction</h2>
            <div className={styles.noiseReductionInputs}><TextField type="number" id="outlined-basic" size="small" label="Oversampling" variant="outlined" value={oversampling} onChange={(event)=> setOversampling(event.target.value)}/></div>
            <div className={styles.noiseReductionInputs}><TextField type="number" id="outlined-basic" size="small" label="Averaging" variant="outlined" value={averaging} onChange={(event)=> setAveraging(event.target.value)}/></div>
        </Grid>
    </Grid>
    )
}

export { EditSettings }