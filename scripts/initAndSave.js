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
   if (settings.collapse) document.querySelector(`#${settings.collapse}`).checked = true;
}

function clearSave() {
   if (confirm("Are you sure you want to delete your save?")) {
      activities = [];
      localStorage.setItem("activityLogSave", JSON.stringify(activities));
      localStorage.setItem("activityLogActiveSave", null);
      location.reload();
   }
}

// should export all of save, settings included!
function exportSave() {
   let txt = document.querySelector(".exportdata");
   txt.value = JSON.stringify(activities);
   txt.select();
   txt.setSelectionRange(0, 99999); // For mobile
   navigator.clipboard.writeText(txt.value);
   alert("Data saved to clipboard!");
}

function importSave() {
   if (confirm("This will delete your current save. Are you sure?")) {
      let inputTxt = prompt("Enter save...");
      activities = JSON.parse(inputTxt);
      location.reload();
   }
}