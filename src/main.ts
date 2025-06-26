import './style.css'
import githubLogo from '/github-mark-white.svg'
import kofiLogo from '/kofi-logo.svg'
import profilePic from '/vite.svg'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="container">
    <header class="header">
      <div class="header-content">
        <div class="profile-info">
          <img src="${profilePic}" class="profile-pic" alt="Profile picture" />
          <div>
            <h2>Welcome to my very cute website</h2>
          </div>
        </div>
        <div class="social-links">
          <a href="https://github.com/Tiliboyy" target="_blank" class="social-link">
            <img src="${githubLogo}" class="logo" alt="Github logo" />
            <span>GitHub</span>
          </a>
          <a href="https://ko-fi.com/tiliboyy" target="_blank" class="social-link">
            <img src="${kofiLogo}" class="logo kofi" alt="Ko-fi logo" />
            <span>Support me on Ko-fi</span>
          </a>
        </div>
      </div>
    </header>

    <div class="content">
      <div class="cat-container">
        <div class="button-container">
          <button id="fetch-cat" class="cat-button">😺</button>
          <button id="fetch-meme" class="meme-button">🤣</button>
        </div>
        <div id="cat-image-container" class="cat-image-container"></div>
      </div>
    </div>
  </div>
`

// Function to fetch a random cat image
async function fetchCatImage() {
  try {
    const response = await fetch('https://api.thecatapi.com/v1/images/search');
    const data = await response.json();
    return data[0].url;
  } catch (error) {
    console.error('Error fetching cat image:', error);
    return null;
  }
}

// Function to fetch a random meme image
async function fetchMemeImage() {
  try {
    const response = await fetch('https://meme-api.com/gimme');
    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Error fetching meme image:', error);
    return null;
  }
}

// Function to display an image
function displayImage(imageUrl: string, altText: string) {
  const container = document.getElementById('cat-image-container');
  if (!container) return;

  // Clear previous content
  container.innerHTML = '';

  // Create image element
  const img = document.createElement('img');
  img.src = imageUrl;
  img.alt = altText;
  img.className = 'cat-image';

  // Create remove button
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.className = 'remove-button';
  removeButton.addEventListener('click', () => {
    container.innerHTML = '';
  });

  // Append elements to container
  container.appendChild(img);
  container.appendChild(removeButton);
}

// Add event listeners to the fetch buttons
document.addEventListener('DOMContentLoaded', () => {
  // Cat button event listener
  const fetchCatButton = document.getElementById('fetch-cat');
  if (fetchCatButton) {
    fetchCatButton.addEventListener('click', async () => {
      const imageUrl = await fetchCatImage();
      if (imageUrl) {
        displayImage(imageUrl, 'Random cat image');
      }
    });
  }

  // Meme button event listener
  const fetchMemeButton = document.getElementById('fetch-meme');
  if (fetchMemeButton) {
    fetchMemeButton.addEventListener('click', async () => {
      const imageUrl = await fetchMemeImage();
      if (imageUrl) {
        displayImage(imageUrl, 'Random meme image');
      }
    });
  }
});
