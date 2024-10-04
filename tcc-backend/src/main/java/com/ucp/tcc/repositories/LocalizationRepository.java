package com.ucp.tcc.repositories;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ucp.tcc.entities.Localization;

public interface LocalizationRepository extends JpaRepository<Localization, UUID> {
	@Query("SELECT l FROM Localization l WHERE l.localizator = :localizator AND l.date >= :startDate")
	List<Localization> findAllByLocalizatorLastMonth(@Param("localizator") String localizator,
			@Param("startDate") Date startDate);
}
