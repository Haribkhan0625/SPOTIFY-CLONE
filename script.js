console.log("Lets write javacsript");

async function getSongs() {
  let a = await fetch("http://127.0.0.1:5500/spotify%20clone/songs/");
  let response = await a.text();
  console.log(response);
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/songs/")[1]);
    }
  }
  return songs;
}
const playMusic = (track) => {
  let audio = new Audio("/songs/" + track)
  audio.play()
}

async function main() {

  let currentSong;
  // get the list of all songs
  let songs = await getSongs();

  // Show all the songs in the playlist
  let songUL = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];
  for (const song of songs) {
    songUL.innerHTML =
      songUL.innerHTML +
      ` <li> 
         <img class="invert" src="music.svg" alt="">
         <div class="info">
             <div>${song.replaceAll("%20", "  ")}</div>
             <div>Harib</div>
         </div>
         <div class="playnow">
             <span>Play Now</span>
             <img class="invert"src="play.svg" alt="">
         </div>
        </li>`;
  }

  //Attach an event Listner to each song 
  Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click", () => {
      console.log(e.querySelector(".info").firstElementChild.innerText)
      playMusic(e.querySelector(".info").firstElementChild.innerText.trim())
      
    })
  })
}

main();
