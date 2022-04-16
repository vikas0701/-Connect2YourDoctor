package com.example.demo.entities;

import java.sql.Date;
import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "appointment")
public class Appointment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="appointment_id")
	private int appointmentId;
	
	@Column(name="appointment_date")
	Date appointmentDate;
	
	@Column(name="appointment_time")
	LocalTime appointmentTime;
	
	@Column(name="appointment_type")
	String appointmentType;
	
	@ManyToOne
	@JoinColumn(name="doctor_id")
	Doctor doctor_id;
	
	@ManyToOne
	@JoinColumn(name="patient_id")
	Patient patient_id;
	
	@Column
	String status;
	
	@Column(name="cancelled_by")
	String cancelledBy;

	public Appointment() {
		super();
	}

	public Appointment(int appointmentId, Date appointmentDate, LocalTime appointmentTime, String appointmentType,
			Doctor doctor_id, Patient patient_id, String status, String cancelledBy) {
		super();
		this.appointmentId = appointmentId;
		this.appointmentDate = appointmentDate;
		this.appointmentTime = appointmentTime;
		this.appointmentType = appointmentType;
		this.doctor_id = doctor_id;
		this.patient_id = patient_id;
		this.status = status;
		this.cancelledBy = cancelledBy;
	}

	public Appointment(Date appointmentDate, LocalTime appointmentTime, String appointmentType, Doctor doctor_id,
			Patient patient_id, String status, String cancelledBy) {
		super();
		this.appointmentDate = appointmentDate;
		this.appointmentTime = appointmentTime;
		this.appointmentType = appointmentType;
		this.doctor_id = doctor_id;
		this.patient_id = patient_id;
		this.status = status;
		this.cancelledBy = cancelledBy;
	}

	public int getAppointmentId() {
		return appointmentId;
	}

	public void setAppointmentId(int appointmentId) {
		this.appointmentId = appointmentId;
	}

	public Date getAppointmentDate() {
		return appointmentDate;
	}

	public void setAppointmentDate(Date appointmentDate) {
		this.appointmentDate = appointmentDate;
	}

	public LocalTime getAppointmentTime() {
		return appointmentTime;
	}

	public void setAppointmentTime(LocalTime appointmentTime) {
		this.appointmentTime = appointmentTime;
	}

	public String getAppointmentType() {
		return appointmentType;
	}

	public void setAppointmentType(String appointmentType) {
		this.appointmentType = appointmentType;
	}

	public Doctor getDoctor_id() {
		return doctor_id;
	}

	public void setDoctor_id(Doctor doctor_id) {
		this.doctor_id = doctor_id;
	}

	public Patient getPatient_id() {
		return patient_id;
	}

	public void setPatient_id(Patient patient_id) {
		this.patient_id = patient_id;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getCancelledBy() {
		return cancelledBy;
	}

	public void setCancelledBy(String cancelledBy) {
		this.cancelledBy = cancelledBy;
	}
	
}




















