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
   // Select the right radio button
   // if (settings.collapse) document.querySelector(`#${settings.collapse}`).checked = true;
}


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