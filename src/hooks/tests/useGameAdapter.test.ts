import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import {useGameAdapter} from "@/hooks/useGameAdapter.hook";

describe('useGameAdapter', () => {
	it('should initialize and start a new game', () => {
		const { result } = renderHook(() => useGameAdapter());

		act(() => {
			result.current.startGame();
		});

		expect(result.current.status).toBe('in_progress');
		expect(result.current.player.getHand().getCards().length).toBe(2);
		expect(result.current.dealer.getHand().getCards().length).toBe(2);
	});

	it('should handle player hit and update hand', () => {
		const { result } = renderHook(() => useGameAdapter());

		act(() => {
			result.current.startGame();
			result.current.hit();
		});

		expect(result.current.player.getHand().getCards().length).toBeGreaterThan(2);
	});

	it('should handle player stand and finish the game', () => {
		const { result } = renderHook(() => useGameAdapter());

		act(() => {
			result.current.startGame();
			result.current.stand();
		});

		expect(result.current.status).toBe('finished');
		expect(result.current.winner).toMatch(/player|dealer|draw/);
	});

	it('should reset the game', () => {
		const { result } = renderHook(() => useGameAdapter());

		act(() => {
			result.current.startGame();
			result.current.resetGame();
		});

		expect(result.current.status).toBe('waiting');
		expect(result.current.player.getHand().getCards()).toHaveLength(0);
		expect(result.current.dealer.getHand().getCards()).toHaveLength(0);
	});
});
