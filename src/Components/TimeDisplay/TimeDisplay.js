import React, { useState, useEffect } from "react";
import styles from "./TimeDisplay.module.scss";

const TimeDisplay = (props) => {
	const [milliseconds, setMilliseconds] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const [intervalId, setIntervalId] = useState(null);
	const secondsToShow = Math.floor((milliseconds / 1000) % 3600) % 60;
	const minutesToShow = Math.floor(milliseconds / 60000) % 60;
	const hourstToShow = Math.floor(milliseconds / 3600000);

	const startTimer = () => {
		if (isRunning) return;

		const id = setInterval(() => {
			setMilliseconds((prevMilliseconds) => {
				return prevMilliseconds + 10;
			});
		}, 10);
		setIntervalId(id);
		setIsRunning(true);
	};

	const stopTimer = () => {
		clearInterval(intervalId);
		setIsRunning(false);
	};

	const resetTimer = () => {
		clearInterval(intervalId);
		setMilliseconds(0);
		setIsRunning(false);
	};

	useEffect(() => {
		return () => {
			clearInterval(intervalId);
		};
	}, [intervalId]);

	return (
		<div className={styles.TimeDisplay}>
			<div className={styles.timer}>
				<h1>
					{String(hourstToShow).padStart(2, "0")}:
					{String(minutesToShow).padStart(2, "0")}:
					{String(secondsToShow).padStart(2, "0")}.
					{String(milliseconds % 1000).padStart(1, "0")}
				</h1>
			</div>
			<div className={styles.controls}>
				<button onClick={startTimer} disabled={isRunning}>
					Start
				</button>
				<button onClick={stopTimer} disabled={!isRunning}>
					Stop
				</button>
				<button onClick={resetTimer} disabled={milliseconds === 0}>
					Reset
				</button>
			</div>
		</div>
	);
};

export default TimeDisplay;
