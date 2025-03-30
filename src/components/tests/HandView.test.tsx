import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HandView } from '@/components/HandView';

const mockCards = [
	{ suit: 'Hearts', value: '10', display: '10 of Hearts' },
	{ suit: 'Spades', value: 'A', display: 'A of Spades' },
];

describe('HandView', () => {
	it('renders title and card elements', () => {
		render(<HandView title="Player" cards={mockCards} score={21} />);

		expect(screen.getByText(/Player/)).toBeDefined();
		expect(screen.getAllByTestId('card')).toHaveLength(2);
		expect(screen.getByText(/Score:/)).toBeDefined();
	});

	it('hides score when hideScore is true', () => {
		render(<HandView title="Dealer" cards={mockCards} hideScore />);

		expect(screen.queryByText(/Score:/)).toBeNull();
	});
});
