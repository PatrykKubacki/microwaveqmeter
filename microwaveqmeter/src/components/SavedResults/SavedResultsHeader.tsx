import React from 'react';
import { useSelector } from 'react-redux';
import { SavedResult } from '../../types/SavedResult';
import { selectSavedResultDisplay } from '../../store/settingsReducer';
import styles from './SavedResultsHeader.module.css';

const shouldDisplayCellLabel = (dispalConfig: boolean, label: string) => {
    return dispalConfig && label !== '';
}

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
          {shouldDisplayCellLabel(displaySampleName, item.sampleName) && <CellLabel>{`Sample: ${item.sampleName}`}</CellLabel>}
          {shouldDisplayCellLabel(displayH, item.h) && <CellLabel>{`h [mm]: ${item.h}`}</CellLabel>}
          {shouldDisplayCellLabel(displayPermittivity, item.permittivity) && <CellLabel>{`Permittivity: ${item.permittivity}`}</CellLabel>}
          {shouldDisplayCellLabel(displayDielLossTangent, item.dielLossTangent) && <CellLabel>{`Diel.loss tangent: ${item.dielLossTangent}`}</CellLabel>}
          {shouldDisplayCellLabel(displayResistivity, item.resistivity) && <CellLabel>{`Resistivity: ${item.resistivity}`}</CellLabel>}
          {shouldDisplayCellLabel(displaySheetResistance,item.sheetResistance) && <CellLabel>{`Sheet resistance: ${item.sheetResistance}`}</CellLabel>}
        </>
    ) 
}

const CellLabel: React.FC = ({children}) => {
    return (
        <label className={styles.savedResultsHeaderCell}>{children}</label>
    )
}

export default SavedResultsHeader;