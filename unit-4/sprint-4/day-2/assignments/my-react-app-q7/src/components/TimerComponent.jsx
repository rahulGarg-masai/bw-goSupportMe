import useTimer from '../hooks/useTimer';

const TimerComponent = () => {
  const { timer, isRunning, startTimer, stopTimer, resetTimer } = useTimer();

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Timer: {timer} seconds</h1>
      <p>Status: {isRunning ? 'Running' : 'Stopped'}</p>
      <div>
        <button onClick={startTimer} disabled={isRunning}>
          Start
        </button>
        <button onClick={stopTimer} disabled={!isRunning} style={{ margin: '0 10px' }}>
          Stop
        </button>
        <button onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default TimerComponent;
