import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminViewDoctor(){
    const [doctor, setDoctor] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/getalldoctors")
        .then(r => r.json())
        .then(d => setDoctor(d))
    },[]);

    const deactivate = (e) =>{
        const reqOptions = {
            method : 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body : JSON.stringify({
                loginId: e.login_id.loginId,
                userName: e.login_id.userName,
                password: e.login_id.password,
                userType: e.login_id.userType,
                status: "inactive"
            })
        }
        fetch("http://localhost:8080/updateuser",reqOptions)
        .then(resp => resp.text())
        .then(data => {if(data.length != 0)
            {
                alert("status updated");
                window.location.reload();
            }
            else{
                alert("Status Updation Failed!");
            }
        })
    }

    const activate = (e) => {
        const reqOptions = {
            method : 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body : JSON.stringify({
                loginId: e.login_id.loginId,
                userName: e.login_id.userName,
                password: e.login_id.password,
                userType: e.login_id.userType,
                status: "active"
            })
        }
        fetch("http://localhost:8080/updateuser",reqOptions)
        .then(resp => resp.text())
        .then(data => {if(data.length != 0)
            {
                alert("status updated");
                window.location.reload();
            }
            else{
                alert("Status Updation Failed!");
            }
        })
    }

    const logout = () => {
        sessionStorage.removeItem("admindetails");
        navigate("/");
    }

    return(
        <div className="container my-4" style={{marginBottom : "50px"}}>
            <button className="btn btn-danger" onClick={logout} style={{float:"right",marginTop:"10px",marginRight:"10px"}}>Logout</button>
            <button  className='btn btn-secondary' style={{float:"right",marginTop:"10px",marginRight:"10px"}} onClick={() => navigate("/admindashboard")}>Go Back</button> 
            <br/><br/>
                <div>
                    <h3>Doctor List</h3>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-light">
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Mobile Number</th>
                            <th>Gender</th>
                            <th>Date Of Birth</th>
                            <th>Graduation</th>
                            <th>Post Graduation</th>
                            <th>Speciality</th>
                            <th>Fees</th>
                            <th>Area</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Status </th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {doctor.map((v) => {
                                    return(
                                <tr>
                            <td>{v.firstName}</td>
                            <td>{v.lastName}</td>
                            <td>{v.mobileNumber}</td>
                            <td>{v.gender}</td>
                            <td>{v.dob}</td>
                            <td>{v.graduation}</td>
                            <td>{v.postGraduation}</td>
                            <td>{v.speciality}</td>
                            <td>{v.fees}</td>
                            <td>{v.area_id.areaName}</td>
                            <td>{v.area_id.city_id.cityName}</td>
                            <td>{v.area_id.city_id.state_id.stateName}</td>
                            <td>{v.login_id.status}</td>
                            <td>
                                <button style={{ display: v.login_id.status === 'active' ? 'block' : 'none' }} className="btn btn-primary" onClick={() => deactivate(v)}>Deactivate</button>
                                <button style={{ display: v.login_id.status === 'inactive' ? 'block' : 'none' }} className="btn btn-primary" onClick={() => activate(v)}>Activate</button>
                            </td>
                                </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>)
}

export default AdminViewDoctor;