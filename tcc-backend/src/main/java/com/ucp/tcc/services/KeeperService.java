package com.ucp.tcc.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucp.tcc.entities.Keeper;
import com.ucp.tcc.repositories.KeeperRepository;

@Service
public class KeeperService {

	@Autowired
	private KeeperRepository keeperRepository;

	public List<Keeper> getKeepers() {
		return keeperRepository.findAll();
	}
	
	public Keeper saveKeeper(Keeper keeper) {
		return keeperRepository.save(keeper);
	}

}
