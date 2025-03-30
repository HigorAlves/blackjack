import {Game} from "@/core/domain/aggregator/Game.entity";

export class PlayerStand {
	constructor(private game: Game) {}

	execute(): void {
		if (this.game.getStatus() !== 'in_progress') {
			throw new Error('Cannot stand unless game is in progress.');
		}

		this.game.playerStand(); // handles dealer play and finishing the game
	}
}
