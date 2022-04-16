import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function PatientRegistration(){
    const navigate = useNavigate();
    const [data,setData] = useState({
        userName:"",
        password:"",
        firstName:"",
        lastName:"",
        mobileNumber:"",
        gender:"",
        bloodGroup:"",
        dob:""
    });

    const [Error,setError] = useState({
        userNameError:"",
        passwordError:"",
        firstNameError:"",
        lastNameError:"",
        mobileNumberError:"",
        genderError:"",
        bloodGroupError:"",
        dobError:""
    });

    const [flag,setFlag]=useState({
        userName:false,
        password:false,
        firstName:false,
        lastName:false,
        mobileNumber:false,
        gender:false,
        bloodGroup:false,
        dob:false,
    });

    const changeHandler = (e) => {
        setData((data)=>({
            ...data,
            [e.target.name]:e.target.value
        }));
    }

    const refreshPage = (e) => {
        window.location.reload();
      };

    const validateEmail=(e)=> {
        let email = e.target.value;
        let emailRegex = new RegExp( /^[A-Za-z0-9._-]+@[A-Za-z0-9._-]+\.[A-Za-z]{2,4}$/);
        if(emailRegex.test(email) === true ) {
             setError({...Error,userNameError:""});
             setFlag({...flag,userName:true});
        }
        else {
            setError({...Error,userNameError: "Email format should be 'abc@gmail.com' and it can include (A-Z a-z 0-9 . _ -)"});
            setFlag({...flag,userName:false});
        }
    }

    const validatePassword=(e)=> {
        let pass = e.target.value;
        let passRegex = new RegExp(  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{8,16}$/);
        if(passRegex.test(pass) === true) {
            setError({...Error,passwordError:""});
            setFlag({...flag,password:true});
        }
        else {
           setError({...Error,passwordError: "Password must be alphanumeric and should contains at least a special character with min length 8 and max length 16"});
           setFlag({...flag,password:false});
        }
    }

    const validateFirstName=(e)=>{
        let name = e.target.value;
        if(name === ""){
            setError({...Error,firstNameError:"Please enter First Name"});
            setFlag({...flag,firstName:false});
        }
        else{
            setError({...Error,firstNameError:""});
            setFlag({...flag,firstName:true});
        }
    }

    const validateLastName=(e)=>{
        let name = e.target.value;
        if(name === ""){
            setError({...Error,lastNameError:"Please enter Last Name"});
            setFlag({...flag,lastName:false});
            console.log(flag.lastName);
        }
        else{
            setError({...Error,lastNameError:""});
            setFlag({...flag,lastName:true});
            console.log(flag.lastName);
        }
    }

    const validateMobileNumber=(e)=>{
        let mobileNumber = e.target.value;
        let mnRegex = new RegExp(  /^[0-9]{10}$/);
        if(mnRegex.test(mobileNumber) === true){
            setError({...Error,mobileNumberError:""});
            setFlag({...flag,mobileNumber:true});
        }
        else{
            setError({...Error,mobileNumberError:"Mobile Number should be 10 digits without +91 or 0"});
            setFlag({...flag,mobileNumber:false});
        }
    }

    // const validateGenger=(e)=>{
    //     let gender = e.target.name;
    //     if(gender.checked){
    //         setError({...Error,gender_error:""});
    //     }
    //     else{
    //         setError({...Error,gender_error:"Gender must be selected"});
    //     }
    // }

    const validateDob=(e)=>{
        let dob = e.target.value;
        if(dob === ""){
            setError({...Error,dobError:"Please enter BirthDate"});
            setFlag({...flag,dob:false});
        }
        else{
            setError({...Error,dobError:""});
            setFlag({...flag,dob:true});
        }
    }

    const validateBloodGroup=(e)=>{
        let bg = e.target.value;
        if(bg === ""){
            setError({...Error,bloodGroupError:"Please select Blood Group"});
            setFlag({...flag,bloodGroup:false});
        }
        else{
            setError({...Error,bloodGroupError:""});
            setFlag({...flag,bloodGroup:true});
        }
    }

    const submitData=(e)=>{
        // if(data.gender===""){
        //     setError({...Error,gender_error:"Please select gender"})
        //     setFlag({...flag,gender:false})
        //     return;
        // }else{
        //     setError({...Error,gender_error:""})
        //     setFlag({...flag,gender:true})
        // }
        e.preventDefault();
        //console.log(flag.userName+" "+flag.password+" "+flag.firstName+" "+flag.lastName+" "+flag.mobileNumber+" "+flag.dob+" "+flag.bloodGroup);
        if(flag.userName&&flag.password&&flag.firstName&&flag.lastName&&flag.mobileNumber&&flag.dob&&flag.bloodGroup)
            {
                const reqOptions ={
                    method : 'POST',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body : JSON.stringify({
                        userName: data.userName,
                        password: data.password,
                        firstName:data.firstName,
                        lastName:data.lastName,
                        mobileNumber:data.mobileNumber,
                        gender:data.gender,
                        bloodGroup:data.bloodGroup,
                        dob:data.dob
                    })
                }
                fetch("http://localhost:8080/savepatient",reqOptions)
                .then(resp=>resp.text())
                .then(data=> {if(data.length != 0)
                    {
                        alert("Registration successful!!!");
                        navigate('/login');
                    }
                    else{
                        alert("Registration Failed!!!");
                        navigate('/signup');
                    }
                })
            }else{
                alert("All fields are compulsory and must follow guidelines");
                // window.location.reload();
                navigate('/signup');
            }
    }


    return(
        <div>
        
        <br/><br/>
        <div className = "container" style={{marginBottom : "50px"}}>
        <div className = "row my-4">
            <div className = "card col-md-6 offset-md-3 offset-md-1">
            <h2 className='text-center'>Patient Registration </h2>
    
            <form method="POST">
                <div className = "form-group">
                    <label><b> User Name: </b></label>
                    <input type="text" placeholder="User Name" name="userName" className="form-control" 
                        value={data.userName} onChange={changeHandler} onBlur={validateEmail}/>
                        <span className="text text-danger">{Error.userNameError}</span>
                </div>

                <div style={{ marginTop: '10px' }} className = "form-group">
                    <label><b>  Password: </b></label>
                    <input type="password" placeholder="Password" name="password" className="form-control" 
                        value={data.password} onChange={changeHandler} onBlur={validatePassword}/>
                        <span className="text text-danger">{Error.passwordError}</span>
                </div >

                <div style={{ marginTop: '10px' }} className = "form-group">
                    <label><b>  first Name: </b></label>
                    <input type="text" placeholder="First Name" name="firstName" className="form-control" 
                        value={data.firstName} onChange={changeHandler} onBlur={validateFirstName}/>
                        <span className="text text-danger">{Error.firstNameError}</span>
                </div>

                <div style={{ marginTop: '10px' }} className = "form-group">
                    <label><b>  Last Name: </b></label>
                    <input type="text" placeholder="Last Name" name="lastName" className="form-control" 
                        value={data.lastName} onChange={changeHandler} onBlur={validateLastName}/>
                        <span className="text text-danger">{Error.lastNameError}</span>
                </div >

                <div style={{ marginTop: '10px' }} className = "form-group">
                    <label><b>  User mobileNumber: </b></label>
                    <input type="text" placeholder="User mobileNumber" name="mobileNumber" className="form-control" 
                        value={data.mobileNumber} onChange={changeHandler} onBlur={validateMobileNumber}/>
                         <span className="text text-danger">{Error.mobileNumberError}</span>
                </div>
    
                <div style={{ marginTop: '10px' }} className = "form-group" onChange={changeHandler} >
                    <label><b>  Gender: </b></label>
                    <input style={{ marginLeft: '10px' }} type="radio" value="Male" name="gender" /> Male
                    <input style={{ marginLeft: '10px' }} type="radio" value="Female" name="gender" /> Female
                    <input style={{ marginLeft: '10px' }} type="radio" value="Other" name="gender" /> Other
                    <span className="text text-danger">{Error.genderError}</span>
                </div>

                <div style={{ marginTop: '10px' }} className = "form-group">
                    <label><b>  Blood Group: </b></label>
                    <select style={{ marginLeft: '10px' }} value={data.bloodGroup} name="bloodGroup" onChange={changeHandler} onBlur={validateBloodGroup}>
                        <option value="">Select</option>                           
                        <option value="A+">A+</option>
                        <option value="B+">B+</option>
                        <option value="O+">O+</option>
                        <option value="AB+">AB+</option>
                        <option value="A-">A-</option>
                        <option value="B-">B-</option>
                        <option value="O-">O-</option>
                        <option value="AB-">AB-</option>
                    </select>
                    <span className="text text-danger">{Error.bloodGroupError}</span>
                </div>
    
                <div style={{ marginTop: '10px' }} className = "form-group">
                    <label><b>  Date of Birth: </b></label>
                    <input type="date" placeholder="Date Of Birth" name="dob" className="form-control" 
                        value={data.dob} onChange={changeHandler} onBlur={validateDob}/>
                        <span className="text text-danger">{Error.dobError}</span>
                </div >

                <div style={{marginTop: "10px"}}>
                    <button className="btn btn-success" onClick={submitData}>Register</button>
                    <button type="button" className="btn btn-primary" style={{marginLeft: "10px"}} onClick={refreshPage}>Reset</button>
                    <button className="btn btn-danger" onClick={() => navigate("/")} style={{marginLeft: "10px"}}>Cancel</button> 
                </div>
    
            </form>
    
            </div>
        </div>
        </div>
        </div>
      );

}

export default PatientRegistration;