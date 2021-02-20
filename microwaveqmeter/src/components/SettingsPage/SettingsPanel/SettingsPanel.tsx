import React, { useState } from 'react';
import styles from './SettingsPanel.module.css';
import {
    Grid,
    Button,
} from '@material-ui/core';

type Props = {
    title: string;
    onChange: () => void;
}

const SettingsPanel: React.FC<Props> = ({title, onChange, children}) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleOnSaveClick = () => {
        onChange();
        setIsEditing(false);
    }

    return (
        <Grid container>
            <Grid item xs={10}>
                <div className={styles.title}><b>{title}</b></div>
            </Grid>
            <Grid item xs={2}>
                 {!isEditing && <Button variant="contained" size="large" onClick={() => setIsEditing(!isEditing)}>Edit</Button> }
            </Grid>
            <Grid item xs={11}>
                <hr/>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={4}>
                <div className={styles.content}>{children}</div>
            </Grid>
            <Grid item xs={12}>
                {isEditing && (
                    <div>
                        <Button variant="contained" color="primary" onClick={handleOnSaveClick}>Save</Button>
                        <Button variant="contained" color="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
                    </div>                    
                )}
            </Grid>
        </Grid>
    )
}

export default SettingsPanel;