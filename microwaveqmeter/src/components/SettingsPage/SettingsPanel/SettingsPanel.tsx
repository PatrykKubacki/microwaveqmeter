import React, { useState } from 'react';
import styles from './SettingsPanel.module.css';
import {
    Grid,
    Button,
} from '@material-ui/core';
import { DesktopOnly, MobileOnly } from '../../MediaQuery';

type Props = {
    title: string;
    onChange: () => void;
    readSettingsComponent: React.ReactNode;
    editSettingsComponent: React.ReactNode;
}

const SettingsPanel: React.FC<Props> = ({title, onChange, readSettingsComponent, editSettingsComponent}) => {
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
            <Grid item xs={10}>
                <div className={styles.content}>
                    {!isEditing ? readSettingsComponent : editSettingsComponent}
                </div>
            </Grid>
            {isEditing && (
                <Grid item xs={12}>
                    <DesktopOnly>
                        <div className={styles.saveButton}><Button  variant="contained" color="primary" onClick={handleOnSaveClick}>Save</Button></div>
                        <Button variant="contained" color="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
                    </DesktopOnly>  
                    <MobileOnly>
                        <Grid container>
                            <Grid item xs={12}>
                                <div className={styles.mobileButtonMargin}><Button className={styles.mobileButton} variant="contained" color="primary" onClick={handleOnSaveClick}>Save</Button></div>
                            </Grid>
                            <Grid item xs={12}>
                            <div className={styles.mobileButtonMargin}><Button className={styles.mobileButton} variant="contained" color="secondary" onClick={() => setIsEditing(false)}>Cancel</Button></div>
                            </Grid>
                        </Grid>
                    </MobileOnly>                  
                </Grid> 
            )}
        </Grid>
    )
}

export default SettingsPanel;