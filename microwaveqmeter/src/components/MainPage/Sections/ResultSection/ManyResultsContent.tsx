import React, { useState } from 'react';
import { Result } from '../../../../types/Result';
import {
   TableContainer,
   Table, 
   TableBody,
   TableRow,
   TableCell,
   TableHead,
   Radio,
   Paper } from '@material-ui/core';

type ManyModeProps = {
    results: Result[];
}

const ManyResultsContent: React.FC<ManyModeProps> = ({ results }) => {
    const [activeRadio, setActiveRadio] = useState('radio_0');
    const changeHandle = (value:  string) => {
        setActiveRadio(value);
        };
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Active</TableCell>
                        <TableCell>Q Factor</TableCell>
                        <TableCell>Center frequency difference</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
            {results.map((result,index) => {
                return (
                    <TableRow key={index}>
                        <TableCell >
                            <Radio key={index} checked={`radio_${index}` === activeRadio} value={`radio_${index}`} onChange={()=>changeHandle(`radio_${index}`)}/>
                         </TableCell>
                         <TableCell component="th" scope="row">
                            {result.q}
                         </TableCell>
                         <TableCell>
                            {result.frequencyDifference}
                         </TableCell>
                    </TableRow>
                )
            })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ManyResultsContent;