import React from 'react';
import { MainSettings } from './MainSettings/MainSettings';
import { ConverterSettings } from './ConverterSettings/ConverterSettings';

const SettingsPage: React.FC = () => {
    return (
        <>
            <h1>Settings</h1>
            <MainSettings />
            <br/>
            <ConverterSettings />
        </>
    )
}

export default SettingsPage;