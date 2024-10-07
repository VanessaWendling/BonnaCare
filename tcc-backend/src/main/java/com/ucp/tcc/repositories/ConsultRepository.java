package com.ucp.tcc.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ucp.tcc.entities.Consult;

public interface ConsultRepository extends JpaRepository<Consult, UUID>{

}
