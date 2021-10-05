export const getDur = (duration: number) => {
	const minutes = Math.floor(duration / 60000);
	const seconds = Math.floor(duration / 1000) - minutes * 60;
	const dur = `${minutes < 10 ? `0${minutes}` : `${minutes}`}:${
		seconds < 10 ? `0${seconds}` : seconds
	}`;
    return dur;
};
