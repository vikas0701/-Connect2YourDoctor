package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.City;
import com.example.demo.entities.State;
import com.example.demo.services.CityService;
import com.example.demo.services.StateService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CityController {
	
	@Autowired
	CityService cityService;
	
	@Autowired
	StateService stateService;
	
	@GetMapping("/getallcities")
	public List<City> getAllCities(){
		return cityService.getAllCities();
	}
	
	@GetMapping("/getcitybyid/{id}")
	public City getCityById(@PathVariable int id) {
		return cityService.getCityById(id);
	}
	
	@PostMapping("/savecity")
	public City saveCity(@RequestBody City c) {
		return cityService.saveCity(c);
	}
	
	@GetMapping("/getcitiesbystate/{id}")
	public List<City> getCitiesByStateId(@PathVariable int id){
		State s = stateService.getStateById(id);
		return cityService.getCitiesByStateId(s);
	}
}






