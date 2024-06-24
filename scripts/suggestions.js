// ==========================================
// Suggestions
// ==========================================

function generateSuggestions() {
   // let ranks = [];
   // let labels = [];
   // let data = [];
   // activities.forEach((el) => {
   //    // All tasks, even incomplete ones
   //    if (labels.findIndex((name) => name == el[0]) != -1) {
   //       data[labels.findIndex((name) => name == el[0])].push([el[1], el[4]["start"]]);
   //    } else {
   //       labels.push(el[0]);
   //       ranks.push(0);
   //       data.push([[el[1], el[4]["start"]]]);
   //    }
   // });
   // labels.forEach((label) => {
   //    // Good stuff? That's to be seen
   //    let mSSOD = Math.floor(milsSinceDay(new Date()) / 60000);
   //    let timesValues = [];
   //    for (let i = 0; i < 72; i++) {
   //       timesValues.push(0);
   //       data[labels.indexOf(label)].forEach((el) => {
   //          let startDate = el[1];
   //          let mSSODFT = Math.floor(milsSinceDay(new Date(el[1])) / 60000);
   //          let subs = mSSOD - mSSODFT;
   //          if (subs < 0) subs = 1440 + subs;
   //          if (subs > 1440) subs = subs - 1440;
   //          if ((subs <= (10 * i)) && (subs > (10 * (i - 1)))) timesValues[i]++;
            
   //          let firstNum = mSSOD - (i * 10);
   //          if (firstNum < 0) firstNum = 1440 + firstNum;
   //          let secondNum = firstNum + 10;

            
            

   //          // console.log(firstNum, secondNum, mSSOD - ((i - 1) * 10));
   //          console.log((((mSSOD + (i * 10)) > mSSODFT) && ((mSSOD + ((i - 1) * 10)) <= mSSODFT)) || ((firstNum > mSSODFT) && (secondNum <= mSSODFT)) ? true : "bad");
   //       });
   //    }
   //    console.log(label, timesValues)
      
   //    // Decide rank
   //    let timeWeight = 0;
   //    for (let i = timesValues.length - 1; i >= 0; i--) {
   //       // Changing this will change how important recent tasks are
   //       timeWeight += .3;
   //       timeWeight = Math.round(timeWeight * 100) / 100;
   //       if (timesValues[i] != 0) ranks[labels.indexOf(label)] += timesValues[i] * timeWeight;
   //    }
      
   //    // Get milliseconds since start of day
   //    function milsSinceDay(date) {
   //       return (date.getHours() * 60 * 60 * 1000) + (date.getMinutes() * 60 * 1000) + (date.getSeconds() * 1000) + date.getMilliseconds();
   //    }
   // });
   
   // // Merge rank and labels arrays
   // let labelRanks = [];
   // for (let i = 0; i < ranks.length; i++) labelRanks.push([labels[i], ranks[i]]);
   
   // // Sort by rank
   // labelRanks.sort((a, b) => { return a[1] - b[1]; }).reverse();
   
   // // Puts elements into suggestions box
   // labelRanks.forEach((el) => {
   //    let block = document.createElement("DIV");
   //    block.classList.add("suggestion-element")
   //    block.innerHTML = `
   //       <p>${el[0]}</p>
   //       <span class='material-symbols-rounded redo-activty-icon'>replay</span>
   //    `;
   //    block.onclick = () => restartActivity(el[0]);
   //    document.querySelector(".suggestions").append(block);
   // });
}
