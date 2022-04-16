package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Doctor;
import com.example.demo.entities.DoctorTimeTable;

@Repository
public interface DoctorTimeTableRepository extends JpaRepository<DoctorTimeTable, Integer> {
	
	@Query("select dtt from DoctorTimeTable dtt where doctor_id = :d")
	public List<DoctorTimeTable> getDoctorTimeTableByDoctorId(Doctor d);

	@Query("select dtt from DoctorTimeTable dtt where doctor_id = :d and weekday = :day")
	public DoctorTimeTable getAppointmentsForDayByDoctorIdAndDay(Doctor d, String day);
	
}




