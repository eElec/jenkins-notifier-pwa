import Dexie from 'dexie';
import { IJob, IJobResponse, IServer } from './types';

export class Job implements IJob {
	constructor(data: IJob) {
		Object.assign(this, data);
	}
	_id?: number | undefined;
	name!: string;
	alias!: string;
	paused!: boolean;
	server!: string;
	currentStatus?: 'SUCCESS' | 'FAILURE' | 'UNSTABLE' | undefined;
	result?: 'SUCCESS' | 'FAILURE' | 'UNSTABLE' | undefined;
	number?: number;
	building?: boolean;
	timestamp?: number;
	duration?: number;
	estimatedDuration?: number;

	async getServer(db: LocalDB) {
		return db.server.get(this.server).then((srv) => srv?.getFetchRequest());
	}

	async checkJob(db: LocalDB) {
		const request = await this.getServer(db);
		if (request === undefined) return false;

		try {
			await request(`job/${this.name}`);
			return true;
		} catch (err) {
			return false;
		}
	}

	async getStatus(db: LocalDB) {
		const request = await this.getServer(db);
		if (request === undefined) return null;

		// return await fetch(request(`job/${this.name}/lastBuild`));
		return request<IJobResponse>(`job/${this.name}/lastBuild`);
	}
}

export class Server implements IServer {
	server!: string;
	username!: string;
	authToken!: string;
	proxy!: boolean;

	constructor(data: IServer) {
		Object.assign(this, data);
	}

	getFetchRequest() {
		const { authToken, server, proxy } = this;

		let baseURL = '';
		if (proxy) baseURL += import.meta.env.VITE_PROXY;
		baseURL += server;

		return async <T>(url: string): Promise<T> => {
			const request = new Request(`${baseURL}/${url}/api/json/`, {
				method: 'GET',
				headers: {
					Authorization: `basic ${authToken}`,
				},
			});
			const resp = await fetch(request);
			return resp.json() as Promise<T>;
		};
	}
}

class LocalDB extends Dexie {
	job!: Dexie.Table<Job, number>;
	server!: Dexie.Table<Server, string>;

	constructor() {
		super('JenkinsNotifier');
		this.version(1).stores({
			job: '++_id,&name',
			server: 'server',
		});
		this.job.mapToClass(Job);
		this.server.mapToClass(Server);
	}
}

const db = new LocalDB();
export default db;
