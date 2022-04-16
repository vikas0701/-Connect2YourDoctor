import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage(){
    const navigate = useNavigate();
    const [data, setData] = useState({
        userName:"",
        password:"",
        loginError:""
    });

    const changeHandler = (e) => {
        setData((data)=>({
            ...data,
            [e.target.name]:e.target.value
        }));
    }

    const submitData = (e) => {
        if(data.userName === ''){
            alert("UserName cannot be empty");
            return;
        }
        if(data.password === ''){
            alert("Password cannot be empty");
            return;
        }
        e.preventDefault();
        const reqOptions = {
            method : 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body : JSON.stringify({
                userName: data.userName,
                password: data.password
            })
        }
        fetch("http://localhost:8080/logincheck",reqOptions)
        .then(resp => resp.text())
        .then(data => {if(data.length != 0)
            {
                const json = JSON.parse(data);
                console.log(json);
                if(json.userType == "Admin"){
                    sessionStorage.setItem("admindetails",JSON.stringify(json))
                    navigate("/admindashboard");
                }
                
                if(json.login_id.userType == "Patient"){
                    sessionStorage.setItem("patientdetails",JSON.stringify(json))
                    navigate("/patientdashboard");
                }

                if(json.login_id.userType == "Doctor"){
                    sessionStorage.setItem("doctordetails",JSON.stringify(json))
                    navigate("/doctordashboard");
                }
            }
            else{
                setData({loginError:"Wrong Username or Password! Try Again..."})
            }
        })
    }

    return(
        <div>
            <br/><br/>
            <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                    <h2 className='text-center'>Login</h2>
                    <form>
                        <div className = "form-group">
                            <label> User Name: </label>
                            <input type="email" placeholder="Enter Email Id" name="userName" className="form-control"
                            value={data.userName} onChange={changeHandler} />
                        </div>
                        <div className = "form-group">
                            <label> Password: </label>
                            <input type="password" placeholder="Password" name="password" className="form-control"
                            value={data.password} onChange={changeHandler} />
                        </div>
                        <div style={{marginTop: "10px", marginLeft:"200px"}}>
                            <button className="btn btn-success" onClick={submitData}>Login</button>
                            <button className="btn btn-danger" onClick={() => navigate("/")} style={{marginLeft: "10px"}}>Cancel</button> 
                        </div>
                    </form>
                    <a href="/forgotpassword">Forgot password? click here...</a>
                    <p className="text-danger">{data.loginError}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LoginPage;