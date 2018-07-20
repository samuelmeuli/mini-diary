export default class Day {
	constructor(year, month, day) {
		if (year && month && day) {
			// If all parameters are set: Set to specified date
			this.year = year;
			this.month = month;
			this.day = day;
		} else if (!year && !month && !day) {
			// If no parameters are set: Set to current date
			const today = new Date();
			this.year = today.getFullYear();
			this.month = today.getMonth() + 1;
			this.day = today.getDate();
		} else {
			// If only some parameters are set: Throw error
			throw Error('Either specify all parameters year, month and day or none (to get current date)');
		}
	}

	toObject() {
		return {
			year: this.year,
			month: this.month,
			day: this.day
		};
	}

	toString() {
		const yyyy = this.year;
		const mm = this.month < 10 ? `0${this.month}` : this.month;
		const dd = this.day < 10 ? `0${this.day}` : this.day;
		return `${yyyy}-${mm}-${dd}`;
	}
}
