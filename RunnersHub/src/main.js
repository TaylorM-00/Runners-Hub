import './style.css'
import { createMapPage, initializeMapPage } from './pages/map.js'
import { createAboutPage, initializeAboutPage } from './pages/about.js'
import { createChecklistPage, initializeChecklistPage, loadChecklistData } from './pages/checklist.js'

// Page components
const pages = {
  map: {
    create: createMapPage,
    init: initializeMapPage
  },
  about: {
    create: createAboutPage,
    init: initializeAboutPage
  },
  checklist: {
    create: createChecklistPage,
    init: initializeChecklistPage
  }
};

// Current active page
let currentPage = 'map';

// Initialize the app
document.querySelector('#app').innerHTML = `
  <div>
    <header>
      <h1>Runners Hub</h1>
      <nav class="navbar">
        <ul>
          <li><a href="#map" class="nav-tab active" data-tab="map">Map</a></li>
          <li><a href="#about" class="nav-tab" data-tab="about">About Me</a></li>
          <li><a href="#checklist" class="nav-tab" data-tab="checklist">Checklist</a></li>
        </ul>
      </nav>
    </header>
    
    <main>
      <div id="content">
        <!-- Page content will be loaded here -->
      </div>
    </main>
  </div>
`;

// Function to load a page
function loadPage(pageName) {
  const contentContainer = document.getElementById('content');
  
  if (pages[pageName]) {
    // Clear current content
    contentContainer.innerHTML = '';
    
    // Create and insert new page content
    contentContainer.innerHTML = pages[pageName].create();
    
    // Initialize page-specific functionality
    pages[pageName].init();
    
    // Special handling for checklist page to load saved data
    if (pageName === 'checklist') {
      loadChecklistData();
    }
    
    currentPage = pageName;
  }
}

// Tab switching functionality
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav-tab')) {
    e.preventDefault()
    
    // Remove active class from all tabs
    document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'))
    
    // Add active class to clicked tab
    e.target.classList.add('active')
    
    // Load the corresponding page
    const tabName = e.target.getAttribute('data-tab')
    loadPage(tabName)
  }
});

// Load the initial page (map)
loadPage('map');
