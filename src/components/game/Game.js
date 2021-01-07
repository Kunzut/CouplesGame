import Menu from "../menu/Menu";
import GameEl from "./GameEl";

export default class Game extends GameEl {
	constructor(elementWrap) {
		super(elementWrap);
		this.$el = document.getElementById(elementWrap);
		this.init();
	}

	init() {
		this.menu = new Menu(this.$el, "menu-wrap");
	}
}
