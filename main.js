let activities = [];



function textentered() {
   if (document.querySelector(".newActivity").value !== "")  document.querySelector(".newActivityBtn").disabled = false;
   else if (document.querySelector(".newActivity").value == "") document.querySelector(".newActivityBtn").disabled = true;
}

// Testing only
document.querySelector(".newActivity").value = "Test Activity #1!";
newActivity();
// Normal stuff now

function restartActivity(activity) {
   document.querySelector(".newActivity").value = activity;
   newActivity();
}

function newActivity() {
   let activityName = document.querySelector(".newActivity").value;
   document.querySelector(".newActivity").value = "";
   let activity = activities.push([activityName, "length", "state"]);
   document.querySelector(".activityProgressing").textContent = "Activites progressing...";
   // Activity parent
   let element = document.createElement("DIV");
   element.classList.add(`a${activities.indexOf(activity)}`);
   element.classList.add("activity");
   // Activity Name
   let elName = document.createElement("P");
   elName.classList.add(`an${activities.indexOf(activity)}`);
   elName.textContent = activityName;
   element.appendChild(elName);
   // Counter
   let elCount = document.createElement("SPAN");
   elCount.classList.add(`ac${activities.indexOf(activity)}`);
   element.appendChild(elCount);
   // Controls
   let controls = document.createElement("DIV");
   controls.classList.add("controls");
   element.appendChild(controls);
   // Pause button
   let elPause = document.createElement("SPAN");
   elPause.classList.add("pauseActivity");
   elPause.classList.add(`ap${activities.indexOf(activity)}`);
   elPause.innerHTML = "||";
   elPause.onclick = () => {
      if (intervalRunning) {
         clearInterval(timerRun);
         intervalRunning = false;
         elPause.innerHTML = "|>";
      }
      else {
         startInterval();
         intervalRunning = true;
         elPause.innerHTML = "||";
      }
   }
   controls.appendChild(elPause);
   // Finish button
   let elFinish = document.createElement("SPAN");
   elFinish.classList.add("finishActivity");
   elFinish.classList.add(`af${activities.indexOf(activity)}`);
   elFinish.innerHTML = "./";
   elFinish.onclick = () => {
      // Pause timer
      clearInterval(timerRun);
      intervalRunning = false;
      // Move element
      let newActivity = element;
      element.remove();
      document.querySelector(".activitiesCompleted").textContent = "";
      document.querySelector(".completedActivities").append(newActivity);
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
      elRestart.innerHTML = "&";
      elRestart.onclick = () => restartActivity(activityName);
      controls.appendChild(elRestart);
   }
   controls.appendChild(elFinish);
   // Remove button
   let elRemove = document.createElement("SPAN");
   elRemove.classList.add("cancelActivity");
   elRemove.classList.add(`ar${activities.indexOf(activity)}`);
   elRemove.innerHTML = "X";
   elRemove.onclick = () => {
      clearInterval(timerRun);
      element.remove();
   }
   controls.appendChild(elRemove);

   // Add activity to page
   document.querySelector(".activitiesProgressing").appendChild(element);
   
   // Timer
   let timer = 0;
   let timerRun;
   startInterval();
   let intervalRunning = true;
   function startInterval() {
      timerRun = setInterval(() => {
         let seconds = Math.round(10 * (timer += .1))/10;
         let minutes = Math.floor(seconds/60);
         seconds = Math.round(10 * (seconds -= minutes * 60))/10;
         if (minutes > 0) elCount.textContent = minutes + " minute(s) and " + seconds + " seconds";
         else elCount.textContent = seconds + " second(s)";
      }, 100);
   }
}

// Save
// Total task time

// == Later ==
// Recommend commenly used tasks based on time and location