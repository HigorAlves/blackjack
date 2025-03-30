import { describe, it, expect } from 'vitest';
import {Game} from "@/core/domain/aggregator/Game.entity";
import {StartGame} from "@/core/application/use-cases/StartGame.useCase";
import {createGameStateDTO} from "@/core/application/dto/GameState.dto";

describe('GameStateDTO', () => {
	it('should expose player and dealer state correctly', () => {
		const game = new Game();
		new StartGame(game).execute();

		const dto = createGameStateDTO(game);

		expect(dto.status).toBe('in_progress');
		expect(dto.player.cards.length).toBe(2);
		expect(dto.dealer.cards.length).toBe(2);
		expect(dto.dealer.cards[1].display).toBe('🂠');
		expect(dto.player.score).toBeGreaterThan(0);
		expect(dto.winner).toBeNull();
	});

	it('should reveal dealer cards and winner when game is finished', () => {
		const game = new Game();
		new StartGame(game).execute();

		game.playerStand(); // finish game
		const dto = createGameStateDTO(game);

		expect(dto.status).toBe('finished');
		expect(dto.dealer.cards[1].display).not.toBe('🂠');
		expect(dto.winner).toMatch(/player|dealer|draw/);
	});
});
