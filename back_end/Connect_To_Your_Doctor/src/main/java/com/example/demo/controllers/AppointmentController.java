package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Appointment;
import com.example.demo.entities.Doctor;
import com.example.demo.entities.Patient;
import com.example.demo.services.AppointmentService;
import com.example.demo.services.DoctorService;
import com.example.demo.services.PatientService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AppointmentController {
	
	@Autowired
	AppointmentService appointmentService;
	
	@Autowired
	DoctorService doctorService;
	
	@Autowired
	PatientService patientService;

	@GetMapping("/getallappointments")
	public List<Appointment> getAllAppointments(){
		return appointmentService.getAllAppointments();
	}
	
	@PostMapping("/saveappointment")
	public Appointment saveAppointment(@RequestBody Appointment a) {
		System.out.println("saveAppointment"+a.getAppointmentType()+" "+a.getDoctor_id()+""+a.getPatient_id());
		return appointmentService.saveAppointment(a);
	}
	
//	@GetMapping("/appointmentsbydoctorid/{id}")
//	public List<Appointment> getAppointmentsByDoctorId(@PathVariable int id){
//		Doctor d = doctorService.getDoctorByDoctorId(id);
//		String pattern = "yyyy-MM-dd";
//		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
//		String date = simpleDateFormat.format(new Date());
//		System.out.println(date);
//		Date date1 = null;
//		try {
//			date1 = new SimpleDateFormat("yyyy-MM-dd").parse(date);
//		}catch (ParseException e) {
//			e.printStackTrace();
//		}
//		System.out.println(date1);
//		return appointmentService.getAppointmentsByDoctorId(d, date1);
//	}
	
	@GetMapping("/appointmentsbydoctorid/{id}")
	public List<Appointment> getAppointmentsByDoctorId(@PathVariable int id){
		Doctor d = doctorService.getDoctorByDoctorId(id);
		return appointmentService.getAppointmentsByDoctorId(d);
	}
	
	@PostMapping("/cancelappointment")
	public Appointment cancelAppointment(@RequestBody Appointment a) {
		System.out.println("cancelAppointment"+a.getPatient_id()+""+a.getDoctor_id());
		return appointmentService.cancelAppointment(a);
	}
	
//	@GetMapping("/getappointmenthistorybydoctorid/{id}")
//	public List<Appointment> getAppointmentHistoryByDoctorId(@PathVariable int id){
//		Doctor d = doctorService.getDoctorByDoctorId(id);
//		String pattern = "yyyy-MM-dd";
//		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
//		String date = simpleDateFormat.format(new Date());
//		System.out.println(date);
//		Date date1 = null;
//		try {
//			date1 = new SimpleDateFormat("yyyy-MM-dd").parse(date);
//		}catch(ParseException e) {
//			e.printStackTrace();
//		}
//		System.out.println(date1);
//		return appointmentService.getAppointmentHistoryByDoctorId(d, date1);
//	}
	
	@GetMapping("/getappointmenthistorybydoctorid/{id}")
	public List<Appointment> getAppointmentHistoryByDoctorId(@PathVariable int id){
		Doctor d = doctorService.getDoctorByDoctorId(id);
		return appointmentService.getAppointmentHistoryByDoctorId(d);
	}
	
	@GetMapping("/currentappointmentsbypatient/{id}")
	public List<Appointment> getCurrentAppointmentsByPatientId(@PathVariable int id){
		Patient p = patientService.getOnePatientById(id);
		return appointmentService.getCurrentAppointmentsByPatientId(p);
	}
	
	@GetMapping("/getappointmenthistorybypatientid/{id}")
	public List<Appointment> getAppointmentHistoryByPatientId(@PathVariable int id){
		Patient p = patientService.getOnePatientById(id);
		return appointmentService.getAppointmentHistoryByPatientId(p);
	}
	
	
}












