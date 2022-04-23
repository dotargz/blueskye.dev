function getJSON(data) {
  const json = data;
  status = json.discord_status;
  statusdiv = document.getElementById("status");
  if (status == "online") {
    statusdiv.innerHTML = '<i class="fa-solid fa-circle" style="color:green;margin-left:1%;"></i> Online';
  }
  else if (status == "offline") {
    statusdiv.innerHTML = '<i class="fa-solid fa-circle-dot" style="color:gray;margin-left:1%;"></i> Offline';
  }
  else if (status == "dnd") {
    statusdiv.innerHTML = '<i class="fa-solid fa-bell-slash" style="color:red;margin-left:1%;"></i> Do Not Disturb';
  }
  else if (status == "idle") {
    statusdiv.innerHTML = '<i class="fa-solid fa-moon" style="color:yellow;margin-left:1%;"></i> Idle';
  }
  console.log(status);
}

lanyard({userId: "788887558478233650"}).then(getJSON)