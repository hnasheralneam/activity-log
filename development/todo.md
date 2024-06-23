// ==========================================
// Ideas and Plans
// ==========================================

// Recommend commonly used tasks based on time and location
// Filter through suggestions as you type
// Group tasks by catogory (custom color, used for charts)
// Add settings to export
// Rename tasks
// Switch to digit.js
// Days since activity should be calculated before adding to array item, by subtracting .01, multiplied by 1.1 for each consecutive week distant
// Show graph for when tasks were done

/*
== Things that are broken ==
// Multiple tabs mess with save
// I suppose the hacky way I remove spaces is a problem

== Settings ==
// Setting to continue tasks when tab is closed
// Option that adding new tasks completes previous (for one-direction workflow)
// Option for charts to show tasks in progress

== Visual ==
// Only show most recent in completed tasks
// Task color is black on first added tasks
// Dark theme
// Sequoia theme

== Automate activites ==
Automated activites will have a set schedule time, which can be repeated, when it will alert you, and you can choose to start/delay/ignore the activity (call reminders?)
*/


For activity log, which you will use today to log your activity, work on the web version for now, not styling or anything but actuall functionallity, then work on mobile. Right now i was thinking that we could store a) time started, which will work as first unpaused time, b) time ran, c) time last paused, and d) time closed, stored only for decorative purposes not calculation. use the last unpaused time every second to calc change to thing for load effect, but have time only calculated and added when clock is paused.



- create easy way to add time later (set start finish times, length)
- make seperate array for completed elements to avoid reload checking