import { ThemeProvider, PaletteMode } from '@mui/material';
import { cleanup, render, RenderOptions } from '@testing-library/react';
import { FC } from 'react';
import { afterEach } from 'vitest';
import { theme } from '@src/theme';

afterEach(() => {
	cleanup();
});

const Wrapper: FC<{ children: React.ReactNode; mode: PaletteMode }> = ({
	children,
	mode = 'dark',
}) => {
	return (
		<ThemeProvider theme={theme(mode ? 'dark' : 'light')}>
			{children}
		</ThemeProvider>
	);
};

const customRender = (
	ui: React.ReactElement,
	options: RenderOptions = {},
	mode: PaletteMode = 'dark'
) =>
	render(ui, {
		wrapper: ({ children }) => <Wrapper mode={mode}>{children}</Wrapper>,
		...options,
	});

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
// override render export
export { customRender as render };
