import MenuIcon from '@mui/icons-material/Menu';
import { Box, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import classes from './HamburgerMenu.module.scss';
import { RangeSlider } from '@/components/ui/RangeSlider/RangeSlider';
function HamburgerMenu() {
    const [isActive, setIsActive] = useState(false);

    const handleSetActive = () => {
        setIsActive(prevState => !prevState);
    };
    return (
        <>
            <IconButton
                aria-label="Menu"
                className={classes.hamburger_icon}
                onClick={handleSetActive}
            >
                <MenuIcon color="primary" />
            </IconButton>
            <Box
                className={`${classes.hamburger_menu} ${isActive ? classes.active : ''}`}
            >
                <Typography>Фильтры</Typography>
                <Typography marginTop={'20px'}>Фильтр по годам</Typography>
                <RangeSlider />
            </Box>
        </>
    );
}

export default HamburgerMenu;
