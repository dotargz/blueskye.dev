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
			lanyardGame.innerHTML = "doing nothing";
		} else {
			let act;
			// { state, details, name, assets, timestamps }
			if (activities[activities.length - 1].name == "Hang Status") {
				console.log("skipping hang status");
				act = activities[activities.length - 2];
				console.log(act.name);
			} else {
				console.log("no hang status?");
				act = activities[activities.length - 1];
			}
			if (act.name == "Custom Status") {
				lanyardGame.innerHTML = act.state;
			} else if (act.name == "Music") {
				lanyardGame.innerHTML = "<b>Listening to</b> " + act.details + " by " + act.state;
			} else if (act.name == "Spotify") {
				lanyardGame.innerHTML = "<b>Listening to</b> " + act.details + " by " + act.state;
			} else if (act.name == "Code") {
				lanyardGame.innerHTML = "<b>Coding</b> " + act.details;
			}
			else {
				lanyardGame.innerHTML = "<b>Playing</b> " + act.name;
			}
			lanyardDiv.classList.add(discord_status);

			// if the text of the innerHTML is over 64 characters, truncate it and add an ellipsis
			if (lanyardGame.textContent.length > 64) {
				lanyardGame.innerHTML = lanyardGame.innerHTML.substring(0, 64) + "...";
			}
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
		lanyardAvatar.src = `https://cdn.discordapp.com/avatars/${presenceData.discord_user.id}/${presenceData.discord_user.avatar}.webp?size=40`;

		lanyardAvatar.onerror = () => {
			lanyardAvatar.src = `https://api.dicebear.com/6.x/initials/svg?seed=BlueSkye&backgroundColor=039be5,00acc1,1e88e5,3949ab&backgroundType=gradientLinear&randomizeIds=true`;
		};
		lanyardUsername.innerHTML = "@" + presenceData.discord_user.username;
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
