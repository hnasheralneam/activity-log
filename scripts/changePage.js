let pageSave = localStorage.getItem("activityLogPage");

function displayPage(page) {
   document.querySelector(".page-active").classList.remove("page-active");
   document.querySelector("." + page).classList.add("page-active");
   localStorage.setItem("activityLogPage", JSON.stringify({
      page: page
   }));
}