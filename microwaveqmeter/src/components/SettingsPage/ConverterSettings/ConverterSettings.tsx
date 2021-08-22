import React from 'react';
import SettingsPanel from '../SettingsPanel/SettingsPanel';
import { ReadSettings } from './ReadSettings';

const ConverterSettings: React.FC = () => {
    return (
        <SettingsPanel 
            title="Converter" 
            onChange={()=>null}
            readSettingsComponent={<ReadSettings />}
            editSettingsComponent={<div>edit</div>}/>
    )   
}

export { ConverterSettings }