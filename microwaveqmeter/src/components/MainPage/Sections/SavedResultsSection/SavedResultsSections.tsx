import React from 'react';
import { SavedResult } from '../../../../types/SavedResult';
import SavedResults from '../../../SavedResults/SavedResults';
import { useSelector } from 'react-redux'
import { selectCurrentResults } from '../../../../store/resultReducer';
import { Card, CardContent, Typography } from '@material-ui/core';

type Props = {
   savedResults: SavedResult[]
}

const savedResultsFilesNames = ['06.01.2021.json', '05.01.2021.json'];

const SavedResultsSections: React.FC<Props> = ({savedResults}) => {
    const currentSavedResults:SavedResult[] = useSelector(selectCurrentResults);
    console.log(currentSavedResults);
    return (
        <Card title={'Saved results'}>
            <CardContent>
                <Typography variant="h6">{'Saved results'}</Typography><br/>
                <SavedResults items={currentSavedResults} 
                              savedResulsFilesNames={savedResultsFilesNames}/>
            </CardContent>
        </Card>
    )
}

export default SavedResultsSections;