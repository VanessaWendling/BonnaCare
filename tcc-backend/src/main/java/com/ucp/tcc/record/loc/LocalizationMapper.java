package com.ucp.tcc.record.loc;

import com.ucp.tcc.entities.Localization;

public class LocalizationMapper {

	public static LocalizationResRecord fromEntity(Localization localization) {
		return new LocalizationResRecord(localization.getLocalizator(), localization.getLatitude(),
				localization.getLongitude(), localization.getDate());
	}
}
