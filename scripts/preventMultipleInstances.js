const channel = new BroadcastChannel("tab");

channel.postMessage("another-tab");
// note that listener is added after posting the message

channel.addEventListener("message", (msg) => {
   if (msg.data === "another-tab") {
      // message received from 2nd tab
      alert("Cannot open multiple instances. Deleting this one");
      document.body.innerHTML = "";
      let reloadPageButton = document.createElement("button");
      reloadPageButton.textContent = "Reload page";
      reloadPageButton.onclick = () => {
         location.reload();
      }
      document.body.appendChild(reloadPageButton);
   }
})