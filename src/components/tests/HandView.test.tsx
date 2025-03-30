import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HandView } from '@/components/HandView';

const mockCards = [
	{ suit: 'Hearts', value: '10', display: '10 of Hearts' },
	{ suit: 'Spades', value: 'A', display: 'A of Spades' },
];

describe('HandView', () => {
	it('renders title and cards', () => {
		render(<HandView title="Player" cards={mockCards} score={21} />);

		expect(screen.getByText(/Player/)).toBeDefined();
		expect(screen.getByText('10 of Hearts')).toBeDefined();
		expect(screen.getByText('A of Spades')).toBeDefined();
		expect(screen.getByText(/Score:/)).toBeDefined();
	});

	it('hides score when hideScore is true', () => {
		render(<HandView title="Dealer" cards={mockCards} hideScore />);

		expect(screen.queryByText(/Score:/)).toBeNull();
	});
});
