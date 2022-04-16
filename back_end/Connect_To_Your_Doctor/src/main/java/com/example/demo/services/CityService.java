package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.City;
import com.example.demo.entities.State;
import com.example.demo.repositories.CityRespository;

@Service
public class CityService {
	
	@Autowired
	CityRespository cityRespository;
	
	public List<City> getAllCities(){
		return cityRespository.findAll();	
	}
	
	public City getCityById(int id) {
		return cityRespository.getById(id);
	}
	
	public City saveCity(City c) {
		try {
			return cityRespository.save(c);
		}catch(Exception e) {
			return null;
		}
	}
	
	public List<City> getCitiesByStateId(State s){
		return cityRespository.getCitiesByStateId(s);
	}
}













