import React, { ReactElement } from "react";

import { translations } from "../../../../utils/i18n";
import FutureEntriesPrefContainer from "./future-entries-pref/FutureEntriesPrefContainer";
import HideTitlesPrefContainer from "./hide-titles-pref/HideTitlesPrefContainer";
import SpellcheckPrefContainer from "./spellcheck-pref/SpellcheckPrefContainer";

/**
 * Preference fieldset for options related to diary entries
 */
export default function EntriesPref(): ReactElement {
	return (
		<fieldset className="fieldset-entries">
			<legend>{translations["diary-entries"]}</legend>
			<div className="fieldset-content">
				<HideTitlesPrefContainer />
				<br />
				<FutureEntriesPrefContainer />
				<br />
				<SpellcheckPrefContainer />
			</div>
		</fieldset>
	);
}
