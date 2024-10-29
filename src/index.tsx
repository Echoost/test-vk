import { createRoot } from 'react-dom/client';
import { App } from '@/components/App';
import { createTheme, ThemeProvider } from '@mui/material';
import '@/index.css';
const root = document.getElementById('root');

if (!root) {
    throw new Error('root not found');
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#fff',
        },
    },
});

const container = createRoot(root);
container.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>,
);
