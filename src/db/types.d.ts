export type IJobStatus = 'SUCCESS' | 'FAILURE' | 'UNSTABLE';

export interface IJobResponse {
	result?: IJobStatus | null;
	number?: number;
	building?: boolean;
	timestamp?: number;
	duration?: number;
	estimatedDuration?: number;
}

export interface IJob extends IJobResponse {
	_id?: number;
	name: string;
	alias: string;
	paused: boolean;
	server: string;
	currentStatus?: IJobStatus;
}

export interface IServer {
	server: string;
	username: string;
	authToken: string;
	proxy: boolean;
}
