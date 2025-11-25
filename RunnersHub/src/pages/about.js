// About Me page component
export function createAboutPage() {
  return `
    <div id="about-content" class="tab-content">
      <h2>About Me</h2>
      <div class="about-section">
        <div class="profile-section">
          <div class="profile-placeholder">
            <div class="avatar-placeholder">
              <span>👤</span>
            </div>
            <h3>Your Name</h3>
            <p class="runner-title">Passionate Runner</p>
          </div>
        </div>
        
        <div class="bio-section">
          <h3>My Running Journey</h3>
          <p>Welcome to my personal running hub! This is where I track my progress, share my achievements, and plan my running adventures.</p>
          
          <div class="stats-grid">
            <div class="stat-card">
              <h4>Total Distance</h4>
              <p class="stat-number">0</p>
              <span class="stat-unit">miles</span>
            </div>
            <div class="stat-card">
              <h4>Runs Completed</h4>
              <p class="stat-number">0</p>
              <span class="stat-unit">runs</span>
            </div>
            <div class="stat-card">
              <h4>Personal Best</h4>
              <p class="stat-number">--:--</p>
              <span class="stat-unit">5K time</span>
            </div>
            <div class="stat-card">
              <h4>Streak</h4>
              <p class="stat-number">0</p>
              <span class="stat-unit">days</span>
            </div>
          </div>
        </div>
        
        <div class="goals-section">
          <h3>Current Goals</h3>
          <ul class="goals-list">
            <li>🎯 Complete a 5K run</li>
            <li>🎯 Run 3 times per week</li>
            <li>🎯 Improve endurance</li>
          </ul>
          <button class="add-goal-btn">Add New Goal</button>
        </div>
        
        <div class="achievements-section">
          <h3>Achievements</h3>
          <div class="badges-container">
            <div class="badge-placeholder">
              <p>🏆 Your achievements will appear here as you reach your running milestones!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// About page-specific functionality
export function initializeAboutPage() {
  console.log('About page initialized');
  
  // Add goal button functionality
  const addGoalBtn = document.querySelector('.add-goal-btn');
  if (addGoalBtn) {
    addGoalBtn.addEventListener('click', () => {
      const goalText = prompt('Enter your new running goal:');
      if (goalText && goalText.trim()) {
        addNewGoal(goalText.trim());
      }
    });
  }
}

// Function to add a new goal
function addNewGoal(goalText) {
  const goalsList = document.querySelector('.goals-list');
  if (goalsList) {
    const newGoal = document.createElement('li');
    newGoal.textContent = `🎯 ${goalText}`;
    goalsList.appendChild(newGoal);
  }
}

// Function to update stats (you can call this from other parts of your app)
export function updateStats(stats) {
  const statCards = document.querySelectorAll('.stat-card');
  
  if (stats.totalDistance !== undefined) {
    const distanceCard = statCards[0];
    if (distanceCard) {
      distanceCard.querySelector('.stat-number').textContent = stats.totalDistance;
    }
  }
  
  if (stats.runsCompleted !== undefined) {
    const runsCard = statCards[1];
    if (runsCard) {
      runsCard.querySelector('.stat-number').textContent = stats.runsCompleted;
    }
  }
  
  if (stats.personalBest !== undefined) {
    const pbCard = statCards[2];
    if (pbCard) {
      pbCard.querySelector('.stat-number').textContent = stats.personalBest;
    }
  }
  
  if (stats.streak !== undefined) {
    const streakCard = statCards[3];
    if (streakCard) {
      streakCard.querySelector('.stat-number').textContent = stats.streak;
    }
  }
}