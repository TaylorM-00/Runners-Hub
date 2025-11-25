// Checklist page component
export function createChecklistPage() {
  return `
    <div id="checklist-content" class="tab-content">
      <h2>Running Checklist</h2>
      <div class="checklist-section">
        
        <div class="daily-goals">
          <h3>Daily Goals</h3>
          <div class="checklist-container">
            <div class="checklist-item">
              <input type="checkbox" id="morning-stretch" class="checkbox">
              <label for="morning-stretch">Morning stretch routine</label>
            </div>
            <div class="checklist-item">
              <input type="checkbox" id="hydration" class="checkbox">
              <label for="hydration">Drink 8 glasses of water</label>
            </div>
            <div class="checklist-item">
              <input type="checkbox" id="daily-run" class="checkbox">
              <label for="daily-run">Complete daily run</label>
            </div>
            <div class="checklist-item">
              <input type="checkbox" id="cool-down" class="checkbox">
              <label for="cool-down">Cool-down exercises</label>
            </div>
          </div>
        </div>

        <div class="weekly-goals">
          <h3>Weekly Goals</h3>
          <div class="checklist-container">
            <div class="checklist-item">
              <input type="checkbox" id="long-run" class="checkbox">
              <label for="long-run">Complete long run (10+ miles)</label>
            </div>
            <div class="checklist-item">
              <input type="checkbox" id="speed-work" class="checkbox">
              <label for="speed-work">Speed training session</label>
            </div>
            <div class="checklist-item">
              <input type="checkbox" id="cross-training" class="checkbox">
              <label for="cross-training">Cross-training activity</label>
            </div>
            <div class="checklist-item">
              <input type="checkbox" id="rest-day" class="checkbox">
              <label for="rest-day">Take at least one rest day</label>
            </div>
          </div>
        </div>

        <div class="gear-checklist">
          <h3>Pre-Run Gear Check</h3>
          <div class="checklist-container">
            <div class="checklist-item">
              <input type="checkbox" id="running-shoes" class="checkbox">
              <label for="running-shoes">Running shoes checked</label>
            </div>
            <div class="checklist-item">
              <input type="checkbox" id="water-bottle" class="checkbox">
              <label for="water-bottle">Water bottle filled</label>
            </div>
            <div class="checklist-item">
              <input type="checkbox" id="phone-charged" class="checkbox">
              <label for="phone-charged">Phone charged</label>
            </div>
            <div class="checklist-item">
              <input type="checkbox" id="weather-check" class="checkbox">
              <label for="weather-check">Weather checked</label>
            </div>
            <div class="checklist-item">
              <input type="checkbox" id="route-planned" class="checkbox">
              <label for="route-planned">Route planned</label>
            </div>
          </div>
        </div>

        <div class="custom-tasks">
          <h3>Custom Tasks</h3>
          <div class="custom-tasks-container">
            <div class="add-task-section">
              <input type="text" id="new-task-input" placeholder="Add a new task..." class="task-input">
              <button id="add-task-btn" class="add-task-btn">Add Task</button>
            </div>
            <div id="custom-tasks-list" class="checklist-container">
              <!-- Custom tasks will be added here -->
            </div>
          </div>
        </div>

        <div class="progress-section">
          <h3>Today's Progress</h3>
          <div class="progress-bar">
            <div class="progress-fill" id="progress-fill"></div>
          </div>
          <p class="progress-text">
            <span id="completed-tasks">0</span> of <span id="total-tasks">0</span> tasks completed
          </p>
          <button id="reset-daily-btn" class="reset-btn">Reset Daily Tasks</button>
        </div>
      </div>
    </div>
  `;
}

// Checklist page-specific functionality
export function initializeChecklistPage() {
  console.log('Checklist page initialized');
  
  // Initialize task tracking
  updateProgress();
  
  // Add event listeners for checkboxes
  const checkboxes = document.querySelectorAll('.checkbox');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', handleTaskChange);
  });
  
  // Add task functionality
  const addTaskBtn = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('new-task-input');
  
  if (addTaskBtn && taskInput) {
    addTaskBtn.addEventListener('click', addCustomTask);
    taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addCustomTask();
      }
    });
  }
  
  // Reset daily tasks
  const resetBtn = document.getElementById('reset-daily-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetDailyTasks);
  }
}

// Handle checkbox changes
function handleTaskChange(event) {
  updateProgress();
  
  // Save checkbox states to localStorage
  const checkboxStates = {};
  document.querySelectorAll('.checkbox').forEach(cb => {
    checkboxStates[cb.id] = cb.checked;
  });
  localStorage.setItem('checkboxStates', JSON.stringify(checkboxStates));
}

// Add custom task
function addCustomTask() {
  const taskInput = document.getElementById('new-task-input');
  const taskText = taskInput.value.trim();
  
  if (taskText) {
    const customTasksList = document.getElementById('custom-tasks-list');
    const taskId = 'custom-task-' + Date.now();
    
    const taskElement = document.createElement('div');
    taskElement.className = 'checklist-item';
    taskElement.innerHTML = `
      <input type="checkbox" id="${taskId}" class="checkbox">
      <label for="${taskId}">${taskText}</label>
      <button class="delete-task-btn" onclick="deleteTask('${taskId}')">×</button>
    `;
    
    customTasksList.appendChild(taskElement);
    
    // Add event listener to new checkbox
    const newCheckbox = document.getElementById(taskId);
    newCheckbox.addEventListener('change', handleTaskChange);
    
    // Clear input
    taskInput.value = '';
    
    // Update progress
    updateProgress();
    
    // Save custom tasks
    saveCustomTasks();
  }
}

// Delete custom task
window.deleteTask = function(taskId) {
  const taskElement = document.getElementById(taskId).parentElement;
  taskElement.remove();
  updateProgress();
  saveCustomTasks();
};

// Update progress bar and count
function updateProgress() {
  const checkboxes = document.querySelectorAll('.checkbox');
  const checkedBoxes = document.querySelectorAll('.checkbox:checked');
  
  const total = checkboxes.length;
  const completed = checkedBoxes.length;
  const percentage = total > 0 ? (completed / total) * 100 : 0;
  
  const progressFill = document.getElementById('progress-fill');
  const completedTasksSpan = document.getElementById('completed-tasks');
  const totalTasksSpan = document.getElementById('total-tasks');
  
  if (progressFill) progressFill.style.width = percentage + '%';
  if (completedTasksSpan) completedTasksSpan.textContent = completed;
  if (totalTasksSpan) totalTasksSpan.textContent = total;
}

// Reset daily tasks
function resetDailyTasks() {
  const dailyCheckboxes = document.querySelectorAll('.daily-goals .checkbox');
  dailyCheckboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
  updateProgress();
  localStorage.removeItem('checkboxStates');
}

// Save custom tasks to localStorage
function saveCustomTasks() {
  const customTasks = [];
  const customTaskElements = document.querySelectorAll('#custom-tasks-list .checklist-item');
  
  customTaskElements.forEach(element => {
    const checkbox = element.querySelector('.checkbox');
    const label = element.querySelector('label');
    customTasks.push({
      id: checkbox.id,
      text: label.textContent,
      checked: checkbox.checked
    });
  });
  
  localStorage.setItem('customTasks', JSON.stringify(customTasks));
}

// Load saved data
export function loadChecklistData() {
  // Load checkbox states
  const savedStates = localStorage.getItem('checkboxStates');
  if (savedStates) {
    const states = JSON.parse(savedStates);
    Object.keys(states).forEach(id => {
      const checkbox = document.getElementById(id);
      if (checkbox) {
        checkbox.checked = states[id];
      }
    });
  }
  
  // Load custom tasks
  const savedTasks = localStorage.getItem('customTasks');
  if (savedTasks) {
    const tasks = JSON.parse(savedTasks);
    const customTasksList = document.getElementById('custom-tasks-list');
    
    tasks.forEach(task => {
      const taskElement = document.createElement('div');
      taskElement.className = 'checklist-item';
      taskElement.innerHTML = `
        <input type="checkbox" id="${task.id}" class="checkbox" ${task.checked ? 'checked' : ''}>
        <label for="${task.id}">${task.text}</label>
        <button class="delete-task-btn" onclick="deleteTask('${task.id}')">×</button>
      `;
      
      customTasksList.appendChild(taskElement);
      
      // Add event listener
      const checkbox = document.getElementById(task.id);
      checkbox.addEventListener('change', handleTaskChange);
    });
  }
  
  updateProgress();
}