import { describe, it, expect, vi , beforeEach} from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ActionPanel } from '@/components/ActionPanel';

describe('ActionPanel', () => {
	const handlers = {
		onStart: vi.fn(),
		onHit: vi.fn(),
		onStand: vi.fn(),
		onReset: vi.fn(),
	};

	beforeEach(() => {
		Object.values(handlers).forEach(fn => fn.mockClear());
	});

	it('renders all buttons', () => {
		render(<ActionPanel status="waiting" {...handlers} />);
		expect(screen.getByText(/Start Game/i)).toBeDefined();
		expect(screen.getByText(/Hit/i)).toBeDefined();
		expect(screen.getByText(/Stand/i)).toBeDefined();
		expect(screen.getByText(/Reset/i)).toBeDefined();
	});

	it('calls correct handler on button click', () => {
		render(<ActionPanel status="in_progress" {...handlers} />);

		fireEvent.click(screen.getByText(/Start Game/i));
		fireEvent.click(screen.getByText(/Hit/i));
		fireEvent.click(screen.getByText(/Stand/i));
		fireEvent.click(screen.getByText(/Reset/i));

		expect(handlers.onStart).toHaveBeenCalled();
		expect(handlers.onHit).toHaveBeenCalled();
		expect(handlers.onStand).toHaveBeenCalled();
		expect(handlers.onReset).toHaveBeenCalled();
	});
});
