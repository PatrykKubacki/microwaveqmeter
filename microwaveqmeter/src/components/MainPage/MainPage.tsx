import React from 'react';
import { 
    ActionsSection, 
    ResultSection, 
    EmptyResonatorSection,
    SavedResultsSections, 
} from './Sections';

const MainPage: React.FC = () => {
    return (
        <>
            <br/>
            <ActionsSection />
            <ResultSection />
            <EmptyResonatorSection />
            <SavedResultsSections />
        </>
    )
}

export default MainPage;