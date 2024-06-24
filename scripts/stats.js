// ==========================================
// Stats
// ==========================================

const ctx = document.getElementById("myChart");
let colors = [];

let chart = new Chart(ctx, {
   type: "doughnut",
   data: {
      labels: labels,
      datasets: [{
         label: "seconds",
         data: data
      }]
   }
});

function updateChartValues() {
   labels = [];
   data = [];
   activities.forEach((el, i) => {
      if (el[2] == "complete") {
         if (labels.findIndex((name) => name == el[0]) != -1) {
            data[labels.findIndex((name) => name == el[0])] += el[1];
         } else {
            labels.push(el[0]);
            data.push(el[1]);
         }
      }
   });
}

// Avg activity time
function avgActivityTime() {
   document.querySelector(".avgtime").innerHTML = "";
   labels = [];
   data = [];
   activities.forEach((el, i) => {
      if (el[2] == "complete") {
         if (labels.findIndex((name) => name == el[0]) != -1) {
            data[labels.findIndex((name) => name == el[0])].push(el[1]);
         } else {
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
      const average = (array) => array.reduce((a, b) => a + b) / array.length;
      taskAvg.textContent =
         "Average time: " + formatTime(Math.round(10 * average(data[i])) / 10);
      let taskTotal = document.createElement("P");
      const totalTime = (array) => array.reduce((part, a) => part + a, 0);
      taskTotal.textContent = "Total time: " + formatTime(totalTime(data[i]));
      element.append(taskName);
      element.append(taskAvg);
      element.append(taskTotal);
      document.querySelector(".avgtime").append(element);
   }
}