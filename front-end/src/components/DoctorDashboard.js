import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DoctorDashboard(){
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState({
        firstName:"",
        lastName:""
    })

    useEffect(() => {
        let doc = JSON.parse(sessionStorage.getItem("doctordetails"));
        setDoctor({firstName: doc.firstName,lastName: doc.lastName})
    },[]);

    const logout = () => {
        sessionStorage.removeItem("doctordetails");
        navigate("/");
    }

    return(
        <div className="container" style={{marginBottom : "50px"}}>
                    <div className="row my-3">
                        <div className="col-sm-6"><h2 className="">Hello, Dr.{doctor.firstName} {doctor.lastName}</h2></div>
                        <div className="col-sm-6">
                            <button onClick={logout} className="btn btn-link btn-danger text-light offset-10 text-uppercase text-decoration-none " >Logout</button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Update Profile</h5>
                                    <p className="card-text">Update your account details.</p>
                                    <button onClick={() => navigate("/updatedoctordetails")} className="btn btn-primary">UPDATE</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Update Time Table</h5>
                                    <p className="card-text">Update your time table.</p>
                                    <button onClick={() => navigate("/updatedoctortimetable")} className="btn btn-info">UPDATE</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row my-3">
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Change Time Table Status</h5>
                                    <p className="card-text">Change your time table status.</p>
                                    <button onClick={() => navigate("/updatedoctortimetable")} className="btn btn-success">CHANGE</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Current Appointments</h5>
                                    <p className="card-text">Check your current appointments.</p>
                                    <button onClick={() => navigate("/doctorcurrentappointments")} className="btn btn-warning">CHECK</button>
                                </div>
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-sm-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Cancel Appointments</h5>
                                        <p className="card-text">Cancel your appointments.</p>
                                        <button onClick={() => navigate("/doctorcurrentappointments")} className="btn btn-danger">CANCEL</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Appointment History</h5>
                                        <p className="card-text">Check your appointment history.</p>
                                        <button onClick={() => navigate("/doctorappointmenthistory")} className="btn btn-primary">CHECK</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row my-3">
                            <div className="col-sm-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Change Password</h5>
                                        <p className="card-text">Change your password.</p>
                                        <button onClick={() => navigate("/changepassworddoctor")} className="btn btn-success">CHANGE</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                            
                    </div>
                </div>
    )

}

export default DoctorDashboard;