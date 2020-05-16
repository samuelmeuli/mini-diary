import React, { ReactElement } from "react";

import { translations } from "../../../../utils/i18n";
import DisableSpellCheckPrefContainer from "./disable-spellcheck-pref/DisableSpellCheckPrefContainer";
import FutureEntriesPrefContainer from "./future-entries-pref/FutureEntriesPrefContainer";
import HideTitlesPrefContainer from "./hide-titles-pref/HideTitlesPrefContainer";

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
				<DisableSpellCheckPrefContainer />
			</div>
		</fieldset>
	);
}
