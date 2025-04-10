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