-----completed activities-----
activites [
   name: string
   time: miliseconds
   paused: boolean
   pausedTime: timestamp
   start: timestamp
   finish: timestamp
]


-----active activity-----
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