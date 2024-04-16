var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Initialize the YouTube player
let player;
//const playBtn = document.getElementById("btn-play-video");
const playButtons = document.querySelectorAll(".view-project-icon");
const hytPlayerWrap = document.getElementById("hytPlayerWrap");
const btnClose = document.getElementById("btn-close-modal");
const modal = document.querySelector(".modal");

// Function to create the YouTube player
function createYouTubePlayer(videoId) {
  // Create an <iframe> element with the YouTube video
  const iframe = document.createElement("iframe");
  iframe.id = "youtube-iframe";
  iframe.width = "100%"; // Set the desired width
  iframe.height = "100%"; // Set the desired height
  iframe.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0&controls=0&autoplay=1`;
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowFullscreen = true;

  //const playerContainer = document.getElementById("hytPlayerWrap");
  hytPlayerWrap.appendChild(iframe);

  // Create the YouTube player object
  player = new YT.Player("youtube-iframe", {
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });

  // Show the modal
  modal.style.display = "block";
}

//destroyVideo
function destroyYouTubePlayer() {
  if (player) {
    player.stopVideo();
    player.destroy();
    player = null;
  }

  hytPlayerWrap.innerHTML = "";
  modal.style.display = "none";
}

// Function called when the YouTube player is ready
function onPlayerReady(event) {
  // Example: Play the video when ready
  player.playVideo();
}

// Function called when the YouTube player's state changes
function onPlayerStateChange(event) {
  // Example: Log the state changes

  //console.log("Player State Changed:", event.data);
  if (event.data === -1) {
    hytPlayerWrap.classList.remove("active");
  }
  if (event.data === 0) {
    //ended
    hytPlayerWrap.classList.add("ended");
  }
  if (event.data === 1) {
    //playing
    hytPlayerWrap.classList.add("active");
    hytPlayerWrap.classList.remove("ended");
    hytPlayerWrap.classList.remove("paused");
  }
  if (event.data === 2) {
    //paused
    hytPlayerWrap.classList.add("paused");
  }
}

hytPlayerWrap.addEventListener("click", function () {
  let playerState = player.getPlayerState();

  if (playerState === 0) {
    player.seekTo(0);
  } else if (playerState === 2) {
    player.playVideo();
  }
});

// Button click event to create and play the YouTube video
// Loop through each button to add event listener
playButtons.forEach(function (button) {
  // Add click event listener to each button
  //console.log("playbuttons");
  button.addEventListener("click", function () {
    // Get the 'ytid' attribute value from the clicked button
    const videoId = button.getAttribute("ytid");

    // Call the createYouTubePlayer function with the video ID as parameter
    createYouTubePlayer(videoId);
  });
});

// playBtn.addEventListener("click", function () {
//   createYouTubePlayer("RjLQWPBQykU");
// });

btnClose.addEventListener("click", function () {
  destroyYouTubePlayer();
});

// Event listener for Escape key press
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    destroyYouTubePlayer();
  }
});
