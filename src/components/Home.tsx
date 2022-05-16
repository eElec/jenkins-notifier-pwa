import React from 'react';
import {
	AppBar,
	Button,
	Container,
	IconButton,
	Toolbar,
	Typography,
	useTheme,
} from '@mui/material';
import DetailsTable from './DetailsTable';
import AddDialog from './AddDialog';
import Settings from './Settings';
import ServerDialog from './ServerDialog';
import { css } from '@emotion/react';
import {
	Brightness4,
	Brightness7,
	Settings as SettingsIcon,
} from '@mui/icons-material';

interface HomeProps {
	toggleTheme: () => void;
}

function Home(props: HomeProps) {
	const { toggleTheme } = props;
	const [addOpen, setAddOpen] = React.useState(false);
	const [settingsOpen, setSettingsOpen] = React.useState(false);
	const [serverOpen, setServerOpen] = React.useState(false);

	const theme = useTheme();

	const handleAddDialogState = (val: boolean) => setAddOpen(val);
	const handleSettingsDialogState = (val: boolean) => setSettingsOpen(val);
	const handleServerDialogState = (val: boolean) => setServerOpen(val);
	return (
		<>
			<div
				css={css({
					display: 'flex',
					justifyContent: 'end',
					padding: '8px',
				})}
			>
				<IconButton
					onClick={toggleTheme}
					color="inherit"
					sx={{ marginLeft: 'auto' }}
				>
					{theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
				</IconButton>
				<IconButton
					color="inherit"
					onClick={() => handleSettingsDialogState(true)}
				>
					<SettingsIcon />
				</IconButton>
			</div>
			<Container>
				<DetailsTable openAddDialog={() => handleAddDialogState(true)} />
			</Container>
			<AddDialog
				open={addOpen}
				handleClose={() => handleAddDialogState(false)}
				handleServerOpen={() => handleServerDialogState(true)}
			/>
			<Settings
				open={settingsOpen}
				handleClose={() => handleSettingsDialogState(false)}
			/>
			<ServerDialog
				open={serverOpen}
				handleClose={() => handleServerDialogState(false)}
			/>
		</>
	);
}

export default Home;
