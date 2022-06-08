import React from 'react';
import {
	Container,
	Dialog,
	Grid,
	TextField,
	Button,
	DialogContent,
	DialogTitle,
	DialogActions,
	Select,
	MenuItem,
	IconButton,
	InputLabel,
	FormControl,
	Typography,
	Checkbox,
	CircularProgress,
} from '@mui/material';
import db, { Server } from '../db';
import { useLiveQuery } from 'dexie-react-hooks';
import { Add } from '@mui/icons-material';
import { css } from '@emotion/react';

interface ServerProps {
	open: boolean;
	handleClose: () => void;
}

function ServerDialog(props: ServerProps) {
	const { open, handleClose } = props;

	const [form, setForm] = React.useState({
		server: '',
		username: '',
		token: '',
	});
	const [proxy, setProxy] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(false);

	const handleChange = (prop: string) => (ev: any) => {
		setForm({ ...form, [prop]: ev.target.value });
	};
	const handleProxy = (ev: any) => {
		setProxy(ev.target.checked);
	};

	const addServer = async () => {
		const { server, username, token } = form;
		const authToken = btoa(`${username}:${token}`);
		setLoading(true);

		let url = '';
		if (proxy === true) url += import.meta.env.VITE_PROXY;
		url += `${form.server}/user/${form.username}/api/json`;
		try {
			const res = await fetch(url, {
				method: 'get',
				headers: {
					Authorization: `basic ${authToken}`,
				},
			}).then((res) => res.json());

			await db.server.put(
				new Server({
					server,
					username,
					authToken,
					proxy,
				})
			);
			setLoading(false);
			handleClose();
		} catch (err) {
			setLoading(false);
			setError(false);
		}
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			sx={{
				'.MuiPaper-root': {
					width: '300px',
				},
			}}
		>
			<DialogTitle>Server</DialogTitle>
			<DialogContent dividers>
				<div
					css={css({
						display: 'flex',
						flexDirection: 'column',
						'>div': {
							marginBottom: '1rem',
						},
					})}
				>
					<TextField
						variant="standard"
						required
						value={form.server}
						label="Server URL"
						placeholder=""
						onChange={handleChange('server')}
					/>
					<TextField
						variant="standard"
						value={form.username}
						label="Username"
						onChange={handleChange('username')}
					/>
					<TextField
						variant="standard"
						type="password"
						value={form.token}
						label="Token"
						onChange={handleChange('token')}
					/>
					<Typography
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						Proxy <Checkbox checked={proxy} onChange={handleProxy} />
					</Typography>
				</div>
			</DialogContent>
			<DialogActions>
				{loading ? (
					<CircularProgress />
				) : (
					<Button onClick={addServer}>Add</Button>
				)}
			</DialogActions>
		</Dialog>
	);
}

export default ServerDialog;
