import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function PatientCurrentAppointments(){
    const navigate = useNavigate();
    const [patientId,setPatientId]=useState("");
    const [appointments,setAppointments]=useState([]);

    useEffect(() => {
        let pat= JSON.parse(sessionStorage.getItem("patientdetails"));
        setPatientId(pat.patientId);
        console.log(pat.patientId);
    },[]);

    const logout=()=>{
        sessionStorage.removeItem("patientdetails");
        navigate("/");
    }

    const currentappointments=()=>{
        console.log(patientId);
        fetch("http://localhost:8080/currentappointmentsbypatient/"+patientId)
        .then(r => r.json())
        .then(d => {console.log(d);setAppointments(d)})
    }

    const cancel=(ev)=>{
        const reqOptions ={
            method : 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body : JSON.stringify({
                appointmentId:ev.appointmentId,
                appointmentDate : ev.appointmentDate,
		        appointmentTime : ev.appointmentTime,
                appointmentType:ev.appointmentType,
		        doctor_id : ev.doctor_id,
		        patient_id : ev.patient_id,
                status:"cancelled",
                cancelledBy:"Patient"
            })
        }
        fetch("http://localhost:8080/cancelappointment",reqOptions)
        .then(resp=>resp.text())
        .then(data=> {if(data.length != 0)
            {
                alert("Appointment cancelled!");
                navigate('/patientdashboard');
            }
            else{
                alert("Appointment cancel Failed!!!");
                window.location.reload();
            }
        })
    }


    return(
        <div className="container my-4" style={{marginBottom : "50px"}}>
            <button className="btn btn-danger" onClick={logout} style={{float:"right",marginTop:"10px",marginRight:"10px"}}>Logout</button>
            <button  className='btn btn-secondary' style={{float:"right",marginTop:"10px",marginRight:"10px"}} onClick={() => navigate("/patientdashboard")}>Go Back</button> 
        <br></br>                 
        <div>
                    <button className="btn btn-primary" onClick={currentappointments}>Show Current Appointments</button>
                    <h3>Patient Appointment List</h3>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-light">
                        <tr>
                            <th>Appointment Date</th>
                            <th>Appointment Time</th>
                            <th>Appointment Type</th>
                            <th>Appointment Status</th>
                            <th>Doctor Name</th>
                            <th>Doctor Speciality</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {appointments.map((v) => {
                            return (
                                <tr>
                                    <td>{v.appointmentDate}</td>
                                    <td>{v.appointmentTime}</td>
                                    <td>{v.appointmentType}</td>
                                    <td>{v.status}</td>
                                    <td>{v.doctor_id.firstName} {v.doctor_id.lastName}</td>
                                    <td>{v.doctor_id.speciality}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => cancel(v)}>Cancel Appointment</button>
                                    </td>
                                </tr>
                            );
                            })}
                        </tbody>
                    </table>
        </div>
        </div>
    );

}

export default PatientCurrentAppointments;