function fetchData(){
    let myPromise = new Promise((res,rej)=>{
        let success = Math.random();
        setTimeout(()=>{
if(success>0.5){
res('data fetched successfully');
}
else {
    rej('could not fetch data');
}
        },1000);
    })
    return myPromise;
}

async function fetchDataHandler(){
try{
let result = await fetchData();
console.log('the promise was a success '+result);
}
catch(err){
console.log('promise failed '+err);
}
}

fetchDataHandler();