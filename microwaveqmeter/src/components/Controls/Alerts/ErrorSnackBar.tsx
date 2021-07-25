import React from "react";
import Snackbar from '@material-ui/core/Snackbar';
import styles from './ErrorSnackBar.module.css';

type Props = {
    message: string;
    isOpen: boolean;
    onClose: () => void;
}

const ErrorSnackBar: React.FC<Props> = ({ message, isOpen, onClose}) => {
    return (
        <Snackbar
            className={styles.snak}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            message={message} 
            open={isOpen} 
            autoHideDuration={3000} 
            onClose={onClose}/>
    )
}

export { ErrorSnackBar }