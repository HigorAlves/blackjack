import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatusBar } from '@/components/StatusBar';

describe('StatusBar', () => {
	it('shows the current game status', () => {
		render(<StatusBar status="in_progress" winner={null} />);
		expect(screen.getByText(/in_progress/i)).toBeDefined();
	});

	it('shows the winner when available', () => {
		render(<StatusBar status="finished" winner="player" />);
		expect(screen.getByText(/Winner:/i)).toBeDefined();
		expect(screen.getByText(/player/i)).toBeDefined();
	});
});
