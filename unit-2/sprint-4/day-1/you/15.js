const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function countdownTimer(seconds) {
    let remainingTime = seconds;

    const interval = setInterval(() => {
        if (remainingTime > 0) {
            console.log(`Time remaining: ${remainingTime} seconds`);
            remainingTime--;
        } else {
            console.log("Countdown Complete!");
            clearInterval(interval);
            rl.close();
        }
    }, 1000);

    const stopKeyDetection = () => {
        setTimeout(() => {
            rl.question('Press "s" to stop the countdown: ', (key) => {
                if (key.toLowerCase() === 's') {
                    clearInterval(interval);
                    console.log("Countdown stopped by user.");
                    rl.close();
                } else {
                    stopKeyDetection();
                }
            });
        }, 100);
    };

    stopKeyDetection();
}

rl.question('Enter the number of seconds to count down: ', (input) => {
    const seconds = parseInt(input);
    if (!isNaN(seconds) && seconds > 0) {
        countdownTimer(seconds);
    } else {
        console.log("Please enter a valid positive number.");
        rl.close();
    }
});
