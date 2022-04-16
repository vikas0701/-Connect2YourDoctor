package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Area;
import com.example.demo.entities.Doctor;
import com.example.demo.entities.Login;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
	
	//fetch record with matching login id Object
	@Query("select d from Doctor d where login_id = :l")
	public Doctor getDoctorByLoginIdObject(Login l);

	@Query("select DISTINCT(d.speciality) from Doctor d")
	public List<Object> getAllDoctorsSpeciality();

	@Query("select  d from Doctor d where area_id = :a")
	public List<Doctor> getAllDoctorsByArea(Area a);

	@Query("select d from Doctor d where area_id = :a and speciality = :spec")
	public List<Doctor> getDoctorsByAreaAndApecialization(Area a, String spec);
	
//	@Query("select d from Doctor d where ")
//	public List<Doctor> getDoctorByState(int id);
	
//	@Query("select d from Doctor d where area_id in (select a.areaId from Area a where city_id = : c)")
//	public List<Doctor> getDoctorByCity(City c);
}
