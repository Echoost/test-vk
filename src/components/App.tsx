import { Box, Typography } from '@mui/material';
import { RepositoriesList } from './repositories-list/RepositoriesList';
import HamburgerMenu from './hamburger-menu/HamburgerMenu';

export const App = () => {
    return (
        <>
            <Box
                display={'flex'}
                alignItems={'center'}
                flexDirection={'column'}
                paddingTop={'20px'}
            >
                <Typography component={'h1'}>
                    Список репозиторий на GitHub
                </Typography>
                <RepositoriesList />
            </Box>
            <HamburgerMenu />
        </>
    );
};
