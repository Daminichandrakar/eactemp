import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams, withRouter } from 'react-router-dom'
import profile1 from '../assets/profile-images/Ellipse -3.png'
import profile2 from '../assets/profile-images/Ellipse -1.png'
import profile3 from '../assets/profile-images/Ellipse -8.png'
import profile4 from '../assets/profile-images/Ellipse -7.png'
import EmployeeService from '../services/EmployeeService';



function Edit(props) {
    //let history = useHistory();
    const { id } = useParams();
    let initialValue ={
        name: '',
        gender: '',
        imagePath: '',
        profileArray: [
            { url: '../assets/profile-images/Ellipse -3.png' },
            { url: '../assets/profile-images/Ellipse -1.png' },
            { url: '../assets/profile-images/Ellipse -8.png' },
            { url: '../assets/profile-images/Ellipse -7.png' }
        ],
    //   HR : false, Sales: false, Finance: false, Enginner: false, Others: false,
      allDepartment: [
        'HR', 'Sales', 'Finance', 'Engineer', 'Others'
    ],
        departments: [],
        salary: '40000',
        notes: '',
        Day: '01',
        Month: '01',
        Year: '2021',
        startDate: ''
    }
    const [users, setUser] = useState(initialValue);

    const onInputChange = (event) => {
        console.log(event.target.value);
      //  users.departments.push(event.target.value)
        setUser({ ...users, [event.target.name]: event.target.value });
      //  this.state.departments.push(event.target.value)
    }


    const onCheckChange = (name) => {
        let index = users.departments.indexOf(name);
        console.log("index");
        console.log(users.departments);
        console.log(index);
        let checkArray = [...users.departments]
        if (index > -1){
            checkArray.splice(index, 1)
            console.log("if statement");
            console.log(checkArray)}
        else{
            checkArray.push(name);
            console.log(checkArray)}
        setUser({ ...users, departments: checkArray });
    }
    const getChecked = (name) => {
        return users.departments && users.departments.includes(name);
    }


    useEffect(() => {
        // loadUsers();
        //  const result = await axios.get(`http://localhost:8081/employee/get/${id} `);
        // EmployeeService.getEmployeeById(id).then((res) => {
        //     console.log("useeffect");
        //     console.log(res.data.startDate);
        //     let text = res.data.startDate;
        //     let result = text.slice(0, 4);
        //       console.log(result);

            // const myArray = text.split("-", 2);
            // var arr =  myArray
            // console.log(arr);
            // console.log("res");
            // var res = arr.slice(0,1);
            // console.log(res);
        //    console.log(res.data.departments);
        //   res.data.departments.map((dept) => {
        //         if(dept==="Sales") this.Sales=true
        //         if(dept==="Finance") this.Finance=true
        //         if(dept==="Engineer") this.Engineer=true
        //         if(dept==="HR") this.HR=true
        //         if(dept==="Others") this.Others=true
    
        //     })
          //  setUser(res.data);
         //   console.log(res.data.departments);



         EmployeeService.getEmployeeById(id)
         .then((data) => {
             console.log("data is ", data.data);
             let obj = data.data;
             setData(obj);
             //console.log(obj);
         })
         .catch((err) => {
             console.log("err is ", err);
         });
    }, []);


    const setData = (obj) => {
        console.log("object");
        console.log(obj);
        let array = obj.startDate.split("-");
        console.log(array);
        setUser({
            ...users,
            ...obj,
            imagePath: obj.imagePath,
            departments: obj.departments,
            isUpdate: true,
            Day: array[2],
            Month: array[1],
            Year: array[0],
        });
    };

    const onSubmit = async e => {
     //   defineDate();
        console.log("update file")
        e.preventDefault();
        await axios.put(`http://localhost:8081/employee/update/${id} `, users);
        console.log("done");
       props.history.push("/")
    }

    const loadUsers = async () => {
        const result = await axios.get(`http://localhost:8081/employee/get/${id} `);
        console.log(result);
        setUser(result.data);
    }

    const defineDate = () => {
        this.state.startDate = this.state.Year + "-" + this.state.Month + "-" + this.state.Day
    }

    const changeDepartmentHandler = (e) => {
        console.log("departments");
        users.departments.push(e.target.value)
    }


    const { name, gender, imagePath, departments, salary, notes, Day, Month, Year, startDate , allDepartment } = users;
    return (
        <>
            <div className="form-content">
                <form className="form" action="#" onSubmit={e => onSubmit(e)}>

                    <div className="form-head">Employee Payroll Form</div>
                    <div className="row-content">
                        <label className="label text" for="name">Name</label>
                        <input className="input" type="text" id="name" name="name" value={name} onChange={e => onInputChange(e)} placeholder="Your Name.." required />
                        <error-output className="text-error" for="text"></error-output>
                    </div>
                    <div className="row-content">
                        <label className="label text" for="profilePic">Profile image</label>
                        <div className="profile-radio-content">
                            <label>
                                <input type="radio" id="profile1" name="imagePath" checked={imagePath == '../assets/profile-images/Ellipse -3.png'} value="../assets/profile-images/Ellipse -3.png" onChange={e => onInputChange(e)} required />
                                <img className="profile" id="image1" alt="img" src={profile1} />
                            </label>
                            <label>
                                <input type="radio" id="profile2" name="imagePath" checked={imagePath == '../assets/profile-images/Ellipse -1.png'} value="../assets/profile-images/Ellipse -1.png" onChange={e => onInputChange(e)} required />
                                <img className="profile" id="image2" alt="img" src={profile2} />
                            </label>
                            <label>
                                <input type="radio" id="profile3" name="imagePath" checked={imagePath == '../assets/profile-images/Ellipse -8.png'} value="../assets/profile-images/Ellipse -8.png" onChange={e => onInputChange(e)} required />
                                <img className="profile" id="image3" alt="img" src={profile3} />
                            </label>
                            <label>
                                <input type="radio" id="profile4" name="imagePath" checked={imagePath == '../assets/profile-images/Ellipse -7.png'} value="../assets/profile-images/Ellipse -7.png" onChange={e => onInputChange(e)} required />
                                <img className="profile" id="image4" alt="img" src={profile4} />
                            </label>
                            <error-output className="text-error" for="text"></error-output>
                        </div>
                    </div>
                    <div className="row-content">
                        <label className="label text" for="gender">Gender</label>
                        <div>
                            <input type="radio" id="male" name="gender" checked={gender == "male"} value="male" onChange={e => onInputChange(e)} />
                            <label className="text" for="male">Male</label>
                            <input type="radio" id="female" name="gender" checked={gender == "female"} value="female" onChange={e => onInputChange(e)} />
                            <label className="text" for="female">Female</label>
                            <error-output className="text-error" for="text"></error-output>
                        </div>
                    </div>
                    <div className="row-content">
                        <label className="label text" for="departments">Department</label>
                        <div>
                            {users.allDepartment.map(item => (
                                <span key={item}>
                                    <input className="checkbox" type="checkbox" onChange={() => onCheckChange(item)} name={item}
                                        checked={getChecked(item)} value={item} />
                                    <label className="text" htmlFor={item}>{item}</label>
                                </span>
                            ))}

                        </div>
                       {/* <div>   
                       <input className = "checkbox" type = "checkbox" id = "sales" name = "departments" value = "Sales" checked={users.departments.includes("HR")} onChange={onInputChange}/>
                                <label className = "text" for = "sales">Sales</label>
                                <input className = "checkbox" checked={users.departments.includes("Finance")} type = "checkbox" id = "finance" onChange={onInputChange} name = "departments" value = "Finance"/>
                                <label className = "text" for = "finance">Finance</label>
                                <input className = "checkbox" checked={users.departments.includes("Engineer")} type = "checkbox" id = "engineer" onChange={onInputChange} name = "departments" value = "Engineer"/>
                                <label className = "text" for = "engineer">Engineer</label>

                                <input className = "checkbox"  checked={users.departments.includes("HR")} type = "checkbox" id = "hr" onChange={onInputChange} name = "departments" value = "HR"/>
                                <label className = "text" for = "hr">HR</label>
                                <input className = "checkbox" checked={users.departments.includes("Others")} type = "checkbox" id = "others" onChange={onInputChange} name = "departments" value = "Others"/>
                                <label className = "text" for = "others">Others</label>
                        </div> */}

                        {/* <div>
                            {users.allDepartment.map(item => (
                                <span key ={item}>
                                    <input className="checkbox" type="checkbox" onChange={() => changeDepartmentHandler(item)} name={item}
                                         value={item} />
                                    <label className="text" htmlFor={item}>{item}</label>
                                </span>
                            ))}
                        </div> */}
                        <error-output className="text-error" for="text"></error-output>
                    </div>
                    <div className="row-content">
                        <label className="label text" for="salary">Choose Your Salary: </label>
                        <input className="input" type="range" name="salary" id="salary" min="3000" max="50000" step="100" value={salary} onChange={e => onInputChange(e)} />
                        <output className="salary-output text" for="salary"></output>
                        <error-output className="text-error" for="text"></error-output>
                    </div>
                    <div className="row-content">
                        <label className="label text" for="startDate">Start Date</label>
                        <div id="date">
                            <select id="Day" name="Day" onChange={e => onInputChange(e)} value={users.Day}>
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
                            <select id="Month" name="Month" onChange={e => onInputChange(e)} value={users.Month} >
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
                            <select id="Year" name="Year" onChange={e => onInputChange(e)} value={users.Year}>
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
                        <label className="label text" for="notes">Notes</label>
                        <textarea id="notes" className="input" name="notes" placeholder="add notes...." value={notes} onChange={e => onInputChange(e)}></textarea>
                    </div>
                    <div className="buttonParent">
                        <Link to='/employees' className="resetButton button cancelButton">cancel</Link>
                        <div className="submit-reset">
                            <button type="submit" className="button submitButton" id="submitButton" onClick={e => onSubmit(e)}>Submit</button>
                            <button type="reset" className="resetButton button">Reset</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default withRouter(Edit);