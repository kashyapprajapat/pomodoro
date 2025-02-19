import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PomodoroTimer = () => {
  const [time, setTime] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedFruit, setSelectedFruit] = useState("");

  useEffect(() => {
    let timer;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isRunning) {
      toast.success(
        `Time's up! Your ${selectedFruit} Pomodoro session is over! 🍏🥭`,
        { position: "top-center" }
      );
      sendPushNotification(`Time's up! Your ${selectedFruit} session is over!`);
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft, selectedFruit]);

  const startTimer = () => {
    if (time > 0 && selectedFruit) {
      setSecondsLeft(time * 60);
      setIsRunning(true);
    } else {
      toast.error("Please select a fruit and enter a valid time! ⏳🍎", {
        position: "top-center",
      });
    }
  };

  const stopTimer = () => setIsRunning(false);

  const sendPushNotification = (message) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Pomodoro Timer", { body: message });
    } else if ("Notification" in window && Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Pomodoro Timer", { body: message });
        }
      });
    }
  };

  const fruitImages = {
    Apple: "https://img.freepik.com/premium-vector/apple-fruit-cute-3d-icon-vector-illustration-design_643365-80.jpg?semt=ais_hybrid",
    Mango: "https://img.freepik.com/free-psd/3d-rendering-delicious-mango_23-2149929548.jpg",
    Banana: "https://img.freepik.com/free-psd/3d-rendering-delicious-banana_23-2149929528.jpg",
  };

  return (
    <div
      style={{
        ...styles.container,
        backgroundImage: `url(${fruitImages[selectedFruit] || ""})`,
        backgroundColor: "#57d8ff",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1>🍎 Pomodoro Timer 🍊</h1>
      <div>
        <label>⏳ Enter Time (minutes): </label>
        <input
          type="number"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          min="1"
          style={styles.input}
        />
      </div>
      <div>
        <label>🍏 Select a Fruit: </label>
        <select
          value={selectedFruit}
          onChange={(e) => setSelectedFruit(e.target.value)}
          style={styles.select}
        >
          <option value="">-- Choose a Fruit --</option>
          <option value="Apple">🍎 Apple (Classic 25 min)</option>
          <option value="Mango">🥭 Mango (40 min Focus)</option>
          <option value="Banana">🍌 Banana (50 min Deep Work)</option>
        </select>
      </div>
      <div>
        <h2>
          ⏲ Time Left: {Math.floor(secondsLeft / 60)}:
          {String(secondsLeft % 60).padStart(2, "0")}
        </h2>
      </div>
      <div>
        <button onClick={startTimer} style={styles.buttonStart}>
          ▶ Start
        </button>
        <button onClick={stopTimer} style={styles.buttonStop}>
          ⏹ Stop
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial",
    padding: "20px",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    transition: "background-image 0.5s ease-in-out",
  },
  input: {
    padding: "10px",
    margin: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "200px",
  },
  select: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
  },
  buttonStart: {
    backgroundColor: "green",
    color: "white",
    padding: "10px 20px",
    margin: "10px",
    fontSize: "18px",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
  buttonStop: {
    backgroundColor: "red",
    color: "white",
    padding: "10px 20px",
    margin: "10px",
    fontSize: "18px",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default PomodoroTimer;