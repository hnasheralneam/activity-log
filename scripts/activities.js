// ==========================================
// Creating activities
// ==========================================

let activityLoop;

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

// When you press the run again button in history - does this still work?
function restartActivity(activityName) {
   setActivity({
      name: activityName,
      time: 0,
      paused: false,
      start: new Date()
   });
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


// ==========================================
// Active activity creation and logic
// ==========================================

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
   timeDisplay.textContent = formatTimeAmount(activeTask.time, "yMwdhms", 1);

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
         timeDisplay.textContent = formatTimeAmount(activeTask.time, "yMwdhms", 1);
         saveActive();
      }
      lastTime = now;
   }, 100);

   // Send to main page, for if they were on history
   displayPage("main");
}

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
   activeTask.finish = Date.now();
   activities.push(activeTask)
   cancelActivity();
   saveActive();
   saveActivites();
   updateStats();
   addCompletedActivity(activities[activities.length - 1]);
}

function okayToOverrideTask() {
   let isSure = confirm("You already have an activity running. Do you want to finish it and start a new one instead?");
   if (isSure) return true;
   return false;
}


// ==========================================
// Put completed activties into history and stats
// ==========================================

// be careful with this, because it is used to move items to stats and history
// we will need to run this when a activity is completed as well
// activity is the full item
function addCompletedActivity(activity) {
   let activityClassName = hash(activity.name);
   
   // If there is another element and collapsing is on
   if (document.querySelector(`._${activityClassName}`) && settings.collapse !== "none") {
      let existingElement = document.querySelector(`._${activityClassName}`);
      // Long collapse - list all tasks
      if (settings.collapse == "long") {
         let subElement = document.createElement("div");
         let timerElement = document.createElement("span");
         let dateElement = document.createElement("span");
      
         timerElement.classList.add("time");

         timerElement.innerHTML = formatTimeAmount(activity.time, "yMwdhms", 1) + "<br>";
         dateElement.innerHTML = `Started ${at(activity.start)} <br> 
                                 Finished ${at(activity.finish)} <br><br>`;

         subElement.appendChild(timerElement);
         subElement.appendChild(dateElement);
         existingElement.appendChild(subElement);
      }
      // Short collapse - group task data together
      else if (settings.collapse = "short" && document.querySelector(`._short_${activityClassName}`) == null) {
         document.querySelector(`._${activityClassName}`).firstChild.nextSibling.remove();
         document.querySelector(`._${activityClassName}`).firstChild.nextSibling.remove();

         let element = document.createElement("div");
         let averageTimeElement = document.createElement("p");
         let totalTimeElement = document.createElement("p");
         let activityCountElement = document.createElement("p");

         element.classList.add(`._short_${activityClassName}`);

         // Average time
         let index = labels.indexOf(activity.name);
         averageTimeElement.innerHTML = `<div class="complete-summary">
                                            <span class="material-symbols-rounded completed-activity-summary-icon">avg_time</span>
                                            <p>Average time: ${formatTimeAmount(Math.round(10 * getArrayAverage(data[index])) / 10)}</p>
                                         </div>`;
         // Total time
         totalTimeElement.innerHTML = `<div class="complete-summary">
                                          <span class="material-symbols-rounded completed-activity-summary-icon">timer</span>
                                          <p>Total time: ${formatTimeAmount(getArraySum(data[index]))}</p>
                                       </div>`;

         // Activity count
         activityCountElement.innerHTML = `<div class="complete-summary">
                                              <span class="material-symbols-rounded completed-activity-summary-icon">numbers</span>
                                              <p>Activites: ${data[index].length}</p>
                                           </div>`;
         
         element.append(averageTimeElement);
         element.append(totalTimeElement);
         element.append(activityCountElement);
         document.querySelector(`._${activityClassName}`).append(element);
      }

      return;
   }




   // If first of this activity name
   let element = document.createElement("div");
   let nameElement = document.createElement("h4");
   let timerElement = document.createElement("span");
   let dateElement = document.createElement("span");
   let controlsElement = document.createElement("div");
   let rerunButton = document.createElement("span");

   element.classList.add(`_${activityClassName}`, "activity");
   nameElement.textContent = activity.name;
   timerElement.innerHTML = formatTimeAmount(activity.time, "yMwdhms", 1) + "<br>";
   timerElement.classList.add("time");
   dateElement.innerHTML = `Started ${at(activity.start)} <br> 
                           Finished ${at(activity.finish)} <br><br>`;
   controlsElement.classList.add("controls");
   rerunButton.classList.add("control-button");
   rerunButton.classList.add(`ar${activities.indexOf(activity)}`);
   rerunButton.innerHTML = "<span class='material-symbols-rounded'>replay</span>";

   rerunButton.onclick = () => restartActivity(activity.name);

   element.appendChild(nameElement);
   element.appendChild(timerElement);
   element.appendChild(dateElement);
   controlsElement.appendChild(rerunButton);
   element.appendChild(controlsElement);
   document.querySelector(".history-items").append(element);

   document.querySelector(".are-activities-completed").classList.add("hidden");


   function at(time) {
      return formatTime(new Date(time), "12") + " on " + formatDate(new Date(time), "quick");
   }
}

function hash(string) {
   return Math.abs(string.split('').reduce((hash, char) => {
       return char.charCodeAt(0) + (hash << 6) + (hash << 16) - hash;
   }, 0));
}
