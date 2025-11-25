// Map page component
export function createMapPage() {
  return `
    <div id="map-content" class="tab-content active">
      <h2>Running Routes Map</h2>
      <div class="map-section">
        <p>Your running routes and maps will be displayed here.</p>
        
        <div class="map-placeholder">
          <div class="map-box">
            <h3>🗺️ Interactive Map Coming Soon</h3>
            <p>This is where you can:</p>
            <ul>
              <li>View your running routes</li>
              <li>Track your favorite paths</li>
              <li>Discover new running trails</li>
              <li>Share routes with other runners</li>
            </ul>
          </div>
        </div>
        
        <div class="quick-routes">
          <h3>Quick Routes</h3>
          <div class="route-grid">
            <div class="route-card">
              <h4>Morning Jog</h4>
              <p>3.5 miles • Park Loop</p>
            </div>
            <div class="route-card">
              <h4>Evening Run</h4>
              <p>5.2 miles • Downtown Circuit</p>
            </div>
            <div class="route-card">
              <h4>Weekend Long Run</h4>
              <p>10 miles • Trail Adventure</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Map-specific functionality
export function initializeMapPage() {
  // Add any map-specific event listeners or initialization here
  console.log('Map page initialized');
  
  // Example: Add click handlers for route cards
  const routeCards = document.querySelectorAll('.route-card');
  routeCards.forEach(card => {
    card.addEventListener('click', () => {
      console.log('Route selected:', card.querySelector('h4').textContent);
      // Add your route selection logic here
    });
  });
}