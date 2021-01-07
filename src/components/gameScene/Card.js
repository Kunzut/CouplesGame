export default class Card {
	constructor(name) {
		this.$name = document.createElement("span");
		this.$name.classList.add("card-text");
		this.$name.innerText = `${name}`;

		this.init();
	}

	init() {
		this.$el = document.createElement("li");
		this.$cardFront = document.createElement("div");
		this.$cardBack = document.createElement("div");

		this.$el.classList.add("card", "is-flipped");
		this.$el.dataset.open = "false";
		this.$cardFront.classList.add("card-face", "card-face--front");
		this.$cardBack.classList.add("card-face", "card-face--back");

		this.$cardFront.appendChild(this.$name);
		this.$el.appendChild(this.$cardFront);
		this.$el.appendChild(this.$cardBack);
	}

	selectCard() {
		if (this.openCard !== null) {
			let open = this.openCard();
			if (open) {
				return this.$el;
			} else {
				return false;
			}
		}
	}

	openCard() {
		if (this.$el.classList.contains("is-flipped")) {
			this.$el.classList.remove("is-flipped");
			return true;
		} else {
			this.$el.classList.add("is-flipped");
			return false;
		}
	}
}
