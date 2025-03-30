import {Game} from "@/core/domain/aggregator/Game.entity";

export class StartGame {
	constructor(private game: Game) {}

	execute(): void {
		this.game.start();
	}
}
