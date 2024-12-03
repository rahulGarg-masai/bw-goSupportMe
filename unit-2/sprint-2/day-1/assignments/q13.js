const todo = ['brush','toilet','medicine','study','valorant'];
for (let i=0;i<todo.length-1;i++){
    todo[i]=todo[i+1];
}
todo.length=todo.length-1;
todo.length=todo.length+2;
for (let i = todo.length-1 ; i >=2;i--){
    todo[i]=todo[i-2];
}
todo[0]='zaruritask1';
todo[1]='zaruritask2';
todo[todo.length-1]='newtask';
console.log(todo);