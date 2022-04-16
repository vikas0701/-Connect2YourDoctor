import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminViewPatient(){
    const navigate = useNavigate();
    const [patient, setPatient] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/getallpatients")
        .then(r => r.json())
        .then(d => {console.log(d); setPatient(d)})
    },[]);

    const logout=()=>{
        sessionStorage.removeItem("admindetails");
        navigate("/");
    }

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

    return(
        <>
        <div className="container my-4" style={{marginBottom : "50px"}}>
            <button className="btn btn-danger" onClick={logout} style={{float:"right",marginTop:"10px",marginRight:"10px"}}>Logout</button>
            <button  className='btn btn-secondary' style={{float:"right",marginTop:"10px",marginRight:"10px"}} onClick={() => navigate("/admindashboard")}>Go Back</button> 
            <br/><br/>                
                <div>
                    <h3>Patient List</h3>
                <table className="table table-bordered">
                    <thead className="bg-dark text-light">
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Mobile Number</th>
                            <th>Gender</th>
                            <th>Date Of Birth</th>
                            <th>Blood Group</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patient.map((v) => {
                                 return (
                                    <tr>
                                        <td>{v.firstName}</td>
                                        <td>{v.lastName}</td>
                                        <td>{v.mobileNumber}</td>
                                        <td>{v.gender}</td>
                                        <td>{v.dob}</td>
                                        <td>{v.bloodGroup}</td>
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
        </div>
        </>
    )

} 

export default AdminViewPatient;