import GameEl from "../game/GameEl";
import MenuForm from "./MenuForm";
import GameScene from "../gameScene/GameScene";

export default class Menu extends GameEl {
	constructor(app, elementWrap) {
		super(elementWrap);
		this.$app = app;
		this.init();
	}

	init() {
		this.$title = document.createElement("h1");
		this.$form = new MenuForm(this.$app);

		this.$title.classList.add("menu-title");
		this.$title.innerText = "Сouples Game v0.2";

		this.$form.$el.addEventListener("submit", (event) => {
			event.preventDefault();
			this.startGame();
		});

		this.append([this.$title, this.$form.$el]);
		this.addApp();
	}

	addApp() {
		this.$app.appendChild(this.$el);
	}

	startGame() {
		const startValue = this.$form.getWidthAndHeight();
		if (startValue) {
			this.$el.remove();
			this.gameScene = new GameScene(
				this.$app,
				"game-wrap",
				startValue.width,
				startValue.height
			);
		} else {
			return;
		}
	}
}
