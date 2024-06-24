// Current
activites = [
   [activityName, secondsActive, state(working, complete), paused, {
      start: timestamp, finish: timestamp
   }]
]

// New
activites [
   name: string
   time: miliseconds
   paused: boolean
   pausedTime: timestamp
   start: timestamp
]



after changing to the new format, these scripts will break: main, stats, suggestions
additioanlly, we are making a seperate array for completed tasks, which will break the scripts above and the init and save script

-----new plans-------
all activites will be stored in array activites when completed, which will be read for suggestions and stats. data will be stored like this: {
   name: string
   time: miliseconds
   start: timestamp
}, only saved on state change - activity completed

active activty will have two parts
- bool isActiveTask
- obj activeTask {
   name: string
   time: miliseconds
   paused: boolean
   pausedTime: timestamp
   start: timestamp
}
both saved together like this {
   isActiveTask
   activeTask
}, read out of object into values on load, only saved on state change - task created, paused, finished


this will shatter everything, basically a complete rewrite with markdown and styles completed