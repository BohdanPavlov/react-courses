export const getCreationDate = () => {
	const today: Date = new Date();
	const yyyy = today.getFullYear();
	let mm: string | number = today.getMonth() + 1; // Months start at 0!
	let dd: string | number = today.getDate();

	if (dd < 10) dd = '0' + dd;
	if (mm < 10) mm = '0' + mm;

	return dd + '/' + mm + '/' + yyyy;
};
