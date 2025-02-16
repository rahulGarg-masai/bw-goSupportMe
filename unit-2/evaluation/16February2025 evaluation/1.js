function fetchUserData(url){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            const users = [
                {id:1,name:'alice',email:'alice@gmail.com',age:20},
                {id:2,name:'bob',email:'bob@gmail.com',age:17},
                {id:3,name:'pratik',email:'pratik@gmail.com',age:19},
                {id:4,name:'violet',email:'arcane@gmail.com',age:18}
            ];
            resolve(users);
        },2000);
    });
}
function processUsers(users, minAge){
let filteredUsers = users.filter(user=>user.age>=minAge);
let mapedUsers = filteredUsers.map(user=>({name:user.name,email:user.email}));
return mapedUsers;
}
function createUserManager(){
    let users = [];
    return {
        addUser(user){
users = [...users,user];
        },
        getUsers(){
            return users.map(({name})=>({name}));
        },
        findUserByName(name){
            const user = users.find(user=>user.name===name);
            return user?.name?user : "User not found";
        }
    };
}
//part 4a
async function main(){
    console.log('before fetching user data');//2
const users = await fetchUserData();
console.log('after fetching user data');//10
console.log('before processing fetched user data');//11

const processedUsers = processUsers(users,18);

console.log('after processing fetched user data');//12

console.log(processedUsers);
}
console.log('before calling main async function');//1
main();
console.log('main async function complete and executed');//3
//part 4b
console.log('before creating  user manager');//4

const userManager = createUserManager();
console.log('after creating  user manager');//5
console.log('before adding users');//6

userManager.addUser({name:'jinx',email:'jinx@gmail.com'});
userManager.addUser({name:'vander',email:'vander@gmail.com'});
userManager.addUser({name:'ekko',email:'ekko@gmail.com'});
userManager.addUser({name:'mel',email:'mel@gmail.com'});
console.log('after adding users');//7



console.log('before getting users');//8

console.log(userManager.getUsers());

console.log('after getting users');//9

