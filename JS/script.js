const apiKey = "aWLvikLl3S4vpRzaOj833VdFbE3jRTZS";

async function searchGIF() {
  const query = document.getElementById("searchInput").value;
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=10&rating=g`;

  try {
    const response = await fetch(url);
    const result = await response.json();
    const gifs = result.data;

    const gifContainer = document.getElementById("gifContainer");
    gifContainer.innerHTML = "";

    gifs.forEach(gif => {
      const img = document.createElement("img");
      img.src = gif.images.fixed_height.url;
      gifContainer.appendChild(img);
    });
    //save search word into history.
    saveHistory(query);
  } catch (error) {
    console.error("Failed to fetch GIFs:", error);
  }
}

async function getAdvice() {
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();
    document.getElementById("adviceText").textContent = `"${data.slip.advice}"`;
  }

  getAdvice();
  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
  }

  window.onload = async function () {
  const url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=10&rating=g`;
  const response = await fetch(url);
  const result = await response.json();
  displayGIFs(result.data);
};

function displayGIFs(gifs) {
  const gifContainer = document.getElementById("gifContainer");
  gifContainer.innerHTML = "";
  gifs.forEach(gif => {
  const div = document.createElement("div");
  const img = document.createElement("img");
  img.src = gif.images.fixed_height.url;

  const downloadLink = document.createElement("a");
  downloadLink.href = gif.images.original.url;
  downloadLink.download = "giphy.gif";
  downloadLink.textContent = "Download";
  downloadLink.target = "_blank";

  div.appendChild(img);
  div.appendChild(downloadLink);
  gifContainer.appendChild(div);
  });
}

//function to store new search history
function saveHistory(newHistory){
  //get search histories stored in local storage. If it's empty, set history as an empty list.
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  //if search history list doesn't contain new entry, append the list and slice from index 0 to 5. 
  if(!history.includes(newHistory)){
    history.unshift(newHistory);
    history = history.slice(0, 5);
    //store the new search history list to local storage.
    localStorage.setItem("searchHistory", JSON.stringify(history));
  }
  //display new search history
  displayHistory();
}

function displayHistory(){
  //get search histories stored in local storage. If it's empty, set history as an empty list.
  const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  //get history container element
  const historyContainer = document.getElementById("historyContainer");
  //set history container innerHTML as null.
  historyContainer.innerHTML = "";
  //create new buttons of each search history
  history.forEach(item => {
    //create new button
    const button = document.createElement("button");
    //set button text as a history name.
    button.textContent = item;
    //function to search gif by history name when the button is clicked.
    button.onclick = () => {
      document.getElementById("searchInput").value = item;
      searchGIF();
    };
    //append history container.
    historyContainer.appendChild(button);
  });
}