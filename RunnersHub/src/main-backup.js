import './style.css'

// Import page modules with error handling
let pages = {};

// Initialize pages object
try {
  const mapModule = await import('./pages/map.js');
  const aboutModule = await import('./pages/about.js');  
  const checklistModule = await import('./pages/checklist.js');
  
  pages = {
    map: {
      create: mapModule.createMapPage,
      init: mapModule.initializeMapPage
    },
    about: {
      create: aboutModule.createAboutPage,
      init: aboutModule.initializeAboutPage
    },
    checklist: {
      create: checklistModule.createChecklistPage,
      init: checklistModule.initializeChecklistPage
    }
  };
  
  console.log('✅ All page modules loaded successfully');
} catch (error) {
  console.error('❌ Error loading page modules:', error);
  
  // Fallback content if modules fail to load
  pages = {
    map: {
      create: () => '<div class="tab-content active"><h2>Map</h2><p>Loading map content...</p></div>',
      init: () => console.log('Map fallback loaded')
    },
    about: {
      create: () => '<div class="tab-content active"><h2>About Me</h2><p>Loading about content...</p></div>',
      init: () => console.log('About fallback loaded')
    },
    checklist: {
      create: () => '<div class="tab-content active"><h2>Checklist</h2><p>Loading checklist content...</p></div>',
      init: () => console.log('Checklist fallback loaded')
    }
  };
}

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
