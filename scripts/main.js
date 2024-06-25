// Made by Hamza Nasher-Alneam
// Last remembered to change this label Jun 25 2024
// ==========================================
// Init and save
// ==========================================

// Check if there is a local save, if so read it
if (localStorage.getItem("activityLogSave")) {
   activeSaveData = JSON.parse(localStorage.getItem("activityLogActiveSave"));
   activeTask = activeSaveData.activeTask;
   isActiveTask = activeSaveData.isActiveTask;
   if (isActiveTask) setActivity(activeTask, true);

   activities = JSON.parse(localStorage.getItem("activityLogSave"));
   settings = JSON.parse(localStorage.getItem("activityLogSettingsSave"));
   reinit();
} else {
   activities = [];
   settings = settingsInit;
}

// Collapse settings
function saveCollapseSettings() {
   let collapseoption = document.querySelector("input[name='collapsesettings']:checked").value;
   settings.collapse = collapseoption;
   saveSettings();
}


// ==========================================
// Suggestions
// ==========================================

// generateSuggestions();


// ==========================================
// Stats
// ==========================================

function refreshChart() {
   updateChartValues();
   chart.data.labels = labels;
   chart.data.datasets[0].data = sumNestedArrays(data);
   chart.data.datasets[0].backgroundColor = generateColorArray(labels.length);
   chart.update();
}

function updateStats() {
   avgActivityTime();
   refreshChart();
}


// ==========================================
// Other Functions
// ==========================================

function randomColor() {
   return "#" + Math.floor(Math.random() * 2 ** 24).toString(16).padStart(6, 0);
}

function generateColorArray(length) {
   let colors = [];
   for (let i = 0; i < length; i++) {
      colors.push(randomColor());
   }
   return colors;
}