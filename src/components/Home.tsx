import React from 'react';
import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material';
import DetailsTable from './DetailsTable';
import AddDialog from './AddDialog';
import Settings from './Settings';
import ServerDialog from './ServerDialog';

function Home() {
	const [addOpen, setAddOpen] = React.useState(false);
	const [settingsOpen, setSettingsOpen] = React.useState(false);
	const [serverOpen, setServerOpen] = React.useState(false);

	const handleAddDialogState = (val: boolean) => setAddOpen(val);
	const handleSettingsDialogState = (val: boolean) => setSettingsOpen(val);
	const handleServerDialogState = (val: boolean) => setServerOpen(val);
	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<Button
						color="inherit"
						onClick={() => handleSettingsDialogState(true)}
						sx={{ marginLeft: 'auto' }}
					>
						Settings
					</Button>
				</Toolbar>
			</AppBar>
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
