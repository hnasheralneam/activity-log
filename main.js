// ==========================================
// Init and save
// ==========================================

let activities = [];

if (localStorage.getItem("activitytrackersave")) {
   activities = JSON.parse(localStorage.getItem("activitytrackersave"));
   reinit();
}
else { activities = [] };

let save = setInterval(() => {
   localStorage.setItem("activitytrackersave", JSON.stringify(activities));
}, 500);

function reinit() {
   activities.forEach((el, i, arr) => {
      createActivity(el[0], i);
   });
}

// ==========================================
// Tasks
// ==========================================

// When entering tasks
function textentered() {
   if (document.querySelector(".newActivity").value !== "")  document.querySelector(".newActivityBtn").disabled = false;
   else if (document.querySelector(".newActivity").value == "") document.querySelector(".newActivityBtn").disabled = true;
}

// For from save
function restartActivity(activity) {
   document.querySelector(".newActivity").value = activity;
   newActivity();
}

// Only when making a new actity
function newActivity() {
   let activityName = document.querySelector(".newActivity").value;
   document.querySelector(".newActivity").value = "";
   let activity = activities.push([activityName, "time", "working", true]) - 1;
   document.querySelector(".activityProgressing").textContent = "Activites progressing...";
   createActivity(activityName, activity);
}

// Recreates or creates a task
function createActivity(activityName, activity) {
   // Activity parent
   let element = document.createElement("DIV");
   element.classList.add("activity");
   // Activity Name
   let elName = document.createElement("P");
   elName.textContent = activityName;
   element.appendChild(elName);
   // Counter
   let elCount = document.createElement("SPAN");
   element.appendChild(elCount);
   // Controls
   let controls = document.createElement("DIV");
   controls.classList.add("controls");
   element.appendChild(controls);
   // Pause button
   let elPause = document.createElement("SPAN");
   elPause.classList.add("pauseActivity");
   // Check if paused before styling
   if (activities[activity][3]) elPause.innerHTML = "<span class='material-symbols-rounded'>pause</span>";
   else elPause.innerHTML = "<span class='material-symbols-rounded'>play_arrow</span>";
   elPause.onclick = () => {
      if (activities[activity][3]) {
         clearInterval(timerRun);
         activities[activity][3] = false;
         elPause.innerHTML = "<span class='material-symbols-rounded'>play_arrow</span>";
      }
      else {
         startInterval();
         activities[activity][3] = true;
         elPause.innerHTML = "<span class='material-symbols-rounded'>pause</span>";
      }
   }
   controls.appendChild(elPause);
   // Finish button
   let elFinish = document.createElement("SPAN");
   elFinish.classList.add("finishActivity");
   elFinish.innerHTML = "<span class='material-symbols-rounded'>done</span>";
   elFinish.onclick = () => { finishActivity(); }
   controls.appendChild(elFinish);
   // Remove button
   let elRemove = document.createElement("SPAN");
   elRemove.classList.add("cancelActivity");
   elRemove.innerHTML = "<span class='material-symbols-rounded'>close</span>";
   elRemove.onclick = () => {
      clearInterval(timerRun);
      element.remove();
      
      let spliced = activities.splice(activity, 1);
   }
   controls.appendChild(elRemove);

   // Add activity to page
   document.querySelector(".activitiesProgressing").appendChild(element);
      
   // Timer
   let timer;
   if (activities[activity][1] == "time") timer = 0;
   else timer = activities[activity][1];
   let timerRun;
   let intervalRunning = activities[activity][3];
   // Before starting timer, check if activity is finished
   if (activities[activity][2] == "complete") finishActivity();
   else if (activities[activity][3] == false) {
      // Display time, but do not continue interval
      activities[activity][1] = timer; 
      let seconds = Math.round(10 * (timer += .1))/10;
      let minutes = Math.floor(seconds/60);
      seconds = Math.round(10 * (seconds -= minutes * 60))/10;
      if (minutes > 0) elCount.textContent = minutes + " minute(s) and " + seconds + " seconds";
      else elCount.textContent = seconds + " second(s)";
   }
   else {
      startInterval();
      activities[activity][3] = true;
   }
   function startInterval() {
      timerRun = setInterval(() => {
         activities[activity][1] = Math.round(10 * timer)/10; 
         let seconds = Math.round(10 * (timer += .1))/10;
         let minutes = Math.floor(seconds/60);
         seconds = Math.round(10 * (seconds -= minutes * 60))/10;
         if (minutes > 0) elCount.textContent = minutes + " minute(s) and " + seconds + " seconds";
         else elCount.textContent = seconds + " second(s)";
      }, 100);
   }

   function finishActivity() {
      // Pause timer
      clearInterval(timerRun);
      activities[activity][3] = false;
      // Move element
      let newActivity = element;
      element.remove();
      document.querySelector(".activitiesCompleted").textContent = "";
      document.querySelector(".completedActivities").append(newActivity);
      // Set state as complete
      activities[activity][2] = "complete";
      // Check if no tasks running
      if (!document.querySelector(".activitiesProgressing").firstChild) document.querySelector(".activityProgressing").textContent = "No tasks in progress";
      
      // Remove old controls
      elPause.remove();
      elFinish.remove();
      elRemove.remove();
      // Add new controls
      // Start again button
      let elRestart = document.createElement("SPAN");
      elRestart.classList.add("continueActivity");
      elRestart.classList.add(`ar${activities.indexOf(activity)}`);
      elRestart.innerHTML = "<span class='material-symbols-rounded'>replay</span>";
      elRestart.onclick = () => restartActivity(activityName);
      controls.appendChild(elRestart);
      
      // Set time if from save
      elCount.textContent = formatTime(timer);
   }
}

// ==========================================
// Stats
// ==========================================

const ctx = document.getElementById("myChart");

let labels = [];
let data = [];
updateChartValues();

let chart = new Chart(ctx, {
   type: "doughnut",
   data: {
      labels: labels,
      datasets: [{
         label: "seconds",
         data: data,
      }]
   }
});

setInterval(() => {
   updateChartValues();
   chart.data.labels = labels;
   chart.data.datasets[0].data = data;
   chart.update();
}, 2000);

function updateChartValues() {
   labels = [];
   data = [];
   activities.forEach((el, i) => {
      if (el[2] == "complete") {
         if ((labels.findIndex((name) => name == el[0])) != -1) {
            data[labels.findIndex((name) => name == el[0])] += el[1];
         }
         else {
            labels.push(el[0]);
            data.push(el[1]);
         }
      }
   });
}

// Avg activity time
setInterval(() => {
   document.querySelector(".avgtime").innerHTML = "";
   labels = [];
   data = [];
   activities.forEach((el, i) => {
      if (el[2] == "complete") {
         if ((labels.findIndex((name) => name == el[0])) != -1) {
            data[labels.findIndex((name) => name == el[0])].push(el[1]);
         }
         else {
            labels.push(el[0]);
            data.push([el[1]]);
         }
      }
   });
   for (i in labels) {
      let element = document.createElement("DIV");
      element.classList.add("avgtimeblock");
      let taskName = document.createElement("P");
      taskName.textContent = labels[i];
      let taskAvg = document.createElement("P");
      const average = array => array.reduce((a, b) => a + b) / array.length;
      taskAvg.textContent = formatTime(Math.round(10 * average(data[i])) / 10);
      element.append(taskName);
      element.append(taskAvg);
      document.querySelector(".avgtime").append(element);
   }
}, 2000);

// ==========================================
// Superfluous Functions
// ==========================================

function formatTime(timeInSeconds) {
   let seconds = Math.round(10 * (timeInSeconds += .1))/10;
   let minutes = Math.floor(seconds/60);
   let hours = Math.floor(minutes/60);
   seconds = Math.round(10 * (seconds -= minutes * 60))/10;
   minutes = Math.round(10 * (minutes -= hours * 60))/10;
   if (hours > 0) return `${hours} hour${hours != 1 ? "s" : ""} and ${minutes} minute${minutes != 1 ? "s" : ""}`;
   else if (minutes > 0) return `${minutes} minute${minutes != 1 ? "s" : ""} and ${seconds} second${seconds != 1 ? "s" : ""}`;
   else if (seconds == 1) return seconds + " second";
   else return `${seconds}  second${seconds != 1 ? "s" : ""}`;
}

// ==========================================
// Ideas and Plans
// ==========================================

// On reload, it resets 'task progressing' text
// Setting to continue tasks when tab is closed
// Total task time
// Enter to start task
// Usual time on each task
// Recommend commonly used tasks based on time and location
// Clear cache option
// Group tasks by catogory
// Option that adding new tasks completes previous (for one-direction workflow)
// Overlap completed cards with summary
// Import/export