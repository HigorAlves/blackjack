import {Game} from "@/core/domain/aggregator/Game.entity";

export class PlayerHit {
	constructor(private game: Game) {}

	execute(): void {
		if (this.game.getStatus() !== 'in_progress') {
			throw new Error('Cannot hit unless game is in progress.');
		}

		this.game.playerHit(); // handles draw + bust check
	}
}
