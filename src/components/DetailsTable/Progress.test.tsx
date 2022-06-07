import { describe, expect, it, vi } from 'vitest';
import { render, screen, act } from '@test/util';
import Progress from './Progress';

describe.only('Progress Component', () => {
	const startTime = new Date(2022, 1, 1);
	const estDuration = 1000 * 60 * 60; // 1 hr

	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(startTime);
	});
	afterEach(() => vi.useRealTimers());

	it('renders', () => {
		const result = render(
			<Progress startTime={startTime.getTime()} estDuration={estDuration} />
		).baseElement;
		expect(result).toMatchSnapshot();
	});

	describe('static', () => {
		it('0%', () => {
			const result = render(
				<Progress startTime={startTime.getTime()} estDuration={estDuration} />
			);

			expect(screen.getByTestId('progress-start').textContent).toEqual(
				'00:00:00'
			);
			expect(screen.getByTestId('progress-elapsed').textContent).toEqual(
				'00:00:00'
			);
			expect(screen.getByTestId('progress-end').textContent).toEqual(
				'01:00:00'
			);

			expect(screen.getByTestId('progress-bar').style.width).toEqual('0%');
		});

		it('50%', () => {
			const result = render(
				<Progress startTime={startTime.getTime()} estDuration={estDuration} />
			);

			act(() => {
				vi.advanceTimersByTime(estDuration / 2); // Advance by 30min
			});

			expect(screen.getByTestId('progress-start').textContent).toEqual(
				'00:00:00'
			);
			expect(screen.getByTestId('progress-elapsed').textContent).toEqual(
				'00:30:00'
			);
			expect(screen.getByTestId('progress-end').textContent).toEqual(
				'01:00:00'
			);

			expect(screen.getByTestId('progress-bar').style.width).toEqual('50%');
		});

		it('100%', () => {
			const result = render(
				<Progress startTime={startTime.getTime()} estDuration={estDuration} />
			);

			act(() => {
				vi.advanceTimersByTime(estDuration); // Advance by 30min
			});

			expect(screen.getByTestId('progress-start').textContent).toEqual(
				'00:00:00'
			);
			expect(screen.getByTestId('progress-elapsed').textContent).toEqual(
				'01:00:00'
			);
			expect(screen.getByTestId('progress-end').textContent).toEqual(
				'01:00:00'
			);

			expect(screen.getByTestId('progress-bar').style.width).toEqual('100%');
		});

		it('Elapsed time exceeds estimated duration', () => {
			const result = render(
				<Progress startTime={startTime.getTime()} estDuration={estDuration} />
			);

			act(() => {
				vi.advanceTimersByTime(estDuration * 1.5); // Advance by 30min
			});

			expect(screen.getByTestId('progress-start').textContent).toEqual(
				'00:00:00'
			);
			expect(screen.getByTestId('progress-elapsed').textContent).toEqual(
				'01:30:00'
			);
			expect(screen.getByTestId('progress-end').textContent).toEqual(
				'01:00:00'
			);

			expect(screen.getByTestId('progress-bar').style.width).toEqual('100%');
		});
	});

	it.only('timer removed on unmount', () => {
		expect(vi.getTimerCount()).toBe(0);
		const result = render(
			<Progress startTime={startTime.getTime()} estDuration={estDuration} />
		);
		expect(vi.getTimerCount()).toBe(1);
		result.unmount();
		expect(vi.getTimerCount()).toBe(0);
	});
});
