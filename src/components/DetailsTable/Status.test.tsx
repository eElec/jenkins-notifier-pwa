import { describe, expect, it } from 'vitest';
import { render } from '@test/util';
import Status from './Status';

describe('Status Component', () => {
	describe('render each status', () => {
		it('success', () => {
			const success = render(<Status status="SUCCESS" />).baseElement;
			expect(success).toMatchSnapshot();
		});

		it('failure', () => {
			const failure = render(<Status status="FAILURE" />).baseElement;
			expect(failure).toMatchSnapshot();
		});

		it('unstable', () => {
			const unstable = render(<Status status="UNSTABLE" />).baseElement;
			expect(unstable).toMatchSnapshot();
		});

		it('no status', () => {
			const result = render(<Status />).baseElement;
			expect(result).toMatchSnapshot();
		});
	});

	describe('render each building status', () => {
		it('success', () => {
			const success = render(<Status status="SUCCESS" building />).baseElement;
			expect(success).toMatchSnapshot();
		});

		it('failure', () => {
			const failure = render(<Status status="FAILURE" building />).baseElement;
			expect(failure).toMatchSnapshot();
		});

		it('unstable', () => {
			const unstable = render(
				<Status status="UNSTABLE" building />
			).baseElement;
			expect(unstable).toMatchSnapshot();
		});

		it('no status', () => {
			const result = render(<Status building />).baseElement;
			expect(result).toMatchSnapshot();
		});
	});
});
