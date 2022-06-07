import { describe, expect, it, vi } from 'vitest';
import { render, screen, cleanup, act } from '@test/util';
import 'fake-indexeddb/auto';
import db from '@db/index';
import DetailsTable from './index';
import Status from './Status';

describe('Job Details Table', () => {
	it('renders', () => {
		render(<DetailsTable />);

		expect(screen.getByText('Job')).toBeInTheDocument();
		expect(screen.getByText('Actions')).toBeInTheDocument();
		expect(screen.getByText('Add')).toBeInTheDocument();
	});
});
