export const pipeDuration = (durationInMinutes: number): string => {
	let hours: string | number = Math.floor(durationInMinutes / 60);
	let minutes: string | number = durationInMinutes % 60;

	if (hours < 10) {
		hours = `0${hours}`;
	}
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}
	return `${hours}:${minutes}`;
};
