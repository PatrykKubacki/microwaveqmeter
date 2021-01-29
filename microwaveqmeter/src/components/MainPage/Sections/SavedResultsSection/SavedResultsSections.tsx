import React from 'react';
import Section from '../Section/Section';
import { SavedResult } from '../../../../types/SavedResult';
import SavedResults from '../../../SavedResults/SavedResults';
import { useSelector } from 'react-redux'
import { selectCurrentResults } from '../../../../store/resultReducer';

type Props = {
   savedResults: SavedResult[]
}

const savedResultsFilesNames = ['06.01.2021.json', '05.01.2021.json'];

const SavedResultsSections: React.FC<Props> = ({savedResults}) => {
    const currentSavedResults:SavedResult[] = useSelector(selectCurrentResults);
    console.log(currentSavedResults);
    return (
        <Section title={'Saved results'}>
            <SavedResults items={currentSavedResults} savedResulsFilesNames={savedResultsFilesNames}/>
        </Section>
    )
}

export default SavedResultsSections;