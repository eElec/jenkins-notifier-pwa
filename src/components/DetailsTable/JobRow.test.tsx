import { describe, expect, it, vi } from 'vitest';
import { render, screen, act, fireEvent } from '@test/util';
import { completedJob, runningJob } from '@test/mock-job';
import { Job } from '@db/index';
import JobRow from './JobRow';

describe('Job Row Component', () => {
	const table = document.createElement('table');
	const tbody = document.createElement('tbody');
	table.appendChild(tbody);
	document.body.appendChild(table);

	it('check if all components are present', () => {
		let job = new Job(completedJob);
		const result = render(<JobRow job={job} toggleJobState={vi.fn()} />, {
			container: tbody,
		});

		const columns = document.querySelectorAll('td');
		const jobColumn = columns[0];

		expect(screen.getByRole('status')).toBeInTheDocument();
		expect(jobColumn.textContent).toBe(job.alias);

		expect(document.querySelector('#progress')).not.toBeInTheDocument();

		expect(screen.getByTestId('OpenInNewIcon')).toBeInTheDocument();
		expect(screen.getByTestId('PlayCircleOutlineIcon')).toBeInTheDocument();

		job = new Job(runningJob);
		result.rerender(<JobRow job={job} toggleJobState={vi.fn()} />);
		expect(document.querySelector('#progress')).toBeInTheDocument();
	});

	describe('actions', () => {
		it('opens job page in new tab', () => {
			let job = new Job(completedJob);
			job.name = 'test_job';
			job.server = 'https://test.com';
			const result = render(<JobRow job={job} toggleJobState={vi.fn()} />, {
				container: tbody,
			});

			const mockOpen = vi.fn((url, target) => ({ focus: vi.fn() }));

			const originalOpen = window.open;
			//@ts-ignore
			window.open = mockOpen;
			fireEvent(
				result.getByTestId('OpenInNewIcon'),
				new MouseEvent('click', { bubbles: true })
			);

			expect(mockOpen).toBeCalled();
			expect(mockOpen).toBeCalledWith(
				'https://test.com/job/test_job',
				'_blank'
			);

			mockOpen.mockClear();
			fireEvent(
				result.getByTestId('OpenInNewIcon'),
				new MouseEvent('click', { bubbles: true, altKey: true })
			);

			expect(mockOpen).toBeCalled();
			expect(mockOpen).toBeCalledWith(
				'https://test.com/job/test_job/lastBuild',
				'_blank'
			);

			window.open = originalOpen;
		});
    
		it('toggle job states', () => {
      let job = new Job(completedJob);
      // Job Resumed
			const toggleJobStateMock = vi.fn();
			const result = render(
				<JobRow job={job} toggleJobState={toggleJobStateMock} />,
				{
					container: tbody,
				}
			);

			expect(screen.getByTestId('PlayCircleOutlineIcon')).toBeInTheDocument();
			fireEvent(
				screen.getByTestId('PlayCircleOutlineIcon'),
				new MouseEvent('click', { bubbles: true })
			);
			expect(toggleJobStateMock).toBeCalled();

			toggleJobStateMock.mockClear();

      // Job Paused
			job.paused = true;
			result.rerender(<JobRow job={job} toggleJobState={toggleJobStateMock} />);
			expect(screen.getByTestId('StopCircleOutlinedIcon')).toBeInTheDocument();
			fireEvent(
				screen.getByTestId('StopCircleOutlinedIcon'),
				new MouseEvent('click', { bubbles: true })
			);
			expect(toggleJobStateMock).toBeCalled();
		});
	});
});
