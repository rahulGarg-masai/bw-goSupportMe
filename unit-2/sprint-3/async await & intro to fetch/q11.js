function timer(duration,onComplete){
    setTimeout(()=>{
        onComplete(`Timer of ${duration} ms finished`);
    },duration);
}
