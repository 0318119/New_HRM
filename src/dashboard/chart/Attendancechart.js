import React, { useState, useEffect } from "react";
import '../assets/css/chart.css'
import { Link, useNavigate } from "react-router-dom";
import { FormInput, FormSelect } from "../../components/basic/input/formInput";
import { message } from 'antd'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RiLoader3Line } from "react-icons/ri";

import SelectCom from "../../components/basic/select";
// import 'chartjs-plugin-datalabels';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
const config = require("../../config.json");

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



export default function Attendancechart() {
  var get_refresh_token = localStorage.getItem("refresh");
  var get_access_token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dataLoader, setDataLoader] = useState(false);
  const [DataErr, setDataErr] = useState('')
  const [getAttendData, setGetAttendData] = useState([])
  const [isCurrentMonth , setCurrentMonth] = useState('')
  const [isCurrentYear , setCurrentYear] = useState('')




  console.log(isCurrentMonth ,isCurrentYear , 'check')


  async function getAttendance() {
  

  

    await fetch(
      `${config["baseUrl"]}/dashboard/GetUserAttendanceSummaryDashboard`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accessToken: `Bareer ${get_access_token}`,
        },
        body: JSON.stringify({
          "month": isCurrentMonth,
          "year": isCurrentYear
      })
      }
    )
      .then((response) => {
        return response.json();
      })
      .then(async (response) => {
        if (response.messsage == "unauthorized") {
          await fetch(
            `${config["baseUrl"]}/dashboard/GetUserAttendanceSummaryDashboard`,
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
                refereshToken: `Bareer ${get_refresh_token}`,
              },
              body: JSON.stringify({
                "month": isCurrentMonth,
                "year": isCurrentYear
            })
            }
          )
            .then((response) => {
              return response.json();
            })
            .then((response) => {
              if (response.messsage == "timeout error") {
                navigate("/");
              } else {
                localStorage.setItem("refresh", response.referesh_token);
                localStorage.setItem("access_token", response.access_token);
                setGetAttendData(response.data[0]);
                setDataLoader(true);
              }
            })
            .catch((error) => {
              setDataErr(error.message);
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          setGetAttendData(response.data[0]);
          setDataLoader(true);
        }
      })
      .catch((error) => {
        setDataErr(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  console.log(getAttendData , 'get')

  const options = {
    responsive: true,
    // beginAtZero: true,
    // maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
        intersect: true,
        callbacks: {
          label: (context) => ` Status : ${context?.dataset?.label} `,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        display: false,
      },
    }
  };

  const labels = getAttendData?.map((items) => items.Date + " " + items.Month);
  const data = {
    labels,
    datasets: [
      {
        id: 1,
        label: "Present",
        data: getAttendData?.map((items) => items?.Attendance_Status == 'Present' ? items.Progress : null),
        backgroundColor: "#1587E7",
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
      {
        id: 2,
        label: 'Absent',
        data: getAttendData?.map((items) => items?.Attendance_Status == 'Absent' ? 5.10 : null),
        backgroundColor: "red",
        borderColor: '#bd1b1b',
        borderWidth: 2,
      },
      {
        id: 3,
        label: 'Late',
        data: getAttendData?.map((items) => items?.Attendance_Status == 'Late' ? items?.Progress : null),
        backgroundColor: "#d7d730",
        borderColor: '#cfcf09',
        borderWidth: 2,
      },
      {
        id: 4,
        label: 'Off',
        data: getAttendData?.map((items) => items?.DayType == 'Holiday' && items?.DayName == "Saturday" || items?.DayName == "Sunday" ? 9.10 : null),
        backgroundColor: "black",
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
  };

  useEffect(() => {
    getAttendance();
  }, []);




  return (

    <>
      <div className="container">
        <div className="row">
          {/* <div className="col-12 d-flex justify-content-end">
            <Link to="/Get_Attendance" className="text-dark mt-3 d-block" style={{ background: "#F7F5F5", padding: "10px", borderRadius: "10px" }}><b>Attendance Report</b></Link>
          </div> */}
          <div className="row">
            <div className="col-12 mt-5">
              <h5 className="mb-3 text-dark text-center"><b>Employee Attendance</b></h5>
            </div>
          </div>
        </div>
        <div className="row" style={{ border: "1px solid #8080804a", borderRadius: "10px" }}>
        <div className="col-12 d-flex">
          <div className="SelectYearAndMonth">
            <label>Select Month</label>
           <select onChange={(e) => setCurrentMonth(e.target.value)} >
              <option value="1" >January</option>
              <option value='2'>February</option>
              <option value='3'>March</option>
              <option value='4'>April</option>
              <option value='5'>May</option>
              <option value='6'>June</option>
              <option value='7'>July</option>
              <option value='8'>August</option>
              <option value='9'>September</option>
              <option value='10'>October</option>
              <option value='11'>November</option>
              <option value='12'>December</option>
           </select>
          {/* <FormSelect
                  errors={errors}
                  control={control}
                  placeholder={"Select Month"}
                  
                  name={'Select Month'}
                  label={'Select Month'}
                  options={[
                    { value: 1, label: 'January' },
                    { value: 2, label: 'February' },
                    { value: 3, label: 'March' },
                    { value: 4, label: 'April' },
                    { value: 5, label: 'May' },
                    { value: 6, label: 'June' },
                    { value: 7, label: 'July' },
                    { value: 8, label: 'August' },
                    { value: 9, label: 'September' },
                    { value: 10, label: 'October' },
                    { value: 11, label: 'November' },
                    { value: 12, label: 'December' },
                  ]}
                /> */}
          </div>
          <div className="SelectYearAndMonth">
            <label>Select Year</label>
          <select onChange={(e) => setCurrentYear(e.target.value)} defaultValue="2024">
              <option value='2023'>2023</option>
              <option value='2024' >2024</option>
              <option value='2025'>2025</option>
              <option value='2026'>2026</option>
              <option value='2027'>2027</option>
              <option value='2028'>2028</option>
              <option value='2029'>2029</option>
              <option value='2030'>2030</option>
           </select>
          {/* <FormSelect
                  errors={errors}
                  control={control}
                  name={'Select Year'}
                  placeholder={'Select Year'}
                  label={'Select Year'}
                  options={[
                    { value: 2021, label: '2021' },
                    { value: 2022, label: '2022' },
                    { value: 2023, label: '2023' },
                    { value: 2024, label: '2024' },
                    { value: 2025, label: '2025' },
                  ]}
                /> */}
          </div>
          <div className="goBtn" onClick={getAttendance}>
             <RiLoader3Line className="goIcon" />
          </div>

        </div>
          <div className="col-12">
            <Bar options={options} data={data} />
          </div>
        </div>
      </div>
    </>

  );
}