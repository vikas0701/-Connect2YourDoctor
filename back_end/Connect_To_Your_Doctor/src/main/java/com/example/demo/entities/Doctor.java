package com.example.demo.entities;

import java.sql.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "doctor")
public class Doctor {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "doctor_id")
	private int doctorId;
	
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "last_name")
	private String lastName;
	
	@Column(name = "mobile_number")
	private String mobileNumber;
	
	@Column
	private String gender;
	
	@Column
	private Date dob;
	
	@Column
	private String graduation;
	
	@Column(name = "post_graduation")
	private String postGraduation;
	
	@Column
	private String speciality;
	
	@Column
	private int fees;
	
	@JsonIgnoreProperties("doctor")
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "area_id")
	private Area area_id;
	
	@JsonIgnoreProperties("doctor")
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "login_id")
	private Login login_id;

	public Doctor() {
		super();
	}

	public Doctor(int doctorId, String firstName, String lastName, String mobileNumber, String gender, Date dob,
			String graduation, String postGraduation, String speciality, int fees, Area area_id, Login login_id) {
		super();
		this.doctorId = doctorId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.mobileNumber = mobileNumber;
		this.gender = gender;
		this.dob = dob;
		this.graduation = graduation;
		this.postGraduation = postGraduation;
		this.speciality = speciality;
		this.fees = fees;
		this.area_id = area_id;
		this.login_id = login_id;
	}

	public Doctor(String firstName, String lastName, String mobileNumber, String gender, Date dob, String graduation,
			String postGraduation, String speciality, int fees, Area area_id, Login login_id) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.mobileNumber = mobileNumber;
		this.gender = gender;
		this.dob = dob;
		this.graduation = graduation;
		this.postGraduation = postGraduation;
		this.speciality = speciality;
		this.fees = fees;
		this.area_id = area_id;
		this.login_id = login_id;
	}

	public int getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(int doctorId) {
		this.doctorId = doctorId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public String getGraduation() {
		return graduation;
	}

	public void setGraduation(String graduation) {
		this.graduation = graduation;
	}

	public String getPostGraduation() {
		return postGraduation;
	}

	public void setPostGraduation(String postGraduation) {
		this.postGraduation = postGraduation;
	}

	public String getSpeciality() {
		return speciality;
	}

	public void setSpeciality(String speciality) {
		this.speciality = speciality;
	}

	public int getFees() {
		return fees;
	}

	public void setFees(int fees) {
		this.fees = fees;
	}

	public Area getArea_id() {
		return area_id;
	}

	public void setArea_id(Area area_id) {
		this.area_id = area_id;
	}

	public Login getLogin_id() {
		return login_id;
	}

	public void setLogin_id(Login login_id) {
		this.login_id = login_id;
	}

}





























