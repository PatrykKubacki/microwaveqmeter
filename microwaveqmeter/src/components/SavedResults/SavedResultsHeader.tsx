import React from 'react';
import { SavedResult } from '../../types/SavedResult';
import { Button } from '../Controls';
import styles from './SavedResultsHeader.module.css';

type Props = {
    item: SavedResult;
    isOpen: boolean;
    onClick: () => void;
}

const SavedResultsHeader: React.FC<Props> = ({item, isOpen ,onClick}) => {
    return (
        <>
        <Button onClick={onClick} elipsedBorder>
          <CellLabel>{`Sample: ${item.sampleName}`}</CellLabel>
          <CellLabel>{`h [mm]: ${item.h}`}</CellLabel>
          <CellLabel>{`Permittivity: ${item.permittivity}`}</CellLabel>
          <CellLabel>{`Diel.loss tangent: ${item.dielLossTangent}`}</CellLabel>
          <CellLabel>{`Resistivity: ${item.resistivity}`}</CellLabel>
          <CellLabel>{`Sheet resistance: ${item.sheetResistance}`}</CellLabel>
        </Button>
        </>
    ) 
}

const CellLabel: React.FC = ({children}) => {
    return (
        <label className={styles.savedResultsHeaderCell}>{children}</label>
    )
}

export default SavedResultsHeader;