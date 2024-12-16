class Task{
    constructor(id,title,description,priority){
        this.id=id;
        this.title = title;
        this.description=description;
        this.priority=priority;
        this.completed = false;
    }
}
class TaskManager{
constructor(){
    this.tasks=JSON.parse(localStorage.getItem("tasks"))|| [];
}

//task add
addTask(title,description,priority){
const id = Date.now().toString();
const task = new Task(id,priority,description,title);
this.tasks.push(task);
this.saveTasks();

}
//view all task
viewTasks(){

    return this.tasks.sort((a,b)=> {
        const priorities = {High:1,Medium:2,Low:3};
        return priorities[a.priority]-priorities[b.priority];
    });
    }
//mark task complete
markTaskCompleted(id){
this.tasks=this.tasks.map(task =>  
    task.id===id ? {...task,completed:true} :task 
);
this.saveTasks();
}
//delete task
deleteTask(id){
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveTasks();
}
//filter by status
filterTasks(status){
return this.tasks.filter(task => 
    status==="completed" ? 
    task.completed : !task.completed
);
}
//save and load task
saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(this.tasks));
    }
loadTasks(){
this.tasks= JSON.parse(localStorage.getItem("tasks")) || [];
}    
//saving to server
saveToServer(){
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Data saved on server");
            resolve();

        } , 1000);

    });
}
}


