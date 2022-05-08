import { CssBaseline, PaletteMode, ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import { Home } from './components/';
import { theme } from './theme';

function App() {
	const [darkMode, setDarkMode] = useState<boolean>(
		window.matchMedia('(prefers-color-scheme: dark)').matches
	);

	const toggleTheme = () => setDarkMode(!darkMode);

	return (
		<ThemeProvider theme={theme(darkMode ? 'dark' : 'light')}>
			<CssBaseline />
			<Home toggleTheme={toggleTheme} />
		</ThemeProvider>
	);
}

export default App;
