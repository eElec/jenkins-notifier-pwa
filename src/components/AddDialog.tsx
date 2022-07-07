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
	Stack,
} from '@mui/material';
import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Add } from '@mui/icons-material';
import { css } from '@emotion/react';
import db, { Job } from './../db/index';

interface AddProps {
	open: boolean;
	handleClose: () => void;
	handleServerOpen: () => void;
}

function AddDialog(props: AddProps) {
	const { open, handleClose, handleServerOpen } = props;
	const [form, setForm] = React.useState({
		jobName: '',
		alias: '',
		server: '',
	});
	const servers = useLiveQuery(() => db.server.toArray());

	const handleChange = (prop: string) => (ev: any) => {
		setForm({ ...form, [prop]: ev.target.value });
	};

	const handleJobAdd = async () => {
		const { jobName: name, alias, server } = form;
		const job = new Job({
			name,
			alias: alias === '' ? name : alias,
			server,
			paused: false,
		});

		job.checkJob(db).then((r) => {
			if (r === true) {
				db.job.add(job);
				handleClose();
			}
		});
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			sx={{
				'.MuiPaper-root': {
					width: '400px',
				},
			}}
		>
			<DialogTitle>Job</DialogTitle>
			<DialogContent dividers>
				<div
					css={css({
						display: 'flex',
						flexDirection: 'column',
						'>div': {
							marginBottom: '1rem',
						},
						'#server': {
							display: 'flex',
							alignItems: 'center',
						},
					})}
				>
					<TextField
						variant="standard"
						required
						value={form.jobName}
						label="Job Name"
						placeholder="Job Name as in Jenkins"
						onChange={handleChange('jobName')}
					/>
					<TextField
						variant="standard"
						value={form.alias}
						label="Alias"
						onChange={handleChange('alias')}
					/>
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="center"
						spacing={2}
					>
						<FormControl fullWidth>
							<InputLabel htmlFor="server-select">Server</InputLabel>
							<Select
								id="server-select"
								label="Server"
								value={form.server}
								onChange={handleChange('server')}
								disabled={servers?.length === 0}
							>
								{servers?.map((e) => (
									<MenuItem key={e.server} value={e.server}>
										{e.server}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<div>
							<IconButton size="small" onClick={handleServerOpen}>
								<Add />
							</IconButton>
						</div>
					</Stack>
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleJobAdd}>Add</Button>
			</DialogActions>
		</Dialog>
	);
}

export default AddDialog;
