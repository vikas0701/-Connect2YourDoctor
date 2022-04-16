import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UpdateDoctorDetails(){
    const navigate = useNavigate();
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [area, setArea] = useState("");

    const [data,setData] = useState({
        doctorId:"",
        firstName:"",
        lastName:"",
        mobileNumber:"",
        gender:"",
        dob:"",
        graduation:"",
        postGraduation:"",
        speciality:"",
        fees:"",
        areaId:{},
        loginId:{}
    });

    const [Error,setError] = useState({
        firstNameError:"",
        lastNameError:"",
        mobileNumberError:"",
        specialityError:"",
        feesError:"",
    });

    const [flag,setFlag]=useState({
        firstName:true,
        lastName:true,
        mobileNumber:true,
        speciality:true,
        fees:true,
    });

    useEffect(() => {
        let doc = JSON.parse(sessionStorage.getItem("doctordetails"));
        console.log(doc);
        setData({doctorId:doc.doctorId,firstName:doc.firstName,lastName:doc.lastName,
            gender:doc.gender,dob:doc.dob,graduation:doc.graduation,postGraduation:doc.postGraduation,
            speciality:doc.speciality,fees:doc.fees,mobileNumber:doc.mobileNumber,areaId:doc.area_id,loginId:doc.login_id})
            setState(doc.area_id.city_id.state_id.stateName);
            setCity(doc.area_id.city_id.cityName);
            setArea(doc.area_id.areaName);
    },[]);

    const changeHandler = (e) => {
        setData((data) => ({
            ...data,
            [e.target.name]: e.target.value
        }));
    }

    const refreshPage = (e) => {
        window.location.reload();
      };

    const logout = () => {
        sessionStorage.removeItem("doctordetails");
        navigate("/");
    }

    const validateFirstName=(e)=>{
        let name = e.target.value;
        if(name === ""){
            setError({...Error,firstNameError:"Please enter First Name"});
            setFlag({...flag,firstName:false});
        }
        else{
            setError({...Error,firstNameError:""});
            setFlag({...flag,firstName:true});
        }
    }

    const validateLastName=(e)=>{
        let name = e.target.value;
        if(name === ""){
            setError({...Error,lastNameError:"Please enter Last Name"});
            setFlag({...flag,lastName:false});
            console.log(flag.lastName);
        }
        else{
            setError({...Error,lastNameError:""});
            setFlag({...flag,lastName:true});
            console.log(flag.lastName);
        }
    }

    const validateMobileNumber=(e)=>{
        let mobileNumber = e.target.value;
        let mnRegex = new RegExp(  /^[0-9]{10}$/);
        if(mnRegex.test(mobileNumber) === true){
            setError({...Error,mobileNumberError:""});
            setFlag({...flag,mobileNumber:true});
        }
        else{
            setError({...Error,mobileNumberError:"Mobile Number should be 10 digits without +91 or 0"});
            setFlag({...flag,mobileNumber:false});
        }
    }

    const validateSpeciality=(e)=>{
        let spec = e.target.value;
        if(spec === ""){
            setError({...Error,specialityError:"Please enter Speciality"});
            setFlag({...flag,speciality:false});
        }
        else{
            setError({...Error,specialityError:""});
            setFlag({...flag,speciality:true});
        }
    }

    const validateFees=(e)=>{
        let fees = e.target.value;
        if(fees === ""){
            setError({...Error,feesError:"Please enter Fees"});
            setFlag({...flag,fees:false});
        }
        else{
            setError({...Error,feesError:""});
            setFlag({...flag,fees:true});
        }
    }

    const submitData = (e) => {
        e.preventDefault();
        if(flag.firstName&&flag.lastName&&flag.mobileNumber&&flag.speciality&&flag.fees){
            const reqOptions ={
                method : 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body : JSON.stringify({
                    doctorId:data.doctorId,
                    firstName:data.firstName,
                    lastName:data.lastName,
                    mobileNumber:data.mobileNumber,
                    gender:data.gender,
                    dob:data.dob,
                    graduation:data.graduation,
                    postGraduation:data.postGraduation,
                    speciality:data.speciality,
                    fees:data.fees,
                    area_id:data.areaId,
                    login_id:data.loginId
                })
            }
            fetch("http://localhost:8080/updatedoctordetails",reqOptions)
                .then(resp=>resp.text())
                .then(data=> {if(data.length != 0)
                    {
                        const json = JSON.parse(data);
                        alert("update successful!!!");
                        sessionStorage.setItem("doctordetails",JSON.stringify(json))
                        navigate('/doctordashboard');
                    }
                    else{
                        alert("Failed!!!");
                        //window.location.reload();
                        navigate('/updatedoctordetails');
                    }
                })
        }else{
            alert("All fields are compulsory and must follow guidelines");
                // window.location.reload();
                navigate('/updatedoctordetails');
        }
    }


    return(
        <div className="container fluid" style={{marginBottom : "50px"}}>
            <button className="btn btn-danger" onClick={logout} style={{float:"right",marginTop:"10px",marginRight:"10px"}}>Logout</button>
            <button  className='btn btn-secondary' style={{float:"right",marginTop:"10px",marginRight:"10px"}} onClick={() => navigate("/doctordashboard")}>Go Back</button> 
        <br/><br/>
        <div className = "container">
        <div className = "row">
            <div className = "card col-md-6 offset-md-3 offset-md-3">
            <h2 className='text-center'>Update Information </h2>

            <form method="POST">

            <div style={{ marginTop: '10px' }} className = "form-group">
                <label><b>  First Name: </b></label>
                <input type="text"  name="firstName" className="form-control" 
                    value={data.firstName} onChange={changeHandler} onBlur={validateFirstName}/>
                    <span className="text text-danger">{Error.firstNameError}</span>
            </div>

            <div style={{ marginTop: '10px' }} className = "form-group">
                <label><b>  Last Name: </b></label>
                <input type="text" placeholder={data.lastName} name="lastName" className="form-control" 
                    value={data.lastName} onChange={changeHandler} onBlur={validateLastName}/>
                    <span className="text text-danger">{Error.lastNameError}</span>
            </div >

            <div style={{ marginTop: '10px' }} className = "form-group">
                <label><b>  Mobile Number: </b></label>
                <input type="text" placeholder={data.mobileNumber} name="mobileNumber" className="form-control" 
                    value={data.mobileNumber} onChange={changeHandler}  onBlur={validateMobileNumber}/>
                    <span className="text text-danger">{Error.mobileNumberError}</span>
            </div>

             <div style={{ marginTop: '10px' }} className = "form-group" >
                <label><b>  Gender: </b></label> 
                <input style={{ marginLeft: '10px' }} type="radio" value="Male" name="gender" checked={data.gender==='Male'} disabled/> Male
                <input style={{ marginLeft: '10px' }} type="radio" value="Female" name="gender" checked={data.gender==='Female'} disabled/> Female
                <input style={{ marginLeft: '10px' }} type="radio" value="Other" name="gender" checked={data.gender==='Other'} disabled/> Other
            </div> 

            <div style={{ marginTop: '10px' }} className = "form-group">
                <label><b>  Date of Birth: </b></label>
                <input type="date" placeholder={data.dob} name="dob" className="form-control" 
                    value={data.dob}  disabled/>
            </div >

            <div style={{ marginTop: '10px' }} className = "form-group">
                <label><b>  Graduation: </b></label>
                <input type="text" placeholder={data.graduation} name="graduation" className="form-control" 
                    value={data.graduation} onChange={changeHandler} disabled={true}/>
            </div >

            <div style={{ marginTop: '10px' }} className = "form-group">
                <label><b>  Post Graduation: </b></label>
                <input type="text" placeholder={data.postGraduation} name="postGraduation" className="form-control" 
                    value={data.postGraduation} onChange={changeHandler}/>
            </div >

            <div style={{ marginTop: '10px' }} className = "form-group">
                <label><b>  Speciality: </b></label>
                <input type="text" placeholder={data.speciality} name="speciality"  className="form-control" 
                    value={data.speciality} onChange={changeHandler} onBlur={validateSpeciality}/>
                    <span className="text text-danger">{Error.specialityError}</span> 
            </div >
            
            <div style={{ marginTop: '10px' }} className = "form-group">
                <label><b>  Fees: </b></label>
                <input type="text" placeholder={data.fees} name="fees" className="form-control" 
                    value={data.fees} onChange={changeHandler} onBlur={validateFees}/>
                    <span className="text text-danger">{Error.feesError}</span>
            </div >

            <div style={{ marginTop: '10px' }} className = "form-group">
            <label><b>  State: </b></label>
            {/* <p>
                {console.log(state)}
                {console.log(city)}
                {console.log(area)}
            </p> */}
            <input type="text" placeholder={state} className="form-control" 
                    value={state} disabled/>
            <label><b>  City: </b></label>
            <input type="text" placeholder={city} className="form-control" 
                    value={city} disabled/>
            <label><b>  Area: </b></label>
            <input type="text" placeholder={area} className="form-control" 
                    value={area} disabled/>
                    
                    {/* <select style={{ marginLeft: '10px' }} name="state" onChange={cityFetch}>
                        <option value={"0"} >--state--</option>
                        {
                            state.map((v)=>{
                            return (
                                <option key={v.stateId} value={v.stateId}  selected={v.stateId===data.areaId.city_id.state_id.stateId}>{v.stateName}</option>
                                
                            )
                        })
                        }
                    </select>
                    
                   <select style={{ marginLeft: '10px' }} name="city" onChange={areaFetch}>
                        <option value="0" >--city--</option>
                         {
                            city.map((v)=>{
                            return (
                                <option key={v.cityId} value={v.cityId} selected={v.cityId===data.areaId.city_id.cityId}>{v.cityName}</option>
                            )})
                        } 
                    </select>

                     <select style={{ marginLeft: '10px' }} name="areaId" onChange={changeHandler}>
                        <option value="0">--area--</option>
                        {
                            area.map((v)=>{
                            return (
                                
                                <option key={v.areaId} value={v} selected={v.areaId===data.areaId.areaId} >{v.areaName}</option>
                            )})
                        }
                    </select>  */}
                </div>

            <div style={{marginTop: "10px"}}>
            <button className="btn btn-success" onClick={submitData}>Update</button>
            <button type="button" className="btn btn-danger" style={{marginLeft: "10px"}} onClick={refreshPage}>Reset</button>
            <button className="btn btn-danger" onClick={() => navigate("/doctordashboard")} style={{marginLeft: "10px"}}>Cancel</button>
            </div>
            </form>
        </div>
        </div>
        </div>
        </div>
    );

}

export default UpdateDoctorDetails;