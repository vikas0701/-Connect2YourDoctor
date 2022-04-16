package com.example.demo.controllers;

import java.sql.Date;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Doctor;
import com.example.demo.entities.DoctorTimeTable;
import com.example.demo.services.DoctorService;
import com.example.demo.services.DoctorTimeTableService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class DoctorTimeTableController {

	@Autowired
	DoctorTimeTableService doctorTimeTableService;
	
	@Autowired
	DoctorService doctorService;
	
	@GetMapping("/getalltimetable")
	public List<DoctorTimeTable> getAllTimeTable(){
		return doctorTimeTableService.getAllTimeTable();
	}
	
	@GetMapping("/gettimetablebyid/{id}")
	public DoctorTimeTable getTimeTableById(@PathVariable int id) {
		return doctorTimeTableService.getTimeTableById(id);
	}
	
	@GetMapping("/getdoctortimetablebydoctorId/{id}")
	public List<DoctorTimeTable> getDoctorTimeTableByDoctorId(@PathVariable int id){
		Doctor d = doctorService.getDoctorByDoctorId(id);
		return doctorTimeTableService.getDoctorTimeTableByDoctorId(d);
	}
	
	@PostMapping("/updatetimetable")
	public DoctorTimeTable updateTimeTable(@RequestBody DoctorTimeTable dtt) {
		return doctorTimeTableService.updateTimeTable(dtt);
	}
	
	@GetMapping("/getappointmentsforday/{id}/{date}")
	public List<LocalTime> getAppointmentsForDayByDoctorIdAndDay(@PathVariable int id,@PathVariable Date date){
		System.out.println(id+" "+date);
		Doctor d = doctorService.getDoctorByDoctorId(id);
		return doctorTimeTableService.getAppointmentsForDayByDoctorIdAndDay(d,date);
	}
}



























