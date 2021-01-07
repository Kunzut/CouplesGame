export default class GameEl {
	constructor(elementWrap) {
		this.$el = document.createElement("div");
		this.$el.classList.add(elementWrap);
	}

	init() {}

	append($els = []) {
		$els.forEach(($el) => {
			this.$el.appendChild($el);
		});
	}

	destroy() {
		this.$el.remove();
	}
}
