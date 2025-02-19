import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PomodoroTimer = () => {
  const [time, setTime] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedFruit, setSelectedFruit] = useState("");

  
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted");
        }
      });
    }
  }, []);

  useEffect(() => {
    let timer;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isRunning) {
      showNotification(`⏳ Time's up! Your ${selectedFruit} session is over! 🍏🥭`);
      toast.success(`⏳ Time's up! Your ${selectedFruit} session is over! 🍏🥭`, {
        position: "top-center",
        autoClose: 3000,
      });
      setIsRunning(false);
    }

    return () => clearInterval(timer);
  }, [isRunning, secondsLeft, selectedFruit]);

  const startTimer = () => {
    if (time > 0 && selectedFruit) {
      if (!isRunning && secondsLeft === 0) {
        setSecondsLeft(time * 60);
      }
      setIsRunning(true);
      showNotification(`🎯 Focus mode started with ${selectedFruit}!`);
      toast.info(`🎯 Focus mode started with ${selectedFruit}!`, {
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      toast.error("⚠️ Please enter a valid time & select a fruit!", {
        position: "top-center",
      });
      showNotification("⚠️ Please enter a valid time & select a fruit!");
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
    showNotification("⏸ Timer paused!");
    toast.warn("⏸ Timer paused!", {
      position: "bottom-right",
      autoClose: 1000,
    });
  };

  const showNotification = (message) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Pomodoro Timer", {
        body: message,
        icon: "https://cdn-icons-png.flaticon.com/512/616/616490.png",
      });
    }
  };

  const fruitImages = {
    Apple: "https://img.freepik.com/premium-vector/apple-fruit-cute-3d-icon-vector-illustration-design_643365-80.jpg?semt=ais_hybrid",
    Mango: "https://img.freepik.com/free-psd/3d-rendering-delicious-mango_23-2149929548.jpg",
    Banana: "https://img.freepik.com/free-psd/3d-rendering-delicious-banana_23-2149929528.jpg",
  };

  return (
    <div style={{ ...styles.container, backgroundImage: `url(${fruitImages[selectedFruit] || ""})` }}>
      <ToastContainer />
      <div style={styles.overlay}>
        <h1>🍎 Pomodoro Timer 🍊</h1>
        <div>
          <label>⏳ Enter Time (minutes): </label>
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
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
            <option value="Apple">🍎 Apple (25 min Focus)</option>
            <option value="Mango">🥭 Mango (40 min Deep Work)</option>
            <option value="Banana">🍌 Banana (50 min Endurance)</option>
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
            {isRunning ? "▶ Resume" : "▶ Start"}
          </button>
          <button onClick={stopTimer} style={styles.buttonStop}>
            ⏹ Stop
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#6be5fd",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    transition: "background-image 0.5s ease-in-out",
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.66)",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  input: {
    padding: "10px",
    margin: "10px",
    fontSize: "16px",
    width: "60px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    textAlign: "center",
  },
  select: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
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
