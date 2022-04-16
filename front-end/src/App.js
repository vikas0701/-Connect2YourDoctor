import logo from "./logo.svg";
import "./App.css";
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import AdminDashboard from "./components/AdminDashboard";
import AdminViewDoctor from "./components/AdminViewDoctor";
import AdminViewPatient from "./components/AdminViewPatient";
import AddState from "./components/AddState";
import AddCity from "./components/AddCity";
import AddArea from "./components/AddArea";
import AddDoctor from "./components/AddDoctor";
import DoctorDashboard from "./components/DoctorDashboard";
import UpdateDoctorDetails from "./components/UpdateDoctorDetails";
import UpdateDoctorTimeTable from "./components/UpdateDoctorTimeTable";
import UpdateTimeTableByDay from "./components/UpdateTimeTableByDay";
import DoctorCurrentAppointments from "./components/DoctorCurrentAppointments";
import DoctorAppointmentHistory from "./components/DoctorAppointmentHistory";
import PatientDashboard from "./components/PatientDashboard";
import UpdatePatientDetails from "./components/UpdatePatientDetails";
import SearchDoctor from "./components/SearchDoctor";
import BookDoctorAppointmentSlot from "./components/BookDoctorAppointmentSlot";
import PatientCurrentAppointments from "./components/PatientCurrentAppointments";
import PatientAppointmenthHistory from "./components/PatientAppointmenthHistory";
import ChangePasswordPatient from "./components/ChangePasswordPatient";
import ChangePasswordDoctor from "./components/ChangePasswordDoctor";
import ForgotPassword from "./components/ForgotPassword";
import AboutUS from "./components/AboutUS";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PatientRegistration from "./components/PatientRegistration";

function App() {
  return (
  <div>
    <BrowserRouter>
    <Header title="Connect2YourDoctor" />
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>

        <Route path="/aboutus" element={<AboutUS/>}></Route>
        <Route path="/contactus" element={<Contact/>}></Route>

        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/signup" element={<PatientRegistration/>}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword/>}></Route>

        <Route path="/admindashboard" element={<AdminDashboard/>}></Route>
        <Route path="/adddoctor" element={<AddDoctor/>}></Route>
        <Route path="/adminviewdoctor" element={<AdminViewDoctor/>}></Route>
        <Route path="/adminviewpatient" element={<AdminViewPatient/>}></Route>
        <Route path="/addstate" element={<AddState/>}></Route>
        <Route path="/addcity" element={<AddCity/>}></Route>
        <Route path="/addarea" element={<AddArea/>}></Route>

        <Route path="/doctordashboard" element={<DoctorDashboard/>}></Route>
        <Route path="/updatedoctordetails" element={<UpdateDoctorDetails/>}></Route>
        <Route path="/updatedoctortimetable" element={<UpdateDoctorTimeTable/>}></Route>
        <Route path="/updatetimetablebyday" element={<UpdateTimeTableByDay/>}></Route>
        <Route path="/doctorcurrentappointments" element={<DoctorCurrentAppointments/>}></Route>
        <Route path="/doctorappointmenthistory" element={<DoctorAppointmentHistory/>}></Route>
        <Route path="/changepassworddoctor" element={<ChangePasswordDoctor/>}></Route>

        <Route path="/patientdashboard" element={<PatientDashboard/>}></Route>
        <Route path="/updatepatientdetails" element={<UpdatePatientDetails/>}></Route>
        <Route path="/searchdoctor" element={<SearchDoctor/>}></Route>
        <Route path="/bookdoctorappointmentslot" element={<BookDoctorAppointmentSlot/>}></Route>
        <Route path="/patientcurrentappointments" element={<PatientCurrentAppointments/>}></Route>
        <Route path="/patientappointmenthistory" element={<PatientAppointmenthHistory/>}></Route>
        <Route path="/changepasswordpatient" element={<ChangePasswordPatient/>}></Route>

      </Routes>
      <Footer />
    </BrowserRouter>
  </div>
  );
}

export default App;
