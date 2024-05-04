import React, { useState, useEffect } from "react";
import '../assets/css/chart.css'
import { Link, useNavigate } from "react-router-dom";
import { FormInput, FormSelect } from "../../components/basic/input/formInput";
import { message } from 'antd'
import { useForm } from "react-hook-form";
import { Select, Space } from 'antd';
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
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonthNumber = currentDate.getMonth();
  const monthNames = [
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
  ];
  const currentMonthName = monthNames[currentMonthNumber];
  const [isCurrentMonth, setCurrentMonth] = useState(null)
  const [isCurrentYear, setCurrentYear] = useState(null)
  const handleMonth = (value) => {
    setCurrentMonth(value)
  };
  const handleYears = (value) => {
    setCurrentYear(value)
  };


  const obj = JSON.stringify({
    "month": isCurrentMonth == null ? currentMonthName?.value : isCurrentMonth,
    "year": isCurrentYear == null ? currentYear : isCurrentYear
  })
  async function getAttendance() {
    await fetch(
      `${config["baseUrl"]}/dashboard/GetUserAttendanceSummaryDashboard`,{
        method: "POST",
        headers: {
          "content-type": "application/json",
          accessToken: `Bareer ${get_access_token}`,
        },
        body: obj
      })
      .then((response) => { return response.json();})
      .then(async (response) => {
        if(response.data[0]?.length == 0){
          message.error("Records not found")
        }else{
          setGetAttendData(response?.data?.[0]);
          console.log("response.data[0]",response?.data?.[0])
        }
      })
      .catch((error) => {})
      .finally(() => {});
  }

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
  }, [isCurrentMonth,isCurrentYear]);

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
        <div className="row">
          <div className="chart_filter_box">
            <div className="SelectYearAndMonth col-lg-3">
              <Select
                defaultValue={currentMonthName?.label}
                onChange={handleMonth}
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
              />
            </div>
            <div className="SelectYearAndMonth col-lg-3 ml-2">
              <Select
                defaultValue={currentYear}
                onChange={handleYears}
                options={[
                  { value: 2023, label: '2023' },
                  { value: 2024, label: '2024' },
                  { value: 2025, label: '2025' },
                  { value: 2026, label: '2026' },
                  { value: 2027, label: '2027' },
                  { value: 2028, label: '2028' },
                  { value: 2029, label: '2029' },
                  { value: 2030, label: '2030' },
                ]}
              />
            </div>
            {/* onClick={() => {}} */}
            <div className="goBtn" >
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