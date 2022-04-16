import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';

function BookDoctorAppointmentSlot(){
    const navigate = useNavigate();
    const [timeslot, setTimeSlots] = useState([]);
    const [date, setDate] = useState("");
    const [empty, setEmpty] = useState([]);
    const [slot,setSlot] = useState([]);
    const [doctor,setDoctor] = useState({});
    const [patient,setPatient]=useState({});

    useEffect(() => {    
        let doctor= JSON.parse(sessionStorage.getItem("doctordetails"));
        setDoctor(doctor);
        // console.log(doctor);
        let patient = JSON.parse(sessionStorage.getItem("patientdetails"));
        setPatient(patient);
        //console.log(patient);
    },[]);

    const logout=()=>{
        //sessionStorage.removeItem("doctor");
        sessionStorage.removeItem("doctordetails");
        navigate("/");
    }

    const minDate=()=>{
        var today,dd,mm,yyyy;
        today = new Date();
        dd=today.getDate()+1;
        if(dd<10){
            dd=0+""+dd;
        }
        mm=today.getMonth()+1;
        if(mm<10){
            mm=0+""+mm;
        }
        yyyy=today.getFullYear();
        return yyyy+"-"+mm+"-"+dd;
    }

    const maxDate=()=>{
        var today,dd,mm,yyyy;
        today = new Date();
        dd=today.getDate()+14;
        if(dd<10){
            dd=0+""+dd;
        }
        mm=today.getMonth()+1;
        if(mm<10){
            mm=0+""+mm;
        }
        yyyy=today.getFullYear();
        return yyyy+"-"+mm+"-"+dd;
    }

    const appointments=(e)=>{
        console.log(e);
        var today,dd,mm,yyyy;
        today = new Date();
        mm=today.getMonth()+1;
        if(mm<10){
            mm=0+""+mm;
        }
        yyyy=today.getFullYear();
        setDate(e.target.value);
        // console.log("dd-"+mm+"-"+yyyy);
        if(e.target.value === "dd-"+mm+"-"+yyyy){
            setEmpty("Please select valid date!!!")
        }
        else{
            //fetch("http://localhost:8080/getappointmentsforday/"+doctor.doctorId+"/"+e.target.value)
            fetch("http://localhost:8080/getappointmentsforday/"+doctor.doctorId+"/"+e.target.value)
            .then(r => r.json())
            .then(d => {/*console.log(d);*/setTimeSlots(d)}
            );
        }
    }

    const getTimeSlots=()=>{
        if(timeslot.length==0){
            setEmpty("Doctor Appointments not available for current selection!");
            setSlot([]);
        }else{
            setEmpty("");
            setSlot(timeslot);
            // setEmpty(time);
        }
    }

    const book=(e)=>{
        const reqOptions ={
            method : 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body : JSON.stringify({
                appointmentDate : date,
		        appointmentTime : e,
                appointmentType:"walk-in",
		        doctor_id : doctor,
		        patient_id : patient,
                status:"scheduled"
            })
        }
        fetch("http://localhost:8080/saveappointment",reqOptions)
        .then(resp=>resp.text())
        .then(data=> {if(data.length != 0)
            {
                alert("Appointment Booked!");
                navigate('/patientdashboard');
            }
            else{
                alert("Appointment Failed!!!");
                window.location.reload();
            }
        })
    }


    return(
        <div className="container-fluid" style={{marginBottom : "50px"}}>
            <button className="btn btn-danger" onClick={logout} style={{float:"right",marginTop:"10px",marginRight:"10px"}}>Logout</button>
            <button  className='btn btn-secondary' style={{float:"right",marginTop:"10px",marginRight:"10px"}} onClick={() => navigate("/patientdashboard")}>Go Back</button> 
        <br/><br/>

            <h2 className="font-weight-bold offset-4">Select Day</h2>
            <label><b>Select a Date :</b></label>

            <input type="date" onChange={appointments} min={minDate()} max={maxDate()} name="date" />

             <button  className='btn btn-primary' style={{marginLeft:"10px"}} onClick={getTimeSlots}>View Time Slots</button>
             <h1 className="font-weight-bold offset-4">Available Appointments</h1>
               
                <p className="text text-danger offset-4"><b>{empty}</b></p>
                
            <Table striped bordered hover variant="dark" >
            <thead >
                 <tr>
                    <th>Slot</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {
            slot.map((v)=>{
                return (
            <tr>
                <td>{v}</td>
                <td>
                <button className="btn btn-primary" onClick={()=>book(v)}  >Book Appointment</button>
                </td>
            </tr>
            )})
            
            }
            </tbody>
            </Table>
        </div>
    );

}

export default BookDoctorAppointmentSlot;