package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.State;
import com.example.demo.repositories.StateRepository;

@Service
public class StateService {
	
	@Autowired
	StateRepository stateRepository;
	
	public List<State> getAllState(){
		return stateRepository.findAll();
	}
	
	public State getStateById(int id) {
		return stateRepository.getById(id);
	}
	
	public State saveState(State s) {
		try {
			return stateRepository.save(s);
		}
		catch(Exception e){
			return null;
		}
	}
}





