function isPrime(n){
    if(typeof n !=='number')return `type a number`
   if(n<=1)return false;
   if(n<=3)return true;//2 is only even prime
   if(n%2===0||n%3===0)return false;//factors of 2 or 3 
    for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;


}
module.exports = {isPrime};