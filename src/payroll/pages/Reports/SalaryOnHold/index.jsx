import React, { useEffect, useRef, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, pdf, Image, PDFViewer } from '@react-pdf/renderer';
import LogoPdf from '../../../../../src/Assets/Images/download.png'
import PSPDFKit from 'pspdfkit';
import * as SalarOnHolds_Action from "../../../../store/actions/payroll/salaryOnHold/index";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, PrimaryButton } from '../../../../components/basic/button';
import { FormSelect } from '../../../../components/basic/input/formInput';
import Header from '../../../../components/Includes/Header';
import '../../../assest/css/paySlip.css'
import { saveAs } from 'file-saver';
import { DateTime } from "luxon";
import imgLogo from '../../../../Assets/Images/download.png'



const SalaryOnHold = ({ getSalaryOnHold , Red_SalaryOnHold  }) => {
    const [loading, setLoading] = useState(false)
    const [blobStore, setBobStore] = useState()
    const [companyLogo, setComapnyLogo] = useState()
    const [isDownload, setIsdownload] = useState(false)
    const [PdfLoader, setPdfLoader] = useState(false)
    const [pdfPassowrd, setPdfPassowrd] = useState()
    const [monthCurrent, setMonthCurrent] = useState()
    const [isReportData , setReportData] = useState([])
    const [YearCurrent, setYearCurrent] = useState()
    const [isPdfData, setPdfData] = useState([])
    const borderColor = 'black'

    useEffect(() => {
        getSalaryOnHold()
        DataLoader()
    }, [])
    const DataLoader = async () => {
        // const currentDate = new Date();
        // const currentMonth = currentDate.getMonth() + 1;
        // const currentYear = currentDate.getFullYear();
        // setMonthCurrent(currentMonth);
        // setYearCurrent(currentYear);
    }




    const submitForm = async () => {
        setLoading(true)
        const DataFromApi = await Red_SalaryOnHold?.data
        setPdfData(DataFromApi)
    }

    const PdfData = (
        <Document >
          <Page size="A4">
            <View>
            {/* Red_SalaryOnHold?.data?.[0]?.img */}
              <Image src={imgLogo} style={{height: "60px",width: "80px"}}/>
              <Text style={{ textAlign: 'center', fontSize: '16', fontWeight: 'bold', marginTop: "20" }}>
                Employee Attendance PDF
              </Text>
              <View style={{ flexDirection: 'row', borderBottom: '1 solid #000', padding: '10', marginBottom: '5' , marginTop:"50"}}>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '10', fontWeight: 'bold' }}>Employee Code</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '10', fontWeight: 'bold' }}>Employee Name</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '10', fontWeight: 'bold' }}>Department Name</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '10', fontWeight: 'bold' }}>Designation Name</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '10', fontWeight: 'bold' }}>Salary</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '10', fontWeight: 'bold' }}>Salary Hold Date</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '10', fontWeight: 'bold' }}>Salary Hold Description</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: '10', fontWeight: 'bold' }}>Salary Hold Flag</Text>
              </View>
              {Red_SalaryOnHold?.data?.map((item, index) => (
                <View key={index} style={{ flexDirection: 'row', borderBottom: '1 solid #000', paddingBottom: '5', marginBottom: '5' }}>
                  <Text style={{ width: '50%', textAlign: 'center', fontSize: '8' }}>{item?.Emp_code ? item?.Emp_code : null}</Text>
                  <Text style={{ width: '50%', textAlign: 'center', fontSize: '8' }}>{item?.Emp_name ? item?.Emp_name : null}</Text>
                  <Text style={{ width: '50%', textAlign: 'center', fontSize: '8' }}>{item?.Dept_name ? item?.Dept_name : null}</Text>
                  <Text style={{ width: '50%', textAlign: 'center', fontSize: '8' }}>{item?.Desig_name ? item?.Desig_name : null}</Text>
                  <Text style={{ width: '50%', textAlign: 'center', fontSize: '8' }}>{item?.Salary ? item?.Salary : null}</Text>
                  <Text style={{ width: '50%', textAlign: 'center', fontSize: '8' }}>{item?.Salary_Hold_Date ? item?.Salary_Hold_Date : null}</Text>
                  <Text style={{ width: '50%', textAlign: 'center', fontSize: '8' }}>{item?.Salary_Hold_Description ? item?.Salary_Hold_Description : null}</Text>
                  <Text style={{ width: '50%', textAlign: 'center', fontSize: '8' }}>{item?.Salary_Hold_Flag ? item?.Salary_Hold_Flag : null}</Text>
s                </View>
              ))}
            </View>
          </Page>
        </Document>
      )
    const handleDownload = async () => {
        const pdfBlob = await pdf(PdfData).toBlob();
        saveAs(pdfBlob, 'Attendance_sheet.pdf');
        // setBtnDownalod(false)
      };
    return (
        <>
            <div>
                <Header />
            </div>
            <div className="container maringClass">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <h4 className="text-dark">Salary on hold report</h4>
                        <div className="paySlipBtnBox">
                            <Button loading={PdfLoader} onClick={handleDownload} type={'submit'} title="Download Pdf" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

function mapStateToProps({ Red_SalaryOnHold }) {
    return { Red_SalaryOnHold };
}
export default connect(mapStateToProps, SalarOnHolds_Action)(SalaryOnHold);
