import React, { useEffect, useRef, useState } from 'react';
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
import { Theme, useTheme } from '@mui/system';
import { useLiveQuery } from 'dexie-react-hooks';
// import db from '@src/db';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import db from './../db/index';
import { IJobStatus } from '../db/types';

const glow = (color: string) => keyframes`
	0% { box-shadow:0 0 4px 1px ${color} }
	50% { box-shadow:0 0 4px 3px ${color} }
	100% { box-shadow:0 0 4px 1px ${color} }
`;

interface StatusProps {
	building?: boolean;
	theme?: Theme;
	status?: IJobStatus;
}

const Status = styled('span')(({ building, status, theme }: StatusProps) => {
	if (theme === undefined) return;
	let palette = theme.palette.success;
	switch (status) {
		case 'SUCCESS':
			palette = theme.palette.success;
			break;
		case 'FAILURE':
			palette = theme.palette.error;
			break;
		case 'UNSTABLE':
			palette = theme.palette.warning;
			break;
		default:
			palette = {
				main: theme.palette.grey[300],
				dark: theme.palette.grey[400],
			};
	}

	return css`
		margin-right: 8px;
		height: 10px;
		width: 10px;
		border-radius: 50%;
		display: inline-block;
		background-color: ${palette.main};
		box-shadow: 0px 0px 8px ${palette.main};
		${building &&
		css`
			animation: ${glow(palette.dark)} 1s ease infinite;
		`}
	`;
});

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
						<TableRow key={job._id} sx={{ position: 'relative' }}>
							<TableCell>
								<Status status={job.currentStatus} building={job.building} />
								{job.alias}
							</TableCell>
							<TableCell align="right">
								<IconButton
									onClick={(ev) => {
										window
											.open(
												`${job.server}/job/${job.name}${
													ev.altKey ? '/lastBuild' : ''
												}`,
												'_blank'
											)
											?.focus();
									}}
								>
									<OpenInNew />
								</IconButton>
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
