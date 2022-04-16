import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function DoctorCurrentAppointments(){
    const navigate = useNavigate();
    const [doctorId, setDoctorId] = useState("");
    const [appointments,setAppointments]=useState([]);

    useEffect(() => {
        let doc= JSON.parse(sessionStorage.getItem("doctordetails"));
        setDoctorId(doc.doctorId);
    },[]);

    const logout=()=>{
        sessionStorage.removeItem("doctordetails");
        navigate("/");
    }

    const currentappointments=()=>{
        fetch("http://localhost:8080/appointmentsbydoctorid/"+doctorId)
        .then(r => r.json())
        .then(d => {console.log(d);setAppointments(d)})
    }

    const cancel=(ev)=>{
        // console.log(ev);
        // console.log(ev.appointmentId+""+ ev.appointmentDate+""+ ev.appointmentTime+ev.appointmentType+ev.doctorId+ev.patientId);
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
		        doctorId : ev.doctorId,
		        patientId : ev.patientId,
                status:"cancelled",
                cancelledBy:"Doctor"
            })
        }
        fetch("http://localhost:8080/cancelappointment",reqOptions)
        .then(resp=>resp.text())
        .then(data=> {if(data.length != 0)
            {
                alert("Appointment cancelled!");
                navigate('/doctor');
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
        <button  className='btn btn-secondary' style={{float:"right",marginTop:"10px",marginRight:"10px"}} onClick={() => navigate("/doctordashboard")}>Go Back</button> 
        <br/><br/>           
         <div>
                <button className="btn btn-primary" onClick={currentappointments}>Show Current Appointments</button>
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
                                <td>{v.patientId.patient_id}</td>
                                <td>{v.patientId.firstName} {v.patientId.lastName}</td>
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
    )

}

export default DoctorCurrentAppointments;