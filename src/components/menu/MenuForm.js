export default class MenuForm {
	constructor(app) {
		this.$app = app;
		this.$el = document.createElement("form");
		this.init();
	}

	init() {
		this.$inputWidth = document.createElement("input");
		this.$inputHeght = document.createElement("input");
		this.$startButton = document.createElement("button");

		this.$el.classList.add("form-group");
		this.$inputWidth.classList.add("form-control");
		this.$inputWidth.placeholder = "Введите ширину ";
		this.$inputHeght.classList.add("form-control");
		this.$inputHeght.placeholder = "Введите высоту ";
		this.$startButton.classList.add("btn", "start-btn");
		this.$startButton.type = "submit";
		this.$startButton.innerText = "Начать";

		this.$el.appendChild(this.$inputWidth);
		this.$el.appendChild(this.$inputHeght);
		this.$el.appendChild(this.$startButton);
	}

	getWidthAndHeight() {
		this.width = this.$inputWidth.value;
		this.height = this.$inputHeght.value;

		if (this.checkWidthAndHeight(this.width, this.height)) {
			this.value = {
				width: this.width,
				height: this.height,
			};
			return this.value;
		} else {
			this.$inputWidth.value = "4";
			this.$inputHeght.value = "4";
			return false;
		}
	}

	checkWidthAndHeight(width, height) {
		if (
			width > 0 &&
			width <= 10 &&
			width % 2 === 0 &&
			height > 0 &&
			height <= 10 &&
			height % 2 === 0
		) {
			return true;
		} else {
			return false;
		}
	}
}
