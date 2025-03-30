import {Game} from "@/core/domain/game/entity/Game.entity";

export class ResetGame {
	constructor(private game: Game) {}

	execute(): void {
		this.game.reset();
	}
}
