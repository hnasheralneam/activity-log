// Made by Hamza Nasher-Alneam
// Last edited Jun 23 2024
// ==========================================
// Init and save
// ==========================================

// Get elements for activity management
let activeTaskElement = document.querySelector(".active-activity");
let activityRunningElement = document.querySelector(".activityProgressing");
let controlButtons = document.querySelector(".controls");
let pauseButton = document.querySelector(".control-pause");
let finishButton = document.querySelector(".control-finish");
let cancelButton = document.querySelector(".control-cancel");
let activityLoop;

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

let save = setInterval(() => {
   // should only set on value change, would save a lot of memory
   localStorage.setItem( "activityLogSettingsSave", JSON.stringify(settings));
}, 1500);

function saveActive() {
   localStorage.setItem("activityLogActiveSave", JSON.stringify({
      isActiveTask: isActiveTask,
      activeTask: activeTask
   }));
}

function saveActivites() {
   localStorage.setItem("activityLogSave", JSON.stringify(activities));
}

// Collapse settings
function saveCollapseSettings() {
   let collapseoption = document.querySelector("input[name='collapsesettings']:checked").value;
   settings.collapse = collapseoption;
}

// ==========================================
// Creating activities
// ==========================================

// When entering tasks, to prevent passing in empty string (could do in html)
function textentered() {
   if (document.querySelector(".newActivity").value !== "")
      document.querySelector(".newActivityBtn").disabled = false;
   else if (document.querySelector(".newActivity").value == "")
      document.querySelector(".newActivityBtn").disabled = true;
}

// On enter in input
document.querySelector(".newActivity").addEventListener("keyup", (event) => {
   if (event.key === "Enter" && document.querySelector(".newActivity").value !== "") newActivity();
});

// For from save
function restartActivity(activity) {
   document.querySelector(".newActivity").value = activity;
   setActivity();
}

function newActivity() {
   // Get name
   let activityName = document.querySelector(".newActivity").value;
   document.querySelector(".newActivity").value = "";
   document.querySelector(".newActivityBtn").disabled = true;

   setActivity({
      name: activityName,
      time: 0,
      paused: false,
      start: new Date()
   });
}

// Create a new activity
function setActivity(data, bypassOverrideCheck) {
   if (isActiveTask && !bypassOverrideCheck) {
      if (!okayToOverrideTask()) return;
      finishActivity();
   }

   // Set activtiy data
   isActiveTask = true;
   activeTask = data;

   activityRunningElement.classList.add("hidden");
   activeTaskElement.classList.remove("hidden");

   document.querySelector(".activity-name").textContent = activeTask.name;
   let timeDisplay = document.querySelector(".activity-counter");


   // Reset in case paused task is being reset
   if (activeTask.paused) pauseButton.innerHTML = "<span class='material-symbols-rounded'>play_arrow</span>";
   timeDisplay.textContent = getFormattedTime();

   // Handle pause/unpause
   pauseButton.onclick = () => {
      if (activeTask.paused) {
         activeTask.paused = false;
         pauseButton.innerHTML = "<span class='material-symbols-rounded'>pause</span>";
      } else {
         activeTask.paused = true;
         pauseButton.innerHTML = "<span class='material-symbols-rounded'>play_arrow</span>";
      }
      saveActive();
   };

   finishButton.onclick = finishActivity;
   cancelButton.onclick = cancelActivity;

   let lastTime = new Date();
   activityLoop = setInterval(() => {
      let now = new Date();
      if (!activeTask.paused) {
         activeTask.time += now - lastTime;
         timeDisplay.textContent = getFormattedTime();
         saveActive();
      }
      lastTime = now;
   }, 100);


   function cancelActivity() {
      isActiveTask = false;
      activeTask = {};
      clearInterval(activityLoop);
      activityRunningElement.classList.remove("hidden");
      activeTaskElement.classList.add("hidden");
      saveActive();
   }

   function finishActivity() {
      delete activeTask.pause;
      activities.push(activeTask)
      cancelActivity();
      saveActive();
      saveActivites();
   }


   // be careful with this, because it is used to move items to stats and history
   function oldfinishActivity() {
      // Pause timer
      clearInterval(timerRun);

      // copy element
      let newActivity = element;
      element.remove();
      document.querySelector(".activitiesCompleted").textContent = "";
      // Checks if multiple elements of same task, then collapses
      if (document.querySelector(`._${noSpaces(activityName)}`) && settings.collapse !== "none") {
         if (settings.collapse == "long") {
            let newww = document.createElement("DIV");
            newww.innerHTML = `${formatTime(timer)} <br> 
            Started ${new Date(activities[activity][4]["start"]).toLocaleString()} <br> 
            Finished ${new Date(activities[activity][4]["finish"]).toLocaleString()} <br><br>`;
            document.querySelector(`._${noSpaces(activityName)}`).append(newww);
         } else if (settings.collapse == "short") {
            // If there isn't another summary
            if (document.querySelector(`._short_${noSpaces(activityName)}`) == null) {
               // Remove time for first activity
               document.querySelector(`._${noSpaces(activityName)}`).firstChild.nextSibling.remove();
               // Parent container
               let element = document.createElement("DIV");
               element.classList.add(`_short_${noSpaces(activityName)}`);
               // To get the labels and data
               avgActivityTime();
               // Average time
               let taskAvg = document.createElement("P");
               const average = (array) => array.reduce((a, b) => a + b) / array.length;
               // Find index of label, then find corresponding in data
               let thisIndex = labels.indexOf(activityName);
               taskAvg.innerHTML = `<div class="complete-summary"><span class="material-symbols-rounded completed-activity-summary-icon">avg_time</span><p>Average time: ${formatTime(
                  Math.round(10 * average(data[thisIndex])) / 10
               )}</p></div>`;
               // Total time
               let taskTotal = document.createElement("P");
               const totalTime = (array) => array.reduce((part, a) => part + a, 0);
               taskTotal.innerHTML = `<div class="complete-summary"><span class="material-symbols-rounded completed-activity-summary-icon">timer</span><p>Total time: ${formatTime(
                  totalTime(data[thisIndex])
               )}</p></div>`;
               // Amount of activites
               let activityAmounts = document.createElement("P");
               activityAmounts.innerHTML = `<div class="complete-summary"><span class="material-symbols-rounded completed-activity-summary-icon">numbers</span><p>Activites: ${data[thisIndex].length}</p></div>`;
               // Append items to block
               element.append(taskAvg);
               element.append(taskTotal);
               element.append(activityAmounts);
               document.querySelector(`._${noSpaces(activityName)}`).append(element);
            }
         }
      } else {
         document.querySelector(".completedActivities").append(newActivity);
         newActivity.classList.add(`_${noSpaces(activityName)}`);

         // Remove old controls
         // Add new controls
         // Start again button
         let elRestart = document.createElement("SPAN");
         elRestart.classList.add("continueActivity");
         elRestart.classList.add(`ar${activities.indexOf(activity)}`);
         elRestart.innerHTML =
            "<span class='material-symbols-rounded redo-activty-icon'>replay</span>";
         elRestart.onclick = () => restartActivity(activityName);
         controls.appendChild(elRestart);

         // Set time if from save
         timeDisplay.textContent = formatTime(timer);
         
         // Display start and end times
         timeDisplay.innerHTML = `${timeDisplay.textContent} <br> 
         Started ${new Date(activities[activity][4]["start"]).toLocaleString()} <br> 
         Finished ${new Date(activities[activity][4]["finish"]).toLocaleString()} <br><br>`;
      }
      // Add identifier
      // Set state as complete
      activities[activity][2] = "complete";
      // Check if no tasks running
      if (!document.querySelector(".activitiesProgressing").firstChild) document.querySelector(".activityProgressing").textContent = "No tasks in progress";
   }
}

function okayToOverrideTask() {
   let isSure = confirm("You already have an activity running. Do you want to finish it and start a new one instead?");
   if (isSure) return true;
   return false;
}

function getFormattedTime() {
   var totalSeconds = activeTask.time / 1000;
   var minutes = Math.floor(totalSeconds / 60);
   var seconds = totalSeconds % 60;

   seconds = Math.round(seconds * 10) / 10;

   var result = "";
   if (minutes > 0) {
      result += minutes + " minute" + (minutes !== 1 ? "s" : "") + " " + Math.round(seconds) + " seconds";
   }
   else {
      result += seconds.toFixed(1) + " seconds";
   }

   return result;
}



// ==========================================
// Suggestions
// ==========================================

generateSuggestions();


// ==========================================
// Stats
// ==========================================

updateChartValues();

setInterval(() => {
   updateChartValues();
   chart.data.labels = labels;
   chart.data.datasets[0].data = data;
   chart.update();
}, 2000);

// Avg activity time
avgActivityTime();
setInterval(avgActivityTime, 2000);


// ==========================================
// Other Functions
// ==========================================

function formatTime(timeInSeconds) {
   let seconds = Math.round(10 * (timeInSeconds += 0.1)) / 10;
   let minutes = Math.floor(seconds / 60);
   let hours = Math.floor(minutes / 60);
   seconds = Math.round(10 * (seconds -= minutes * 60)) / 10;
   minutes = Math.round(10 * (minutes -= hours * 60)) / 10;
   if (hours > 0)
      return `${hours} hour${hours != 1 ? "s" : ""} and ${minutes} minute${
         minutes != 1 ? "s" : ""
      }`;
   else if (minutes > 0)
      return `${minutes} minute${
         minutes != 1 ? "s" : ""
      } and ${seconds} second${seconds != 1 ? "s" : ""}`;
   else if (seconds == 1) return seconds + " second";
   else return `${seconds}  second${seconds != 1 ? "s" : ""}`;
}

let randomColor = "#" + Math.floor(Math.random() * 2 ** 24).toString(16).padStart(6, 0);

function noSpaces(txt) {
   // Note that if any of these replacment words are used in the actual activity name, it might cause problems, like considering them the same
   // Suopport these !	#	$	&	'	(	)	*	+	,	/	:	;	=	?	@	[	]
   // A valid name should start with an underscore (_), a hyphen (-) or a letter (a-z) which is followed by any numbers, hyphens, underscores, letters. A name should be at least two characters long. Cannot start with a digit, two hyphens or a hyphen followed by a number.
   return encodeURI(txt.replace(/\s/g, "").replaceAll("!", "nonono").replaceAll("?", "nononono")).replaceAll("%", "WHYCSS").replaceAll(":", "uunununu").replaceAll("(", "oeunen");
}
