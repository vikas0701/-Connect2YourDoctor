package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.City;
import com.example.demo.entities.State;

@Repository
public interface CityRespository extends JpaRepository<City, Integer> {
	
	@Query("SELECT c FROM City c WHERE state_id = :s")
	public List<City> getCitiesByStateId(State s);
}
