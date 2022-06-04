import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/system';

type Props = { startTime: number; estDuration: number };

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

	return (
		<div
			style={{
				position: 'absolute',
				bottom: 0,
				left: 0,
				background: theme.palette.success.dark,
				height: '2px',
				width: `${perc}%`
			}}
		/>
	);
}

export default Progress;
