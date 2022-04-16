import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UpdateDoctorTimeTable(){
    const navigate = useNavigate();
    const [doctorId, setDoctorId] = useState("");
    const [TimeTable, setTimeTable] = useState([]);
    const [data, setData] = useState({
        doctorttId:"",
        doctorId:{},
        weekday:"",
        startTime:"",
        endTime:"",
        slotDuration:"",
        breakTime:""
    })

    useEffect(() => {
        let doc = JSON.parse(sessionStorage.getItem("doctordetails"));
        setDoctorId(doc.doctorId);
    },[]);

    const changeHandler = (e) => {
        setData((data) => ({
            ...data,
            [e.target.name]: e.target.value
        }));
    }

    const logout= () => {
        sessionStorage.removeItem("admindetails");
        navigate("/");
    }

    const getTimeTable = () => {
        fetch("http://localhost:8080/getdoctortimetablebydoctorId/"+doctorId)
        .then(r => r.json())
        .then(d => {setTimeTable(d)});
    }

    const update = (e) => {
        sessionStorage.setItem("daytimetable",JSON.stringify(e));
        navigate("/updatetimetablebyday");
    }

    const notAvailable = (e) => {
        const reqOptions ={
            method : 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body : JSON.stringify({
                ttId:e.ttId,
                doctor_id:e.doctor_id,
                weekday:e.weekday,
                startTime:e.startTime,
                endTime:e.endTime,
                slotDuration:e.slotDuration,
                breakTime:e.breakTime,
                status:"not available"
            })
        }
        fetch("http://localhost:8080/updatetimetable",reqOptions)
        .then(resp=>resp.text())
        .then(data=> {if(data.length != 0)
                        {
                            alert("Status Updated!");
                            window.location.reload()
                        }
                        else{
                            alert("Status Update Failed!")
                        }
                    })
    }

    const available = (e) => {
        const reqOptions ={
            method : 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body : JSON.stringify({
                ttId:e.ttId,
                doctor_id:e.doctor_id,
                weekday:e.weekday,
                startTime:e.startTime,
                endTime:e.endTime,
                slotDuration:e.slotDuration,
                breakTime:e.breakTime,
                status:"available"
            })
        }
        fetch("http://localhost:8080/updatetimetable",reqOptions)
        .then(resp=>resp.text())
        .then(data=> {if(data.length != 0)
                        {
                            alert("Status Updated!");
                            window.location.reload()
                        }
                        else{
                            alert("Status Update Failed!")
                        }
                    })
    }


    return(
        <div className="container my-4" style={{marginBottom : "50px"}}>
            <button className="btn btn-danger" onClick={logout} style={{float:"right",marginTop:"10px",marginRight:"10px"}}>Logout</button>
            <button  className='btn btn-secondary' style={{float:"right",marginTop:"10px",marginRight:"10px"}} onClick={() => navigate("/doctordashboard")}>Go Back</button> 
            <br/><br/>                
                <div>
                    <button className="btn btn-primary" onClick={getTimeTable}>Get TimeTable</button>
                    <h3>Doctor List</h3>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-light">
                        <tr>
                            <th>Weekday</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Slot Duration</th>
                            <th>Break Time</th>
                            <th>Status</th>
                            <th>Update</th>
                            <th>Change Status</th>
                        </tr>
                        </thead>
                        <tbody>
                            {TimeTable.map((v) => {
                                return (
                                    <tr>
                                    <td>{v.weekday}</td>
                                    <td>{v.startTime}</td>
                                    <td>{v.endTime}</td>
                                    <td>{v.slotDuration}</td>
                                    <td>{v.breakTime}</td>
                                    <td>{v.status}</td>
                                    <td><button className="btn btn-primary" style={{ marginRight: "10px" }} onClick={() => update(v)}>Update</button></td>
                                    <td><button style={{ display: v.status === 'available' ? 'block' : 'none' }} className="btn btn-primary" onClick={() => notAvailable(v)}>Not Available</button>
                                        <button style={{ display: v.status === 'not available' ? 'block' : 'none' }} className="btn btn-primary" onClick={() => available(v)}>Available</button></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
        </div>
    )

}

export default UpdateDoctorTimeTable;