package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Login;
import com.example.demo.services.LoginService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class LoginController {
	
	@Autowired
	LoginService loginService;
	
	@GetMapping("/getallusers")
	public List<Login> getAllUsers(){
		return loginService.getAllUsers();
	}
	
	@GetMapping("getuserbyloginid/{id}")
	public Login getUserByLoginId(@PathVariable int id) {
		return loginService.getUserByLoginId(id);
	}

	@PostMapping("/logincheck")
	public Object loginCheck(@RequestBody Login l) {
		return loginService.loginCheck(l.getUserName(),l.getPassword());
	}
	
	@PostMapping("/updateuser")
	public Login updateUser(@RequestBody Login l) {
		System.out.println("updateUser"+l.getPassword()+" "+l.getLoginId()+" "+l.getStatus()+" "+l.getUserName()+" "+l.getUserType());
		return loginService.updateUser(l);
	}
	
	@PostMapping("/forgotpassword")
	public Login forgotPassword(@RequestBody Login l) {
		return loginService.forgotPassword(l.getUserName());
	}
	
}








