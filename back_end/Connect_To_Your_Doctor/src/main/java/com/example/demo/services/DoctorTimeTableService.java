package com.example.demo.services;

import java.sql.Date;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Doctor;
import com.example.demo.entities.DoctorTimeTable;
import com.example.demo.repositories.DoctorTimeTableRepository;

@Service
public class DoctorTimeTableService {
	
	@Autowired
	DoctorTimeTableRepository doctorTimeTableRepository;
	
	@Autowired
	AppointmentService appointmentService;
	
	public List<DoctorTimeTable> getAllTimeTable(){
		return doctorTimeTableRepository.findAll();
	}
	
	public DoctorTimeTable getTimeTableById(int id) {
		return doctorTimeTableRepository.getById(id);
	}
	
	public List<DoctorTimeTable> getDoctorTimeTableByDoctorId(Doctor d) {
		return doctorTimeTableRepository.getDoctorTimeTableByDoctorId(d);
	}

	public DoctorTimeTable updateTimeTable(DoctorTimeTable dtt) {
		try {
			return doctorTimeTableRepository.save(dtt);
		}catch(Exception e) {
			return null;
		}
	}
	
//	public DoctorTimeTable saveTimeTable(DoctorTimeTable dtt) {
//		try {
//			return doctorTimeTableRepository.save(dtt);
//		}catch(Exception e) {
//			return null;
//		}
//	}
	
	
	public List<LocalTime> getAppointmentsForDayByDoctorIdAndDay(Doctor d, Date date) 
	{
		try {
			@SuppressWarnings("deprecation")
			int da = date.getDay();
			String day = null;
			switch(da) {
			case 0:day="Sunday";break;
			case 1:day="Monday";break;
			case 2:day="Tuesday";break;
			case 3:day="Wednesday";break;
			case 4:day="Thursday";break;
			case 5:day="Friday";break;
			case 6:day="Saturday";break;
			}
			List<LocalTime> slots = new ArrayList<>();
			DoctorTimeTable dtt = doctorTimeTableRepository.getAppointmentsForDayByDoctorIdAndDay(d,day);
			if(dtt.getStatus().equals("available")) {
				LocalTime st = dtt.getStartTime();
				LocalTime et = dtt.getEndTime();
				LocalTime temp = st;
				while( temp.isBefore(et)) {
					slots.add(temp);
					temp=temp.plus(dtt.getSlotDuration(),ChronoUnit.MINUTES);
				}
				slots.remove(dtt.getBreakTime());
				List<Object> bookedAppointments = appointmentService.getBookedAppointmentsByDoctorIdandDate(d, date);
				ListIterator<Object> iter = bookedAppointments.listIterator();
				while(iter.hasNext()) {
					slots.remove(iter.next());
			    }
				return slots;
			}
			else {
				return slots;
			}
		} catch(Exception e) {
			return null;
		}
	}
	
	
	
	
	
	
	
}
























