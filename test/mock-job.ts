import { IJob } from '@db/types';

const startTime = new Date(2022, 1, 1).getTime();
const estDuration = 1000 * 60 * 60;

export const runningJob: IJob = {
	name: 'Running_Job',
	alias: 'Running Job',
	paused: false,
	server: 'https://test.com',
	currentStatus: 'SUCCESS',
	result: null,
	number: 1,
	building: true,
	timestamp: startTime,
	duration: 0,
	estimatedDuration: estDuration,
	_id: 1,
};

export const completedJob: IJob = {
	name: 'Completed_Job',
	alias: 'Completed Job',
	paused: false,
	server: 'https://test.com',
	currentStatus: 'SUCCESS',
	result: 'SUCCESS',
	number: 2,
	building: false,
	timestamp: startTime,
	duration: estDuration * 1.5,
	estimatedDuration: estDuration,
	_id: 4,
};
