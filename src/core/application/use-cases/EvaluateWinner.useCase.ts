import {Game} from "@/core/domain/aggregator/Game.entity";

export type GameResult = 'player' | 'dealer' | 'draw';

export class EvaluateWinner {
	constructor(private game: Game) {}

	execute(): GameResult {
		if (!this.game.isFinished()) {
			throw new Error('Cannot evaluate winner: game is not finished');
		}

		const result = this.game.getWinner();

		if (!result) {
			throw new Error('Unexpected error: no winner after game finished');
		}

		return result;
	}
}
