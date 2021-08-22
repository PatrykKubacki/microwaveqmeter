import React, { useState, useEffect } from 'react';
import SettingsPanel from '../SettingsPanel/SettingsPanel';
import { ReadSettings } from './ReadSettings';
import { EditSettings } from './EditSettings';
import { useDispatch, useSelector }  from 'react-redux';
import { selectMainSettings, setMainSettings } from '../../../store/settingsReducer';
import { Algorithm, DefaultResonatorType, MainSettings as MainSettingsType, MeasType, SerialPort } from '../../../types/MainSettings';

const MainSettings: React.FC = () => {
    const settings: MainSettingsType = useSelector(selectMainSettings);
    const dispatch = useDispatch();

    const [defaultResonatorType, setDefaultResonatorType] = useState<DefaultResonatorType>(DefaultResonatorType.singlePost);
    const [measType, setMeasType] = useState<MeasType>(MeasType.s21);
    const [algorithm, setAlgorithm] = useState<Algorithm>(Algorithm.db3Bandwidth);
    const [automaticMeasurement, setAutomaticMeasurement] = useState(false);
    const [unloadedQCorrection, setUnloadedQCorrection] = useState(false);
    const [oversampling, setOversampling] = useState('');
    const [averaging, setAveraging] = useState('');
    const [serialPort, setSerialPort] = useState<SerialPort>(SerialPort.auto);

    useEffect(()=> {
        setDefaultResonatorType(settings.defaultResonatorType);
        setMeasType(settings.calculation.measType);
        setAlgorithm(settings.calculation.algorithmSettings.algorithm);
        setAutomaticMeasurement(settings.automaticMeasurement);
        setUnloadedQCorrection(settings.calculation.algorithmSettings.unloadedQCorrection);
        setOversampling(settings.calculation.noiseReduction.oversampling.toString());
        setAveraging(settings.calculation.noiseReduction.averaging.toString());
        setSerialPort(settings.connection.serialPort);
    },[settings])

    const handleSaveSettings = () => {
        const mainSettings: MainSettingsType  = {
            defaultResonatorType: defaultResonatorType,
            automaticMeasurement: automaticMeasurement,
            connection: {
                serialPort: serialPort,
            },
            calculation: {
                measType: measType,
                noiseReduction: {
                    averaging: averaging,
                    oversampling: oversampling,
                },
                algorithmSettings: {
                    unloadedQCorrection: unloadedQCorrection,
                    algorithm: algorithm,
                }
            }
        }
        dispatch(setMainSettings(mainSettings));
    }

    const editProps = {
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
    }

    return (
        <SettingsPanel 
            title="Main" 
            onChange={handleSaveSettings}
            readSettingsComponent={<ReadSettings settings={settings}/>}
            editSettingsComponent={<EditSettings settings={settings} {...editProps}/>}
        />
    )
}

export { MainSettings };