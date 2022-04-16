package com.example.demo.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Area;
import com.example.demo.entities.Doctor;
import com.example.demo.repositories.DoctorRepository;

@Service
public class DoctorService {
	
	@Autowired	
	DoctorRepository doctorRepository;
	
	@Autowired
	JavaMailSender javaMailSender;
	
	public List<Doctor> getAllDoctors() {
		return doctorRepository.findAll();
	}
	
	public Doctor saveDoctor(Doctor d) {
		Doctor doctor = doctorRepository.save(d);
		if(doctor != null) {
			SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
			simpleMailMessage.setFrom("connecttoyourdoctor@gmail.com");
			simpleMailMessage.setTo(d.getLogin_id().getUserName());
			//System.out.println("--**$$"+d.getLogin_id().getUserName());
			simpleMailMessage.setSubject("Registration Mail");
			Date day = new Date();
			simpleMailMessage.setText("Registration Successful "+day+"\n Your Password is : "+doctor.getLogin_id().getPassword());
			javaMailSender.send(simpleMailMessage);
			return doctor;
		}else {
			return null;
		}
	}
	
	public Doctor updateDoctorDetails(Doctor d) {
		try {
			return doctorRepository.save(d);
		}catch(Exception e) {
			return null;
		}
	}
	
	public List<Object> getAllDoctorsSpeciality() {
		return doctorRepository.getAllDoctorsSpeciality();
	}
	
	public Doctor getDoctorByDoctorId(int id) {
		return doctorRepository.getById(id);
	}

	public List<Doctor> getDoctorsByAreaAndApecialization(Area a, String spec) {
		return doctorRepository.getDoctorsByAreaAndApecialization(a,spec);
	}
	
	public List<Doctor> getAllDoctorsByArea(Area a){
		return doctorRepository.getAllDoctorsByArea(a);
	}
	
	//fetch patient by login details
//	public Doctor getOneByLoginId(Login id) {
//		return drepo.getOneByLoginId(id);
//	}
//	public List<Doctor> allDoctorsByState(int id) {
//
//		return drepo.getDoctorByState(id);
//	}
//	public List<Doctor> allDoctorsByCity(City c) {
//		// TODO Auto-generated method stub
//		return drepo.getDoctorByCity(c);
//	}
//	public Doctor getOneById(int id) {
//		//return drepo.getOneById(id);
//		return drepo.findById(id).get();
//	}

}















