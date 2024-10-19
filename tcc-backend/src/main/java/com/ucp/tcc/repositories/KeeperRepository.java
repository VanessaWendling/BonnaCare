package com.ucp.tcc.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ucp.tcc.entities.Keeper;

public interface KeeperRepository extends JpaRepository<Keeper, UUID>{
	 Optional<Keeper> findByEmail(String email);
}
