// Made by Hamza Nasher-Alneam
// Last edited Jun 23 2024
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

// updateChartValues();

// setInterval(() => {
//    updateChartValues();
//    chart.data.labels = labels;
//    chart.data.datasets[0].data = data;
//    chart.update();
// }, 2000);

// // Avg activity time
// avgActivityTime();
// setInterval(avgActivityTime, 2000);


// ==========================================
// Other Functions
// ==========================================

let randomColor = "#" + Math.floor(Math.random() * 2 ** 24).toString(16).padStart(6, 0);
