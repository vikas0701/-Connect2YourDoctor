package com.example.demo.entities;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "login")
public class Login {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int loginId;
	
	@Column(name = "user_name")
	private String userName;
	
	@Column(name = "password")
	private String password;
	
	@Column(name = "user_type")
	private String userType;
	
	@Column(name = "status")
	private String status;
	
	@JsonIgnoreProperties("login_id")
	@OneToOne(cascade = CascadeType.ALL, mappedBy = "login_id")
	private Patient patient;
	
	@JsonIgnoreProperties("login_id")
	@OneToOne(cascade = CascadeType.ALL, mappedBy = "login_id")
	private Doctor doctor;

	public Login() {
		super();
	}

	public Login(String userName, String password, String userType, String status) {
		super();
		this.userName = userName;
		this.password = password;
		this.userType = userType;
		this.status = status;
	}

	public Login(int loginId, String userName, String password, String userType, String status) {
		super();
		this.loginId = loginId;
		this.userName = userName;
		this.password = password;
		this.userType = userType;
		this.status = status;
	}
	
	//logincheck
	public Login(String userName, String password) {
		super();
		this.userName = userName;
		this.password = password;
	}

	public Login(String userName, String password, String userType) {
		super();
		this.userName = userName;
		this.password = password;
		this.userType = userType;
	}

	public int getLoginId() {
		return loginId;
	}

	public void setLoginId(int loginId) {
		this.loginId = loginId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	
	
	
}






