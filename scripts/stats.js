// ==========================================
// Stats
// ==========================================

const ctx = document.getElementById("myChart");

let chart = new Chart(ctx, {
   type: "doughnut",
   data: {
      labels: labels,
      datasets: [{
         label: "seconds",
         data: sumNestedArrays(data)
      }]
   }
});

function updateChartValues() {
   labels = [];
   data = [];

   activities.forEach((activity, i) => {
      let activityDataIndex = labels.findIndex((name) => name == activity.name);
      if (activityDataIndex != -1) {
         data[activityDataIndex].push(activity.time);
      } else {
         labels.push(activity.name);
         data.push([activity.time]);
      }
   });
}

// Avg activity time
function avgActivityTime() {
   document.querySelector(".avgtime").innerHTML = "";
   updateChartValues();

   for (i in labels) {
      let element = document.createElement("DIV");
      element.classList.add("avgtimeblock");
      let taskName = document.createElement("P");
      taskName.textContent = labels[i];
      let taskAvg = document.createElement("P");


      taskAvg.textContent =
         "Average time: " + formatTimeAmount(Math.round(10 * getArrayAverage(data[i])) / 10);
      let taskTotal = document.createElement("P");

      taskTotal.textContent = "Total time: " + formatTimeAmount(getArraySum(data[i]));
      element.append(taskName);
      element.append(taskAvg);
      element.append(taskTotal);
      document.querySelector(".avgtime").append(element);
   }

}

function getArrayAverage(array) {
   let sum = 0;
   for (let i = 0; i < array.length; i++) {
      sum += array[i];
   }
   return sum / array.length;
}

function sumNestedArrays(array) {
   return array.map(arr => arr.reduce((acc, val) => acc + val, 0));
}

function getArraySum(array) {
   return array.reduce((part, a) => part + a, 0);
}