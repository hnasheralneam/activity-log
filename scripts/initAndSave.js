let activeTask;
let isActiveTask = false;

let activities = [];

let settingsInit = {
   runWhileClosed: false,
   oneTaskWorkflow: false,
   lastTick: Date.now(),
   collapse: "short"
};
let settings = settingsInit;

// Stats vars
let labels = [];
let data = [];

function reinit() {
   updateStats();
   for (let i = 0; i < activities.length; i++) {
      addCompletedActivity(activities[i]);
   }
}


// Get elements for activity management
let activeTaskElement = document.querySelector(".active-activity");
let activityRunningElement = document.querySelector(".activityProgressing");
let controlButtons = document.querySelector(".controls");
let pauseButton = document.querySelector(".control-pause");
let finishButton = document.querySelector(".control-finish");
let cancelButton = document.querySelector(".control-cancel");




// Save
function saveActive() {
   localStorage.setItem("activityLogActiveSave", JSON.stringify({
      isActiveTask: isActiveTask,
      activeTask: activeTask
   }));
}

function saveActivites() {
   localStorage.setItem("activityLogSave", JSON.stringify(activities));
}

function saveSettings() {
   localStorage.setItem( "activityLogSettingsSave", JSON.stringify(settings));
}



// Settings
function clearSave() {
   if (confirm("Are you sure you want to delete your save?")) {
      activities = [];
      activeTask = {};
      isActiveTask = false;
      settings = settingsInit;
      saveActive();
      saveActivites();
      saveSettings();
      location.reload();
   }
}

// should export all of save, settings included!
function exportSave() {
   let txt = document.querySelector(".exportdata");

   let saveData = {
      settings: settings,
      activities: activities,
      activeTask: activeTask,
      isActiveTask: isActiveTask
   }

   txt.value = JSON.stringify(saveData);
   txt.select();
   txt.setSelectionRange(0, 99999); // For mobile
   navigator.clipboard.writeText(txt.value);
   alert("Data saved to clipboard!");
}

function importSave() {
   if (confirm("This will delete your current save. Are you sure?")) {
      let input = prompt("Enter save...");
      let saveData = JSON.parse(input);
      settings = saveData.settings;
      activities = saveData.activities;
      activeTask = saveData.activeTask;
      isActiveTask = saveData.isActiveTask;
      location.reload();
   }
}