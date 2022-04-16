package com.example.demo.services;


import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Patient;
import com.example.demo.repositories.PatientRepository;

@Service
public class PatientService {
	
	@Autowired
	PatientRepository patientRepository;
	
	@Autowired
	JavaMailSender javaMailSender;
	
	public List<Patient> getAllPatients(){
		return patientRepository.findAll();
	}
	
	public Patient getOnePatientById(int id) {
		return patientRepository.getById(id);
	}
	
	public Patient updatePatientDetails(Patient p) {
		try {
			return patientRepository.save(p);
		}catch(Exception e) {
			return null;
		}
	}

	public Patient savePatient(Patient p) {
		Patient patient = patientRepository.save(p);
		if(patient != null) {
			SimpleMailMessage smm = new SimpleMailMessage();
			smm.setFrom("connecttoyourdoctor@gmail.com");
			smm.setTo(p.getLogin_id().getUserName());
			smm.setSubject("Registration Mail");
			Date d = new Date();
			smm.setText("Registration Successful "+d);
			javaMailSender.send(smm);
			return patient;
		}
		else {
			return null;
		}
	}
	
	//fetch patient by login details
//	public Patient getOneByLoginId(Login id) {
//		System.out.println(id);
//		return prepo.getOneByLoginId(id);
//	}
//	public Patient getOneById(int id) {
//		//return prepo.getById(id);******************************
//		return prepo.findById(id).get();
//	}
	
}












