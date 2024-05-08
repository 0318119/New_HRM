import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormInput, FormSelect } from '../../../src/components/basic/input/formInput';
import Header from '../../../src/components/Includes/Header';
import { PrimaryButton } from '../../../src/components/basic/button';
import { message } from 'antd';
import { useForm } from 'react-hook-form';
import { saveAs } from 'file-saver';
import { yupResolver } from '@hookform/resolvers/yup';
import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'
import * as yup from 'yup';
import * as ACTIONS from '../../store/actions/payroll/Paysheet_Report';

function Paysheet_Report({
    GetallPayrollCategories,
    GetEmployee_Category,
    PostPaysheetPayload,
    Red_Paysheet_Report,
}) {
    const [isLoading, setLoading] = useState(false);
    const [isFormSubmitted, setFormSubmitted] = useState(false);
    const empData = Red_Paysheet_Report?.data?.[0]?.res?.data;
    const [isDOBReportData, setDOBReportData] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const [isGeneratedData, setGeneratedData] = useState([]);
    const PayrollCategories_Data = Red_Paysheet_Report?.PayrollCategories?.[0]?.res
    const EmployeeCategory_Data = Red_Paysheet_Report?.EmployeeCategory?.[0]?.res


    // ===== SCHEMA =================
    const PaysheetReportSchema = yup.object().shape({
        Payslip_month: yup.string().required('Please Select the Month'),
        Payslip_year: yup.string().required('Please Select the Year Month'),
        payroll_category_code: yup.string().required('Please Select the Payroll Category'),
        Employee_category_code: yup.string().required('Please Select the Employee Category'),
    });

    const data1 = PayrollCategories_Data?.data || [];
    const data2 = EmployeeCategory_Data?.data || [];
    const options1 = [
        ...data1.map((item) => ({
            value: item.Payroll_Category_code, // Value for the dropdown
            label: item.Payroll_Category_name // Displayed label
        })),
    ];
    const options2 = [
        ...data2.map((item) => ({
            value: item.Emp_Category_code,
            label: item.Emp_Category_name
        })),
    ];
    const {
        control,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm({
        defaultValues: {
            Payslip_month: '',
            Payslip_year: '',
            payroll_category_code: '',
            Employee_category_code: '',
        },
        mode: 'onChange',
        resolver: yupResolver(PaysheetReportSchema),
    });

    const submitForm = async (data) => {
        setLoading(true)
        try {
            const isValid = await PaysheetReportSchema.validate(data);
            if (isValid) {
                confirm(data)
            }
        } catch (error) {
            console.error(error);
            setLoading(false)
        }
    }

  
    const confirm = async (data) => {
        const paylaod = {
            "Payslip_year": data?.Payslip_year,
            "Payslip_month": data?.Payslip_month,
            "Employee_category_code": data?.Employee_category_code,
            "payroll_category_code": data?.payroll_category_code
        }
        const isCheckResponse = await PostPaysheetPayload(paylaod)
        if (isCheckResponse?.success) {
            console.log("done", isCheckResponse?.data)
            message.success("Your Report is downloading")
            setLoading(false)
            DownloadExcel(isCheckResponse?.data)
        } else {
            message.error(isCheckResponse?.message || isCheckResponse?.messsage)
            setLoading(false)
        }
    }

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
    const fileExtension = '.xlsx';
    const DownloadExcel = async (report) => {
        const ws = XLSX.utils.json_to_sheet(report);
        const wb = { Sheets: { 'Paysheet_Report': ws }, SheetNames: ['Paysheet_Report'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, "Paysheet_Report" + fileExtension);
    }



    useEffect(() => {
        setValue('Payslip_month', currentMonth);
        setValue('Payslip_year', currentYear);
    }, [setValue]);

    useEffect(() => {
        GetallPayrollCategories();
        GetEmployee_Category();
    }, []);

    return (
        <>
            <Header />
            <div className="container maringClass">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div>
                            <form onSubmit={handleSubmit(submitForm)} >
                                <h4 className="text-dark"> Payslip - Paysheet Report </h4>
                                <hr />
                                <div className="form-group formBoxCountry">
                                    <FormSelect
                                        errors={errors}
                                        control={control}
                                        placeholder={"Please select a month"}
                                        name={'Payslip_month'}
                                        label={'Month'}
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
                                    <FormSelect
                                        errors={errors}
                                        control={control}
                                        name={'Payslip_year'}
                                        placeholder={'Please select a year'}
                                        label={'Please select a year'}
                                        options={[
                                            { value: 2021, label: '2021' },
                                            { value: 2022, label: '2022' },
                                            { value: 2023, label: '2023' },
                                            { value: 2024, label: '2024' },
                                            { value: 2025, label: '2025' },
                                        ]}
                                    />
                                    <FormSelect
                                        errors={errors}
                                        control={control}
                                        label={'Employee Category'}
                                        placeholder='Select Employee Category'
                                        id="payroll_category_code"
                                        name="payroll_category_code"
                                        options={options1}
                                    />
                                    <FormSelect
                                        errors={errors}
                                        control={control}
                                        label={'Payroll Category'}
                                        placeholder='Select Payroll Category'
                                        id="Employee_category_code"
                                        name="Employee_category_code"
                                        options={options2}
                                    />
                                </div>
                                <div className='paySlipBtnBox'>
                                    <PrimaryButton type={'submit'} loading={isLoading} title="Submit" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}


function mapStateToProps({ Red_Paysheet_Report }) {
    return { Red_Paysheet_Report };
}
export default connect(mapStateToProps, ACTIONS)(Paysheet_Report)
