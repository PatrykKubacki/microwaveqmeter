import React from 'react';
import { SavedResult } from '../../types/SavedResult';
import { LabelData } from '../Controls';
import classnames from 'classnames';
import styles from './SavedResultsContent.module.css';

type Props = {
    item: SavedResult;
    isOpen: boolean;
}

const SavedResultsContent: React.FC<Props> = ({item, isOpen}) => {
    return (
        <div className={classnames(styles.content, {
            [styles.isOpen]: isOpen
        })}>
         <ul>
            <li>
                <LabelData label="f0" value={item.f0}/>
            </li>
            <li>
                <LabelData label="Q" value={item.q}/>
            </li>
            <li>
                <LabelData label="3dB BW" value={item.bw}/>
            </li>
            <li>
                <LabelData label="Peak" value={item.peak}/>
            </li>
            <li>
                <LabelData label="Points" value={item.points}/>
            </li>
        </ul> 
        </div>
    )
}

export default SavedResultsContent;