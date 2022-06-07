import {
	OpenInNew,
	PlayCircleOutline,
	StopCircleOutlined,
} from '@mui/icons-material';
import { IconButton, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { Job } from '@db/index';
import Progress from './Progress';
import Status from './Status';

type Props = { job: Job; toggleJobState: () => {}; children?: React.ReactNode };

function JobRow({ job, toggleJobState, children }: Props) {
	return (
		<TableRow
			sx={{
				position: 'relative',
				'&:hover #progress': {
					fontSize: '8px',
					height: '10px',
				},
			}}
		>
			<TableCell>
				<Status
					status={job.currentStatus}
					building={job.building}
					role="status"
				/>
				{job.alias}
			</TableCell>
			<TableCell align="right">
				<IconButton
					onClick={(ev) => {
						window
							.open(
								`${job.server}/job/${job.name}${ev.altKey ? '/lastBuild' : ''}`,
								'_blank'
							)
							?.focus();
					}}
				>
					<OpenInNew />
				</IconButton>
				<IconButton onClick={toggleJobState}>
					{job.paused ? (
						<StopCircleOutlined color="error" />
					) : (
						<PlayCircleOutline color="success" />
					)}
				</IconButton>
			</TableCell>
			{job.building && job.timestamp && job.estimatedDuration && (
				<Progress
					startTime={job.timestamp}
					estDuration={job.estimatedDuration}
				/>
			)}
			{children}
		</TableRow>
	);
}

export default JobRow;
