import React from 'react';
import { Theme } from '@mui/system';
import styled from '@emotion/styled';
import { IJobStatus } from '../../db/types';
import { css, keyframes } from '@emotion/react';

const glow = (color: string) => keyframes`
	0% { box-shadow:0 0 4px 1px ${color} }
	50% { box-shadow:0 0 4px 3px ${color} }
	100% { box-shadow:0 0 4px 1px ${color} }
`;

type Props = { building?: boolean; theme?: Theme; status?: IJobStatus };

const Status = styled('span')(({ building, status, theme }: Props) => {
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

export default Status;
