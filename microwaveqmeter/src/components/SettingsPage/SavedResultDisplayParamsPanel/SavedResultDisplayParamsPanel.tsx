import React from 'react';
import { useSelector } from 'react-redux';
import { selectSavedResultDisplay } from '../../../store/settingsReducer';
import SettingsPanel from '../SettingsPanel/SettingsPanel';
import { SavedResultDisplay } from '../../../types/Settings';
import styles from './SavedResultDisplayParamsPanel.module.css';
import {
    TableContainer,
    Table, 
    TableBody,
    TableRow,
    TableCell,
    TableHead,
    Paper } from '@material-ui/core';

const SavedResultDisplayParamsPanel: React.FC = () => {
    const displaySettings: SavedResultDisplay = useSelector(selectSavedResultDisplay);

    const generateRows = () => {
        const settingsKeys = Object.keys(displaySettings);

        return settingsKeys.map((key, index) => {
            return (
                <TableRow>
                    <TableCell component="th" scope="row">
                            {key.replace('display','')} 
                    </TableCell>
                    <TableCell >{key[index] ? 'yes': 'no'}</TableCell>
                </TableRow>
            )
        })
    } 

    return (
        <SettingsPanel title={'Diplay settings'} onChange={()=> null}>
          <div className={styles.tablex}>
             <TableContainer component={Paper} elevation={3}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Parameter</TableCell>
                                <TableCell>Display</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {generateRows()}
                        </TableBody>
                    </Table>
                 </TableContainer>
            </div>
        </SettingsPanel>
    )
}

export default SavedResultDisplayParamsPanel;