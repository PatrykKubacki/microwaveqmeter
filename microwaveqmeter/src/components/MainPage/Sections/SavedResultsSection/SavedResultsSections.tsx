import React from 'react';
import Section from '../Section/Section';
import { SavedResult } from '../../../../types/SavedResult';
import SavedResults from '../../../SavedResults/SavedResults';

type Props = {
   savedResults: SavedResult[]
}

const SavedResultsSections: React.FC<Props> = ({savedResults}) => {
    return (
        <Section title={'Saved results'}>
            <SavedResults items={savedResults}/>
        </Section>
    )
}

export default SavedResultsSections;