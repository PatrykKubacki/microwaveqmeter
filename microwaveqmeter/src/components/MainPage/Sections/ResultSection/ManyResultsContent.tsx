import React from 'react';
import { ResultBackend } from '../../../../types/Result';
import { useSelector } from 'react-redux'
import { selectIndexOfCurrentResult, setIndexOfCurrentResult } from '../../../../store/resultReducer';
import { selectEmptyResonatorCenterFrequency } from '../../../../store/resonatorReducer';
import { selectIsFitErrors } from '../../../../store/chartDataReducer';
import { useDispatch } from 'react-redux';
import styles from './ManyResultsContent.module.css';
import {
   TableContainer,
   Table, 
   TableBody,
   TableRow,
   TableCell,
   TableHead,
   Radio,
   Paper } from '@material-ui/core';
import classnames from 'classnames';

type ManyModeProps = {
    results: ResultBackend[];
}

const ManyResultsContent: React.FC<ManyModeProps> = ({ results }) => {
    const dispatch = useDispatch();
    const activeRadio: number = useSelector(selectIndexOfCurrentResult);
    const emptyResonatorCenterFrequency = useSelector(selectEmptyResonatorCenterFrequency); 
    const isFitErrors: boolean[] = useSelector(selectIsFitErrors);

    const getCenterFrequencyDifference = (centerFrequency: number) => {
        const emptResonatorCenterFrequency = isNaN(emptyResonatorCenterFrequency) ? 0 : emptyResonatorCenterFrequency; 
        let centerFrequencyDiff = centerFrequency - emptResonatorCenterFrequency;
        centerFrequencyDiff = Math.round((centerFrequencyDiff) * 1000) / 1000;
        return isNaN(centerFrequencyDiff) ? 0 : centerFrequencyDiff.toString();
    }

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
                const isFitError = index <= isFitErrors.length ? isFitErrors[index] : false; 
                return (
                    <TableRow key={index}>
                        <TableCell >
                            <Radio key={index} checked={index === activeRadio} value={index} onChange={()=> dispatch(setIndexOfCurrentResult(index))}/>
                         </TableCell>
                         <TableCell component="th" scope="row">
                            <ColloredSpanIfIsFitError isFitError={isFitError}>
                                {result.Q_factor}
                            </ColloredSpanIfIsFitError>
                         </TableCell>
                         <TableCell>
                            <ColloredSpanIfIsFitError isFitError={isFitError}>
                                {getCenterFrequencyDifference(result.CenterFrequency)}
                            </ColloredSpanIfIsFitError>    
                         </TableCell>
                    </TableRow>
                )
            })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

type ColloredSpanIfIsFitErrorProps = {
    isFitError: boolean;
}
const ColloredSpanIfIsFitError: React.FC<ColloredSpanIfIsFitErrorProps> = ({isFitError, children}) => {
    return (
        <span className={classnames({
            [styles.redColor]: isFitError
            })}>
            {children}
        </span>
    ) 
}

export default ManyResultsContent;