import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BlackjackBoard } from '@/components/BlackjackBoard';

describe('BlackjackBoard', () => {
	it('renders the initial board', () => {
		render(<BlackjackBoard />);

		expect(screen.getByRole('button', { name: /start game/i })).toBeDefined();
		expect(screen.getByRole('button', { name: /hit/i })).toBeDefined();
		expect(screen.getByRole('button', { name: /stand/i })).toBeDefined();
		expect(screen.getByRole('button', { name: /reset/i })).toBeDefined();
	});
});
