import axios from 'axios';

const EMPLOYEE_BASE_URL="http://localhost:8081/employee/getall";


class EmployeeService {
         getEmployees(){
             return axios.get(EMPLOYEE_BASE_URL);
         }

         getEmployeeById(employeeId){
            return axios.get("http://localhost:8081/employee/get"+"/"+employeeId);
        }

          addEmployee(employee){
              return axios.post("http://localhost:8081/employee/add" , employee);
          }

          deleteEmployee(employeeId){
            return axios.delete("http://localhost:8081/employee/delete"+"/"+employeeId);
        }

        updateEmployee(employee, employeeId){
            return axios.put("http://localhost:8081/employee/update"+"/"+employeeId , employee);
        }
}

export default new EmployeeService();