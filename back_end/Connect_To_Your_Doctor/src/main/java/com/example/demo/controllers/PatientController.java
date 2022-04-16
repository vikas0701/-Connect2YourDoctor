package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Login;
import com.example.demo.entities.Patient;
import com.example.demo.entities.PatientRegisteration;
import com.example.demo.services.LoginService;
import com.example.demo.services.PatientService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class PatientController {
	
	@Autowired
	PatientService patientService;
	
	@Autowired
	LoginService loginService;
	
	@GetMapping("getallpatients")
	public List<Patient> getAllPatients(){
		return patientService.getAllPatients();
	}
	
	@GetMapping("/getonepatientbyid/{id}")
	public Patient getOnePatientById(@PathVariable int id) {
		return patientService.getOnePatientById(id);
	}
	
	@PostMapping("/updatepatientdetails")
	public Patient updatePatientDetails(@RequestBody Patient p) {
		return patientService.updatePatientDetails(p);
	}
	
	@PostMapping("/savepatient")
	public Patient savePatient(@RequestBody PatientRegisteration pr) {
		Login l = new Login(pr.getUserName(),pr.getPassword(),"Patient","active");
		Login inserted = loginService.saveUser(l);
		if(inserted != null) {
			Patient p = new Patient(pr.getFirstName(),pr.getLastName(),pr.getMobileNumber(),pr.getGender(),pr.getBloodGroup(),pr.getDob(),inserted);
			return patientService.savePatient(p);
		}
		else {
			return null;
		}
	}
}









