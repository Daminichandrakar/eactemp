import React, { useState, useEffect } from "react";
import profile1 from "../assets/profile-images/Ellipse 1.png";
import profile2 from "../assets/profile-images/Ellipse -3.png";
import profile3 from "../assets/profile-images/Ellipse -7.png";
import profile4 from "../assets/profile-images/Ellipse -8.png";
import "../css/Header.css";
import logo from "../assets/images/logo.png";
import EmployeeService from "../services/EmployeeService";
import { useParams, Link, withRouter } from "react-router-dom";


function Update(props) {
    let initialValue = {
        name: '',
        profileArray: [
            { url: '../assets/profile-images/Ellipse 1.png' },
            { url: '../assets/profile-images/Ellipse -3.png' },
            { url: '../assets/profile-images/Ellipse -7.png' },
            { url: '../assets/profile-images/Ellipse -8.png' }

        ],
        allDepartment: [
            'HR', 'Sales', 'Finance', 'Engineer', 'Others'
        ],
        departments: [],
        gender: '',
        salary: '',
        day: '1',
        month: 'Jan',
        year: '2020',
        startDate: '',
        notes: '',
        id: '',
        imagePath: '',
        isUpdate: false,
        error: {
            department: '',
            name: '',
            gender: '',
            salary: '',
            imagePath: '',
            startDate: ''
        }
    }
    const [formValue, setForm] = useState(initialValue);
    const { id } = useParams();
    // const employeeService = new EmployeeService();

    useEffect(() => {
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

        //   EmployeeService.getEmployeeById(id).then((res) => {
        //     console.log("useeffect");
        //     setData(res.data);
        //   })

        // EmployeeService.getEmployeeById(id).then((res) => {
        //     console.log("useeffect");
        //     console.log(res.data.startDate);
        //     let text = res.data.startDate;
        //     let result = text.slice(0, 4);
        //       console.log(result);
        //       setData(res.data);
        //       console.log(res.data);
        
    }, []);

    const getData = (id) => {
        EmployeeService.getDataById(id)
            .then((data) => {
                console.log("data is ", data.data);
                let obj = data.data;
                setData(obj);
            })
            .catch((err) => {
                console.log("err is ", err);
            });
    };

    const setData = (obj) => {
        console.log("object");
        console.log(obj);
        let array = obj.startDate.split("-");
        console.log(array);
        setForm({
            ...formValue,
            ...obj,
            imagePath: obj.imagePath,
            departments: obj.departments,
            isUpdate: true,
            day: array[2],
            month: array[1],
            year: array[0],
        });
    };

    const changeValue = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value })
    }

    const onCheckChange = (name) => {
        let index = formValue.departments.indexOf(name);

        let checkArray = [...formValue.departments]
        if (index > -1)
            checkArray.splice(index, 1)
        else
            checkArray.push(name);
        setForm({ ...formValue, departments: checkArray });
    }
    const getChecked = (name) => {
        return formValue.departments && formValue.departments.includes(name);
    }

    const validData = async () => {
        let isError = false;
        let error = {
            department: '',
            name: '',
            gender: '',
            salary: '',
            imagePath: '',
            startDate: ''
        }
        if (formValue.name.length < 1) {
            error.name = 'name is required field'
            isError = true;
        }
        if (formValue.gender.length < 1) {
            error.gender = 'gender is required field'
            isError = true;
        }
        if (formValue.salary.length < 1) {
            error.salary = 'salary is required field'
            isError = true;
        }
        if (formValue.imagePath.length < 1) {
            error.imagePath = 'profile is required field'
            isError = true;
        }

        if (formValue.departments.length < 1) {
            error.department = 'department is required field'
            isError = true;
        }
        await setForm({ ...formValue, error: error })
        return isError;
    }

    const save = async (event) => {
        event.preventDefault();
        if (await validData()) {
            console.log("error", formValue);
            return;
        }
        //         var dept = [];
        // for (let i =0 ;i<formValue.departments.length;i++){
        //     dept.push({department:formValue.departments[i]})
        // }
        var dept = formValue.departments.map((data) => {
            return { "department": data }
        })
        let object = {
            name: formValue.name,
            department: dept,
            gender: formValue.gender,
            salary: formValue.salary,
            startDate: `${formValue.day} ${formValue.month} ${formValue.year}`,
            notes: formValue.notes,
            id: formValue.id,
            profile: formValue.imagePath,
        };
        if (formValue.isUpdate) {
            EmployeeService
                .updateEmployee(object)
                .then((data) => {
                    console.log("data after update", data);
                    this.props.history.push("/");
                })
                .catch((err) => {
                    console.log("Error after update");
                });
        } else {
            EmployeeService
                .addEmployee(object)
                .then((data) => {
                    console.log("Employee payroll added");
                    props.history.push("");
                })
                .catch((err) => {
                    console.log("error occured while adding employee");
                });
        }
    };
    const reset = () => {
        setForm({ ...initialValue, id: formValue.id, isUpdate: formValue.isUpdate });

        console.log(formValue);
    }



    
    return (
        <>
           
           <div className="content">
                <form className="form" action="#" onSubmit={save}>
                    <div className="form-head">Employee Payroll form</div>
                    <div className="row">
                        <label className="label text" htmlFor="name">Name</label>
                        <input className="input" type="text" id="name" name="name" value={formValue.name} onChange={changeValue} placeholder="Your name.." />
                    </div>
                    <div className="error" > {formValue.error.name} </div>
                    <div className="row-content">
                        <label className="label text" for="profilePic">Profile image</label>
                        <div className="profile-radio-content">
                            <label>
                                <input type="radio" id="profile1" name="imagePath" checked={formValue.imagePath == '../assets/profile-images/Ellipse -3.png'} value="../assets/profile-images/Ellipse -3.png" onChange={changeValue} required />
                                <img className="profile" id="image1" alt="img" src={profile1} />
                            </label>
                            <label>
                                <input type="radio" id="profile2" name="imagePath" checked={formValue.imagePath == '../assets/profile-images/Ellipse -1.png'} value="../assets/profile-images/Ellipse -1.png" onChange={changeValue} required />
                                <img className="profile" id="image2" alt="img" src={profile2} />
                            </label>
                            <label>
                                <input type="radio" id="profile3" name="imagePath" checked={formValue.imagePath == '../assets/profile-images/Ellipse -8.png'} value="../assets/profile-images/Ellipse -8.png" onChange={changeValue} required />
                                <img className="profile" id="image3" alt="img" src={profile3} />
                            </label>
                            <label>
                                <input type="radio" id="profile4" name="imagePath" checked={formValue.imagePath == '../assets/profile-images/Ellipse -7.png'} value="../assets/profile-images/Ellipse -7.png" onChange={changeValue} required />
                                <img className="profile" id="image4" alt="img" src={profile4} />
                            </label>
                            <error-output className="text-error" for="text"></error-output>
                        </div>
                    </div>
                    <div className="error" > {formValue.error.imagePath} </div>
                    <div className="row">
                        <label className="label text" htmlFor="gender">Gender</label>
                        <div>
                            <input type="radio" id="male" checked={formValue.gender === 'male'} onChange={changeValue} name="gender" value="male" />
                            <label className="text" htmlFor="male">Male</label>
                            <input type="radio" id="female" checked={formValue.gender === 'female'} onChange={changeValue} name="gender" value="female" />
                            <label className="text" htmlFor="female">Female</label>
                        </div>
                    </div>
                    <div className="error" > {formValue.error.gender} </div>

                    <div className="row">
                        <label className="label text" htmlFor="department">Department</label>
                        <div>
                            {formValue.allDepartment.map(item => (
                                <span key={item}>
                                    <input className="checkbox" type="checkbox" onChange={() => onCheckChange(item)} name={item}
                                        checked={getChecked(item)} value={item} />
                                    <label className="text" htmlFor={item}>{item}</label>
                                </span>
                            ))}

                        </div>
                    </div>
                    <div className="error" > {formValue.error.department} </div>


                    <div className="row">
                        <label className="label text" htmlFor="salary">Salary</label>
                        <input className="input" type="range" onChange={changeValue} id="salary" value={formValue.salary} name="salary" placeholder="Salary"
                            min="1000" max="10000" step="100" />
                    </div>
                    <div className="error" > {formValue.error.salary} </div>




                    <div className="row">
                        <label className="label text" htmlFor="startDate">Start Date</label>
                        <div>
                            <select value={formValue.day} onChange={changeValue} id="day" name="day">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
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
                            <select value={formValue.month} onChange={changeValue} id="month" name="month">
                                <option value="Jan">January</option>
                                <option value="Feb">Febuary</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                                <option value="July">July</option>
                                <option value="Aug">August</option>
                                <option value="Sept">September</option>
                                <option value="Oct">October</option>
                                <option value="Nov">November</option>
                                <option value="Dec">December</option>
                            </select>
                            <select value={formValue.year} onChange={changeValue} id="year" name="year">
                                <option value="2020">2020</option>
                                <option value="2019">2019</option>
                                <option value="2018">2018</option>
                                <option value="2017">2017</option>
                                <option value="2016">2016</option>
                            </select>
                        </div>
                    </div>
                    <div className="error" > {formValue.error.startDate} </div>

                    <div className="row">
                        <label className="label text" htmlFor="notes">Notes</label>
                        <textarea onChange={changeValue} id="notes" value={formValue.notes} className="input" name="notes" placeholder=""
                            style={{ height: '100%' }}></textarea>
                    </div>

                    <div className="buttonParent">
                        <Link to="" className="resetButton button cancelButton">Cancel</Link>

                        <div className="submit-reset">
                            <button type="submit" className="button submitButton" id="submitButton">{formValue.isUpdate ? 'Update' : 'Submit'}</button>
                            <button type="button" onClick={reset} className="resetButton button">Reset</button>
                        </div>
                    </div>
                </form>
            </div>
       
        </>
    );
}

export default Update;