import React, { PureComponent, ReactNode } from "react";
import countWords from "word-count";

import { getLang } from "../../../electron/ipcRenderer/senders";
import { Entries } from "../../../types";
import { createDate, fromIndexDate } from "../../../utils/dateFormat";
import { translations } from "../../../utils/i18n";
import OverlayContainer from "../overlay-hoc/OverlayContainer";

const locale = getLang();

export interface StateProps {
	entries: Entries;
}

type Props = StateProps;

interface Stats {
	nrEntries: number;
	avgEntriesPerWeek: number;
	longestStreak: number;
	currentStreak: number;
	nrWords: number;
	avgWordsPerEntry: number;
}

export default class StatsOverlay extends PureComponent<Props, {}> {
	/**
	 * Return a string representation of the provided number, with thousands separators and at most
	 * one digit after the decimal point
	 */
	static formatNum(num: number): string {
		return num.toLocaleString(locale, { maximumFractionDigits: 1 });
	}

	/**
	 * Calculate various stats about the diary file's content
	 */
	static calcStats(entries: Entries): Stats {
		const indexDatesSorted = Object.keys(entries).sort();
		const nrEntries = indexDatesSorted.length;
		const today = createDate();

		let currentStreak = 1;
		let longestStreak = 0;
		let nrWords = 0;
		let prevDate = fromIndexDate("1970/01/01");

		// Loop over sorted indices and find corresponding diary entry. Update stats variables using its
		// content
		indexDatesSorted.forEach((indexDate): void => {
			const entry = entries[indexDate];
			const { title, text } = entry;
			const date = fromIndexDate(indexDate);

			// Check if the current date is one day after the previous one. If so, increase
			// `currentStreak`. If not, update `longestStreak` if necessary and reset `currentStreak`
			if (date.diff(prevDate, "days") === 1) {
				currentStreak += 1;
			} else {
				if (currentStreak > longestStreak) {
					longestStreak = currentStreak;
				}
				currentStreak = 1;
			}

			// Count number of words in title and text, add to total
			nrWords += countWords(`${title}\n${text}`);

			prevDate = date;
		});

		// If no diary entry has been written in the last day, reset `currentStreak`
		if (today.diff(prevDate, "days") > 1) {
			currentStreak = 0;
		}

		// Calc number of weeks since first entry
		const nrWeeks = today.diff(indexDatesSorted[0], "weeks") + 1;

		return {
			nrEntries,
			avgEntriesPerWeek: nrWeeks === 0 ? 0 : nrEntries / nrWeeks,
			longestStreak,
			currentStreak,
			nrWords,
			avgWordsPerEntry: nrEntries === 0 ? 0 : nrWords / nrEntries,
		};
	}

	render(): ReactNode {
		const { entries } = this.props;

		const stats = StatsOverlay.calcStats(entries);

		return (
			<OverlayContainer className="stats-overlay">
				<h1>{translations.statistics}</h1>
				<table>
					<tbody>
						<tr>
							<td className="stat-number">{StatsOverlay.formatNum(stats.nrEntries)}</td>
							<td className="stat-label">{translations["total-entries"]}</td>
						</tr>
						<tr>
							<td className="stat-number">{StatsOverlay.formatNum(stats.avgEntriesPerWeek)}</td>
							<td className="stat-label">{translations["entries-per-week"]}</td>
						</tr>
						<tr>
							<td className="stat-number">{StatsOverlay.formatNum(stats.longestStreak)}</td>
							<td className="stat-label">{translations["streak-best"]}</td>
						</tr>
						<tr>
							<td className="stat-number">{StatsOverlay.formatNum(stats.currentStreak)}</td>
							<td className="stat-label">{translations["streak-current"]}</td>
						</tr>
						<tr>
							<td className="stat-number">{StatsOverlay.formatNum(stats.nrWords)}</td>
							<td className="stat-label">{translations["total-words"]}</td>
						</tr>
						<tr>
							<td className="stat-number">{StatsOverlay.formatNum(stats.avgWordsPerEntry)}</td>
							<td className="stat-label">{translations["words-per-entry"]}</td>
						</tr>
					</tbody>
				</table>
			</OverlayContainer>
		);
	}
}
