import {Game} from "@/core/domain/aggregator/Game.entity";

export class ResetGame {
	constructor(private game: Game) {}

	execute(): void {
		this.game.reset();
	}
}
