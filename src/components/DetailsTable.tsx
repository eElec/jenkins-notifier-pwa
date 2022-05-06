import React from 'react';
import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TableFooter,
	IconButton,
} from '@mui/material';
import {
	Add,
	OpenInNew,
	PlayCircleOutline,
	StopCircleOutlined,
} from '@mui/icons-material';
import { useLiveQuery } from 'dexie-react-hooks';
// import db from '@src/db';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import db from './../db/index';

function DetailsTable(props: any) {
	const { openAddDialog } = props;

	const jobs = useLiveQuery(() => db.job.toArray());

	return (
		<TableContainer component={Paper} sx={{ marginTop: '2rem' }}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Job</TableCell>
						<TableCell align="right">Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{jobs?.map((job) => (
						<TableRow key={job._id}>
							<TableCell>{job.alias}</TableCell>
							<TableCell align="right">
								<IconButton>
									{job.paused ? (
										<StopCircleOutlined color="error" />
									) : (
										<PlayCircleOutline color="success" />
									)}
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell align="center" colSpan={2}>
							<Button
								variant="text"
								size="small"
								startIcon={<Add />}
								sx={{ width: '100%' }}
								onClick={openAddDialog}
							>
								<span>Add</span>
							</Button>
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</TableContainer>
	);
}

export default DetailsTable;
