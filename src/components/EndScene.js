import GameEl from "./game/GameEl";
import Menu from "./menu/Menu";

export default class EndScene extends GameEl {
	constructor(app, elementWrap) {
		super(elementWrap);
		this.$app = app;
		this.init();
	}

	init() {
		this.$title = document.createElement("h2");
		this.$buttonRepeat = document.createElement("button");

		this.$title.classList.add("end-title");
		this.$title.innerText = "Конец игры!";
		this.$buttonRepeat.classList.add("btn", "repeat-btn");
		this.$buttonRepeat.innerText = "Еще раз";

		this.$buttonRepeat.addEventListener("click", (event) => {
			event.preventDefault();
			this.destroy();
			this.repeatGame();
		});

		this.append([this.$title, this.$buttonRepeat]);
		this.addApp(this.$el);
	}

	addApp($el) {
		this.$app.appendChild($el);
	}

	repeatGame() {
		const menu = new Menu(this.$app, "menu-wrap");
		this.addApp(menu.$el);
	}
}
