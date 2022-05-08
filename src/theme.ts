import { createTheme, PaletteMode } from '@mui/material';

export const theme = (mode: PaletteMode) =>
	createTheme({
		palette: {
			mode,
			...(mode === 'dark'
				? {
						primary: { main: '#70DBFF' },
						info: { main: '#7EB4FA' },
						success: { main: '#7FFA70' },
						error: { main: '#FF4565' },
						warning: { main: '#FACE7D' },
				  }
				: {}),
		},
	});
