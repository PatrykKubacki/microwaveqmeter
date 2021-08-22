import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const DesktopOnly: React.FC = ({children}) => {
    const isBigScreen = useMediaQuery('(min-width: 1025px)');
    return (
        <>
           {isBigScreen && children}
        </>
    )
}

export default DesktopOnly;