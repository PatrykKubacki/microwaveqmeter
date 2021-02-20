import React from 'react';
import { useSelector } from 'react-redux';
import { SavedResult } from '../../types/SavedResult';
import { selectSavedResultDisplay } from '../../store/settingsReducer';
import styles from './SavedResultsHeader.module.css';

type Props = {
    item: SavedResult;
}

const SavedResultsHeader: React.FC<Props> = ({item}) => {
    const {
        displaySampleName,
        displayH,
        displayPermittivity,
        displayDielLossTangent,
        displayResistivity,
        displaySheetResistance } = useSelector(selectSavedResultDisplay)
    
    return (
        <>
          {displaySampleName && <CellLabel>{`Sample: ${item.sampleName}`}</CellLabel>}
          {displayH && <CellLabel>{`h [mm]: ${item.h}`}</CellLabel>}
          {displayPermittivity && <CellLabel>{`Permittivity: ${item.permittivity}`}</CellLabel>}
          {displayDielLossTangent && <CellLabel>{`Diel.loss tangent: ${item.dielLossTangent}`}</CellLabel>}
          {displayResistivity && <CellLabel>{`Resistivity: ${item.resistivity}`}</CellLabel>}
          {displaySheetResistance && <CellLabel>{`Sheet resistance: ${item.sheetResistance}`}</CellLabel>}
        </>
    ) 
}

const CellLabel: React.FC = ({children}) => {
    return (
        <label className={styles.savedResultsHeaderCell}>{children}</label>
    )
}

export default SavedResultsHeader;