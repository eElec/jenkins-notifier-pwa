import {
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	Switch,
	TextField,
	Typography,
} from '@mui/material';
import React from 'react';

const form = () => ({
	'.MuiFormControl-root': {
		marginBottom: '1rem',
	},
	'.MuiGrid-item': {
		width: '100%',
	},
	'.label-div': {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
});

interface SettingsProps {
	open: boolean;
	handleClose: () => void;
}

function Settings(props: SettingsProps) {
	const { open, handleClose } = props;

	const [formValues, setFormValues] = React.useState({
		interval: parseInt(localStorage.getItem('interval') ?? '60000', 10),
	});
	const [pushRegistered, setPushRegistered] = React.useState(false);
	const [notificationEnabled, setNotificationEnabled] = React.useState(
		Notification.permission === 'granted'
	);

	React.useEffect(() => {
		navigator.serviceWorker?.getRegistration().then((reg) => {
			reg?.pushManager.getSubscription().then((sub) => {
				if (sub !== null) {
					setPushRegistered(true);
				}
			});
		});
	}, []);

	const handleNotification = (ev: any) => {
		if (ev.target.checked === true) {
			Notification.requestPermission((status) => {
				if (status === 'granted') setNotificationEnabled(true);
			});
		} else {
			// TODO: Handle turning off notification
		}
	};

	// TODO: disable / enable push subscription
	const handleSubscription = (ev: any) => ev;

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Settings</DialogTitle>
			<DialogContent dividers>
				<Container>
					<Grid
						container
						direction="column"
						alignItems="center"
						justifyContent="center"
						sx={form}
					>
						<Grid item xs={12}>
							<TextField
								variant="standard"
								value={formValues.interval}
								label="Interval"
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<div className="label-div">
								<Typography>Notification</Typography>
								<Switch
									onChange={handleNotification}
									checked={notificationEnabled}
									color="primary"
								/>
							</div>
						</Grid>
						<Grid item xs={12}>
							<div className="label-div">
								<Typography>Subscribe to Push Notification</Typography>
								<Switch
									onChange={handleSubscription}
									checked={pushRegistered}
									color="primary"
								/>
							</div>
						</Grid>
					</Grid>
				</Container>
			</DialogContent>
			<DialogActions>
				<Button>Save</Button>
			</DialogActions>
		</Dialog>
	);
}

export default Settings;
