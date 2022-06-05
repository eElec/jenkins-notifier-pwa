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
} from '@mui/material';
import {
	Add,
} from '@mui/icons-material';
import { useLiveQuery } from 'dexie-react-hooks';
import db from '@db/index';
import JobRow from './JobRow';

function DetailsTable(props: any) {
	const { openAddDialog } = props;

	const jobs = useLiveQuery(() => db.job.toArray());

	return (
		<TableContainer component={Paper} sx={{ marginTop: '2rem' }}>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>Job</TableCell>
						<TableCell align="right">Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{jobs?.map((job) => (
						<JobRow job={job} key={job._id} />
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
