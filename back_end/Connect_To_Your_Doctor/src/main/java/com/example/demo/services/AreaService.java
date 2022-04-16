package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Area;
import com.example.demo.entities.City;
import com.example.demo.repositories.AreaRepository;

@Service
public class AreaService {

	@Autowired
	AreaRepository areaRepository;
	
	public List<Area> getAllAreas() {
		return areaRepository.findAll();
	}

	public Area getAreaById(int id) {
		return areaRepository.getById(id);
	}
	
	public Area saveArea(Area a) {
		return areaRepository.save(a);
	}
	
	public List<Area> getAreaByCity(City c){
		return areaRepository.getAreaByCity(c);
	}
}





















