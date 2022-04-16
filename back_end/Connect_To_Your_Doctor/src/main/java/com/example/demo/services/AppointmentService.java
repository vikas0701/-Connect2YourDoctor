package com.example.demo.services;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Appointment;
import com.example.demo.entities.Doctor;
import com.example.demo.entities.Patient;
import com.example.demo.repositories.AppointmentRepository;

@Service
public class AppointmentService {
	
	@Autowired
	AppointmentRepository appointmentRepository;
	
	@Autowired
	JavaMailSender javaMailSender;

	public List<Appointment> getAllAppointments() {
		return appointmentRepository.findAll();
	}

	public Appointment saveAppointment(Appointment a) {
		Appointment aa = appointmentRepository.save(a);
		if(aa != null) {
			SimpleMailMessage smm = new SimpleMailMessage();
			smm.setFrom("connecttoyourdoctor@gmail.com");
			smm.setTo(aa.getPatient_id().getLogin_id().getUserName(),aa.getDoctor_id().getLogin_id().getUserName());
			smm.setSubject("Appointment Booking");
			
			smm.setText("Appointment Booked Successfully"+"\nAppointment Date & Time : "+aa.getAppointmentDate()+" "+
			aa.getAppointmentTime()+"\nDoctor Details : \nDoctor Name :" + aa.getDoctor_id().getFirstName()+" "+aa.getDoctor_id().getLastName()+
			" (Speciality : "+aa.getDoctor_id().getSpeciality()+")\nPatient Details : \nPatient Name : "+aa.getPatient_id().getFirstName()+" "+aa.getPatient_id().getLastName()
			+" (Mobile Number : "+aa.getPatient_id().getMobileNumber()+")\nLocation : "+aa.getDoctor_id().getArea_id().getAreaName()+" "+
			aa.getDoctor_id().getArea_id().getCity_id().getCityName()+" "+aa.getDoctor_id().getArea_id().getCity_id().getState_id().getStateName());
			
			javaMailSender.send(smm);
			return aa;
		}
		else {
			return null;
		}
	}

//	public List<Appointment> getAppointmentsByDoctorId(Doctor d, Date date1) {
//		return appointmentRepository.getAppointmentsByDoctorId(d,date1);
//	}
	
	
	public List<Appointment> getAppointmentsByDoctorId(Doctor d) {
		String pattern = "yyyy-MM-dd";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		String date = simpleDateFormat.format(new Date());
		System.out.println(date);
		Date date1 = null;
		try {
			date1 = new SimpleDateFormat("yyyy-MM-dd").parse(date);
		}catch (ParseException e) {
			e.printStackTrace();
		}
		System.out.println(date1);
		return appointmentRepository.getAppointmentsByDoctorId(d,date1);
	}
	

	public Appointment cancelAppointment(Appointment a) {
		Appointment aa = appointmentRepository.save(a);
		if(aa != null) {
			SimpleMailMessage smm = new SimpleMailMessage();
			smm.setFrom("connecttoyourdoctor@gmail.com");
			smm.setTo(aa.getPatient_id().getLogin_id().getUserName(),aa.getDoctor_id().getLogin_id().getUserName());
			smm.setSubject("Appointment Cancelled");			
			smm.setText("Appointment Cancelled \nCancelled By : "+aa.getCancelledBy()+"\nAppointment Date & Time : "+aa.getAppointmentDate()+" "+
			aa.getAppointmentTime()+"\nDoctor Details : \nDoctor Name :" + aa.getDoctor_id().getFirstName()+" "+aa.getDoctor_id().getLastName()+
			" (Speciality : "+aa.getDoctor_id().getSpeciality()+")\nPatient Details : \nPatient Name : "+aa.getPatient_id().getFirstName()+" "+aa.getPatient_id().getLastName()
			+" (Mobile Number : "+aa.getPatient_id().getMobileNumber()+")\nLocation : "+aa.getDoctor_id().getArea_id().getAreaName()+" "+
			aa.getDoctor_id().getArea_id().getCity_id().getCityName()+" "+aa.getDoctor_id().getArea_id().getCity_id().getState_id().getStateName());
			javaMailSender.send(smm);
			return aa;
		}
		else {
			return null;
		}
	}

//	public List<Appointment> getAppointmentHistoryByDoctorId(Doctor d, Date date1) {
//		return appointmentRepository.getAppointmentHistoryByDoctorId(d,date1);
//	}
	
	public List<Appointment> getAppointmentHistoryByDoctorId(Doctor d) {
		String pattern = "yyyy-MM-dd";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		String date = simpleDateFormat.format(new Date());
		System.out.println(date);
		Date date1 = null;
		try {
			date1 = new SimpleDateFormat("yyyy-MM-dd").parse(date);
		}catch(ParseException e) {
			e.printStackTrace();
		}
		System.out.println(date1);
		return appointmentRepository.getAppointmentHistoryByDoctorId(d,date1);
	}

	public List<Object> getBookedAppointmentsByDoctorIdandDate(Doctor d, Date date) {
		return appointmentRepository.getBookedAppointmentsByDoctorIdandDate(d,date);
	}

	public List<Appointment> getCurrentAppointmentsByPatientId(Patient p) {
		String pattern = "yyyy-MM-dd";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		String date = simpleDateFormat.format(new Date());
		System.out.println(date);
		Date date1 = null;
		try {
			date1=new SimpleDateFormat("yyyy-MM-dd").parse(date);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		System.out.println(date1);
		return appointmentRepository.getCurrentAppointmentsByPatientId(p,date1);
	}

	public List<Appointment> getAppointmentHistoryByPatientId(Patient p) {
		String pattern = "yyyy-MM-dd";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		String date = simpleDateFormat.format(new Date());
		System.out.println(date);
		Date date1 = null;
		try {
			date1=new SimpleDateFormat("yyyy-MM-dd").parse(date);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(date1);
		return appointmentRepository.getAppointmentHistoryByPatientId(p,date1);
	}

}














