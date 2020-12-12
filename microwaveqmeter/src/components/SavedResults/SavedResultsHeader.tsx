import React from 'react';
import { SavedResult } from '../../types/SavedResult';
import styles from './SavedResultsHeader.module.css';

type Props = {
    item: SavedResult;
}

const SavedResultsHeader: React.FC<Props> = ({item}) => {
    return (
        <>
          <CellLabel>{`Sample: ${item.sampleName}`}</CellLabel>
          <CellLabel>{`h [mm]: ${item.h}`}</CellLabel>
          <CellLabel>{`Permittivity: ${item.permittivity}`}</CellLabel>
          <CellLabel>{`Diel.loss tangent: ${item.dielLossTangent}`}</CellLabel>
          <CellLabel>{`Resistivity: ${item.resistivity}`}</CellLabel>
          <CellLabel>{`Sheet resistance: ${item.sheetResistance}`}</CellLabel>
        </>
    ) 
}

const CellLabel: React.FC = ({children}) => {
    return (
        <label className={styles.savedResultsHeaderCell}>{children}</label>
    )
}

export default SavedResultsHeader;