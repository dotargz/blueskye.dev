document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", function (e) {
		e.preventDefault();

		document.querySelector(this.getAttribute("href")).scrollIntoView({
			behavior: "smooth",
		});
	});
});

// change the greeting message every 2 seconds to a random language, and animate it using js.
const delay = (n) => new Promise((r) => setTimeout(r, n * 1000));
const div = document.getElementById("greeting-container");
const extra_div = document.getElementById("extra-grammar");
// languages i know
const greetings = ["Hello, I'm", "Hola, soy", "こにちわ、私は"];
const extra_grammar = ["", "", "です"];
let i = 1;

async function setgreeting() {
	div.classList.toggle("fade");
	extra_div.classList.toggle("fade");
	await delay(1);
	div.innerHTML = greetings[i];
	extra_div.innerHTML = extra_grammar[i];
	div.classList.toggle("fade");
	extra_div.classList.toggle("fade");
	await delay(1);
	if (i < greetings.length - 1) {
		i++;
	} else {
		i = 0;
	}
	return true;
}

var getgreetings = window.setInterval(setgreeting, 3000);

// lanyard.js
const lanyardDiv = document.querySelector(".lanyard");
const lanyardStatus = document.querySelector("div.lanyard__info__status");
const lanyardGame = document.querySelector("div.lanyard__info__game");
const lanyardAvatar = document.querySelector("div.lanyard__avatar img");
const lanyardUsername = document.querySelector("div.lanyard__info__username");

// not a complete implementation, but it works.
lanyard({
	userId: "788887558478233650",
}).then((presenceData) => {
	try {
		console.log(presenceData);
		const { spotify, discord_status, activities } = presenceData;
		if (activities.length == 0) {
			lanyardGame.innerHTML = "Nothing";
		} else {
			const { state, details, name, assets, timestamps } = activities[activities.length - 1];
			if (name == "Custom Status") {
				lanyardGame.innerHTML = state;
			} else {
				lanyardGame.innerHTML = "<b>Playing</b> " + name;
			}
			lanyardDiv.classList.add(discord_status);
		}

		if (discord_status == "online") {
			lanyardStatus.innerHTML = "<i class='fas fa-circle' style='color: #43b581;'></i>";
		} else if (discord_status == "idle") {
			lanyardStatus.innerHTML = "<i class='fas fa-circle' style='color: #faa61a;'></i>";
		} else if (discord_status == "dnd") {
			lanyardStatus.innerHTML = "<i class='fas fa-circle' style='color: #f04747;'></i>";
		} else if (discord_status == "offline") {
			lanyardStatus.innerHTML = "<i class='fas fa-circle' style='color: #747f8d;'></i>";
		}
		lanyardAvatar.src = `https://cdn.discordapp.com/avatars/${presenceData.discord_user.id}/${presenceData.discord_user.avatar}.png`;
		lanyardUsername.innerHTML = presenceData.discord_user.username + "#" + presenceData.discord_user.discriminator;
	} catch (e) {
		console.log(e);
		lanyardDiv.style.display = "none";
	}
});

let confetti = new Confetti("special-yippeeee");

// Edit given parameters
confetti.setCount(75);
confetti.setSize(1);
confetti.setPower(25);
confetti.setFade(false);
confetti.destroyTarget(false);
