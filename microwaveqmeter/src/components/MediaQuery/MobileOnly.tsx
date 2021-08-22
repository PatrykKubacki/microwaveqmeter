import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const MobileOnly: React.FC = ({children}) => {
    const isTabletOrMobile = useMediaQuery('(max-width: 1024px)');

    return (
        <>
           {isTabletOrMobile && children}
        </>
    )
}

export default MobileOnly;