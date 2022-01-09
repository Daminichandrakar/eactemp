import axios, { Axios } from 'axios';
import "../css/Header.css";
import profile1 from '../assets/profile-images/Ellipse -3.png'
import profile2 from '../assets/profile-images/Ellipse -1.png'
import profile3 from '../assets/profile-images/Ellipse -8.png'
import profile4 from '../assets/profile-images/Ellipse -7.png'
import React, { useState } from 'react';
import { Link , useHistory} from 'react-router-dom'

const Add = () => {

    let initialvalue = {
        name: '',
        gender:'',
        imagePath:'',
        departments : [],
        salary: '40000',
        note:'',
        Day:'01',
        Month:'01',
        Year:'2021',
        startDate: ''
    }
    const [users , setUser] = useState(initialvalue);

   const onInputChange = (event) =>{
       console.log(event.target.value);
        setUser({... users,[event.target.name]:  event .target.value})
    }

    const onSubmit = async e => {
        defineDate();
        e.preventDefault();
           await axios.post("http://localhost:8081/employee/add" , users);
           this.props.history.push("/employees");
    }

    const defineDate = () => {
        this.state.startDate = this.state.Year+"-"+this.state.Month+"-"+this.state.Day

    }

  const  changeDepartmentHandler = (e) => {
        this.state.departments.push(e.target.value)
    }

    const {name ,gender, imagePath, departments , salary, note , Day , Month, Year, startDate }= users;
    return (
        <> 
         <div className="form-content">
                    <form className="form" action="#" onSubmit={e => onSubmit(e)}>
                        <div className="form-head">Employee Payroll Form</div>
                        <div className="row-content">
                            <label className="label text" for="name">Name</label>
                            <input className="input" type="text" id="name" name="name"  value={name} onChange={e => onInputChange(e) } placeholder="Your Name.." required />
                            <error-output className="text-error" for="text"></error-output>
                        </div>
                        <div className="row-content">
                            <label className="label text" for="profilePic">Profile image</label>
                            <div className="profile-radio-content">
                                <label>
                                    <input type="radio" id="profile1" name="imagePath" value="../assets/profile-images/Ellipse -3.png" onChange={e => onInputChange(e) } required />
                                    <img className="profile" id="image1" alt="img" src={profile1} />
                                </label>
                                <label>
                                    <input type="radio" id="profile2" name="imagePath" value="../assets/profile-images/Ellipse -1.png" onChange={e => onInputChange(e) } required />
                                    <img className="profile" id="image2" alt="img" src={profile2} />
                                </label>
                                <label>
                                    <input type="radio" id="profile3" name="imagePath" value="../assets/profile-images/Ellipse -8.png" onChange={e => onInputChange(e) } required />
                                    <img className="profile" id="image3" alt="img" src={profile3} />
                                </label>
                                <label>
                                    <input type="radio" id="profile4" name="imagePath" value="../assets/profile-images/Ellipse -7.png" onChange={e => onInputChange(e) } required />
                                    <img className="profile" id="image4" alt="img" src={profile4} />
                                </label>
                                <error-output className="text-error" for="text"></error-output>
                            </div>
                        </div>
                        <div className="row-content">
                            <label className="label text" for="gender">Gender</label>
                            <div>
                                <input type="radio" id="male" name="gender" value="male" onChange={e => onInputChange(e) }/>
                                <label className="text" for="male">Male</label>
                                <input type="radio" id="female" name="gender" value="female" onChange={e => onInputChange(e) }/>
                                <label className="text" for="female">Female</label>
                                <error-output className="text-error" for="text"></error-output>
                            </div>
                        </div>
                        <div className="row-content">
                            <label className="label text" for="departments">Department</label>
                            <div>
                                <input className="checkbox" type="checkbox" id="sales" name="department" value="Sales" onChange={e => changeDepartmentHandler(e) }/>
                                <label className="text" for="sales">Sales</label>
                                <input className="checkbox" type="checkbox" id="finance" name="department" value="Finance" onChange={e => changeDepartmentHandler(e) }/>
                                <label className="text" for="finance">Finance</label>
                                <input className="checkbox" type="checkbox" id="engineer" name="department" value="Engineer" onChange={e => changeDepartmentHandler(e) }/>
                                <label className="text" for="engineer">Engineer</label>
                                <input className="checkbox" type="checkbox" id="hr" name="department" value="HR" onChange={e => changeDepartmentHandler(e) }/>
                                <label className="text" for="hr">HR</label>
                                <input className="checkbox" type="checkbox" id="others" name="department" value="Others" onChange={e => changeDepartmentHandler(e) }/>
                                <label className="text" for="others">Others</label>
                            </div>
                            <error-output className="text-error" for="text"></error-output>
                        </div>
                        <div className="row-content">
                        <label className="label text" for="salary">Choose Your Salary: </label>
                            <input className="input" type="range" name="salary" id="salary"  min="3000" max="50000" step="100"  value={salary} onChange={e => onInputChange(e) }/>
                            <output className="salary-output text" for="salary"></output>
                            <error-output className="text-error" for="text"></error-output>
                        </div>
                        <div className="row-content">
                            <label className="label text" for="startDate">Start Date</label>
                            <div id="date">
                                <select id="day" name="Day" onChange={e => onInputChange(e) } >
                                    <option value="01">1</option>
                                    <option value="02">2</option>
                                    <option value="03">3</option>
                                    <option value="04">4</option>
                                    <option value="05">5</option>
                                    <option value="06">6</option>
                                    <option value="07">7</option>
                                    <option value="08">8</option>
                                    <option value="09">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                    <option value="31">31</option>
                                </select>
                                <select id="month" name="Month" onChange={e => onInputChange(e) } >
                                    <option value="01">January</option>
                                    <option value="02">February</option>
                                    <option value="03">March</option>
                                    <option value="04">April</option>
                                    <option value="05">May</option>
                                    <option value="06">June</option>
                                    <option value="07">July</option>
                                    <option value="08">August</option>
                                    <option value="09">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                                <select id="year" name="Year" onChange={e => onInputChange(e) } >
                                    <option value="2021">2022</option>
                                    <option value="2021">2021</option>
                                    <option value="2020">2020</option>
                                    <option value="2019">2019</option>
                                    <option value="2018">2018</option>
                                    <option value="2017">2017</option>
                                    <option value="2016">2016</option>
                                </select>
                            </div>
                            <error-output className="date-error" for="startDate"></error-output>
                        </div>
                        <div className="row-content">
                            <label className="label text" for="note">Notes</label>
                            <textarea id="note"  className="input" name="note"  placeholder="add notes...." value={note} onChange={e => onInputChange(e) }></textarea>
                        </div>
                        <div className="buttonParent">
                        <Link to='/employees' className="resetButton button cancelButton">cancel</Link>
                            <div className="submit-reset">
                                <button type="submit" className="button submitButton" id="submitButton"  onClick={ e => onSubmit(e)}>Submit</button>
                                <button type="reset" className="resetButton button">Reset</button>
                            </div>
                        </div>
                    </form>
                </div>
        </>
    );
}

export default Add ;