import React, { useState } from 'react';
import Section from '../Section/Section';
import { Button } from '../../../Controls';
import { Result } from '../../../../types/Result';
import ResultContent  from './ResultContent';
import ResultPagesButtons from './ResultPagesButtons';

type Props = {
    results: Result[];
}

const ResultSection: React.FC<Props> = ({results}) => {
    const [currentResult, setCurrentResult] = useState<Result>(results[0]);
    const [currentResultIndex, setCurrentResultIndex] = useState(0);

    const handleChangeResult = (index: number) => {
        setCurrentResult(results[index]);
        setCurrentResultIndex(index);
    }

    return (
        <Section title={'Result'}>
            <ResultContent result={currentResult} />
            <ResultPagesButtons 
                currentPage={currentResultIndex} 
                pages={results.length} 
                onClick={handleChangeResult}/><br/><br/>

            <Button text={'Save'} onClick={()=>null}/>
        </Section>
    )
}

export default ResultSection;