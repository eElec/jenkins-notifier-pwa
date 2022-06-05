import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/system';
import { css } from '@emotion/react';

type Props = { startTime: number; estDuration: number };

function msToTime(s: number) {
	// Pad to 2 or 3 digits, default is 2
	var pad = (n: number, z = 2) => ('00' + n).slice(-z);
	return (
		pad((s / 3.6e6) | 0) +
		':' +
		pad(((s % 3.6e6) / 6e4) | 0) +
		':' +
		pad(((s % 6e4) / 1000) | 0)
	);
}

function Progress(props: Props) {
	const { startTime, estDuration } = props;
	const theme = useTheme();

	// Update every second
	const [currentTime, setCurrentTime] = useState(Date.now());

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(Date.now());
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	});

	const perc = Math.min(((currentTime - startTime) / estDuration) * 100, 100);

	const startString = new Date(startTime).toTimeString().substring(0, 8);
	const endString = new Date(startTime + estDuration)
		.toTimeString()
		.substring(0, 8);

	return (
		<div
			id="progress"
			css={{
				position: 'absolute',
				bottom: 0,
				left: 0,
				height: '2px',
				width: '100%',
				display: 'flex',
				justifyContent: 'space-between',
				fontSize: '0px',
				span: {
					position: 'relative',
					bottom: '1px',
					color: theme.palette.text.primary,
				},
				transition: 'ease 0.2s',
			}}
		>
			<div
				css={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					background:
						theme.palette.mode === 'light'
							? theme.palette.success.light
							: theme.palette.success.dark,
					height: '100%',
				}}
				style={{ width: `${perc}%` }}
			/>
			<span>{startString}</span>
			<span>{msToTime(currentTime - startTime)}</span>
			<span>{endString}</span>
		</div>
	);
}

export default Progress;
