import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function DoctorAppointmentHistory(){
    const navigate = useNavigate();
    const [doctorId,setDoctorId]=useState("");
    const [appointments,setAppointments]=useState([]);

    useEffect(() => {
        let doc= JSON.parse(sessionStorage.getItem("doctordetails"));
        setDoctorId(doc.doctorId);
    },[]);

    const logout=()=>{
        sessionStorage.removeItem("doctordetails");
        navigate("/");
    }

    const allAppointments=()=>{
        fetch("http://localhost:8080/getappointmenthistorybydoctorid/"+doctorId)
        .then(r => r.json())
        .then(d => setAppointments(d))
    }

    return(
        <div className="container my-4" style={{marginBottom : "50px"}}>
            <button className="btn btn-danger" onClick={logout} style={{float:"right",marginTop:"10px",marginRight:"10px"}}>Logout</button>
            <button  className='btn btn-secondary' style={{float:"right",marginTop:"10px",marginRight:"10px"}} onClick={() => navigate("/doctordashboard")}>Go Back</button> 
            <br/><br/>
                <div>
                <button className="btn btn-primary" onClick={allAppointments}>Show All Appointment</button>
                <h3>Doctor List</h3>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-light">
                        <tr>
                            <th>Appointment Date</th>
                            <th>Appointment Time</th>
                            <th>Appointment Type</th>
                            <th>Appointment Status</th>
                            <th>Patient Id</th>
                            <th>Patient Name</th>
                        </tr>
                        </thead>
                        <tbody>
                            {appointments.map((v) => {
                                return (
                                    <tr>
                                        <td>{v.appointmentDate}</td>
                                        <td>{v.appointmentTime}</td>
                                        <td>{v.appointmentType}</td>
                                        <td style={{ display: v.status === 'cancelled' ? 'block' : 'none' }}>{v.status}</td>
                                        <td style={{ display: v.status === 'scheduled' ? 'block' : 'none' }}>success</td>
                                        <td>{v.patient_id.patientId}</td>
                                        <td>{v.patient_id.firstName} {v.patient_id.lastName}</td>

                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
        </div>
    );

}

export default DoctorAppointmentHistory;