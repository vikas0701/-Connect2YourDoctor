package com.example.demo.entities;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "state")
public class State {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "state_id")
	private int stateId;
	
	@Column(name = "state_name", nullable = false)
	private String stateName;
	
//	@JsonIgnoreProperties("state_id")
//	@OneToMany(mappedBy = "state_id", cascade = CascadeType.ALL)
//	Set<City> cities;

	public State() {
		super();
	}

	public State(String stateName) {
		super();
		this.stateName = stateName;
	}

//	public State(String stateName, Set<City> cities) {
//		super();
//		this.stateName = stateName;
//		this.cities = cities;
//	}
//
//	public State(int stateId, String stateName, Set<City> cities) {
//		super();
//		this.stateId = stateId;
//		this.stateName = stateName;
//		this.cities = cities;
//	}

	public int getStateId() {
		return stateId;
	}

	public void setStateId(int stateId) {
		this.stateId = stateId;
	}

	public String getStateName() {
		return stateName;
	}

	public void setStateName(String stateName) {
		this.stateName = stateName;
	}

//	public Set<City> getCities() {
//		return cities;
//	}
//
//	public void setCities(Set<City> cities) {
//		this.cities = cities;
//		for(City c : cities)
//			o.setState_id(this);
//	}
//	
	
	
}




