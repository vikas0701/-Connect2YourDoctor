import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard () {
    const navigate = useNavigate();
    const[admin, setAdmin] = useState("");

    useEffect(() => {
        let admin = JSON.parse(sessionStorage.getItem("admindetails"));
        setAdmin(admin.userName)
    },[]);

    const logout = () => {
        sessionStorage.removeItem("admindetails");
        navigate("/");
    }

    return(
        <>
   <div className="container" style={{marginBottom : "50px"}}>
                <div className="row my-3">
                    <div className="col-sm-6"><h2 className="">Hello, {admin}</h2>
                    </div>
                    <div className="col-sm-6">
                    <button className="btn btn-link btn-danger text-light offset-10 text-uppercase text-decoration-none " onClick={logout}>Logout</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Add New Doctor</h5>
                                <p className="card-text">Register a new doctor to database.</p>
                                <button onClick={() => navigate("/adddoctor")} className="btn btn-primary">ADD</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">View Doctor List</h5>
                                <p className="card-text">View details of all registered doctors.</p>
                                <button onClick={() => navigate("/adminviewdoctor")} className="btn btn-warning">VIEW</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row my-3">
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Enable/Disable</h5>
                                <p className="card-text">Enable or disable a doctor.</p>
                                <button onClick={() => navigate("/adminviewdoctor")} className="btn btn-info">ENABLE/DISBLE</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">View Patient</h5>
                                <p className="card-text">View details of all registered patients.</p>
                                <button className="btn btn-success" onClick={() => navigate("/adminviewpatient")}>VIEW</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row my-3">
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Enable/Disable</h5>
                                <p className="card-text">Enable or disable a patient.</p>
                                <button onClick={() => navigate("/adminviewpatient")} className="btn btn-success">ENABLE/DISBLE</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Add Area</h5>
                                <p className="card-text">Add new areas.</p>
                                <button onClick={() => navigate("/addarea")} className="btn btn-info">ADD</button>
                            </div>
                        </div>
                    </div>

                    <div className="row my-3">
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Add City</h5>
                                <p className="card-text">Add new cities.</p>
                                <button onClick={() => navigate("/addcity")} className="btn btn-warning">ADD</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Add State</h5>
                                <p className="card-text">Add new states.</p>
                                <button onClick={() => navigate("/addstate")} className="btn btn-primary">ADD</button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard;