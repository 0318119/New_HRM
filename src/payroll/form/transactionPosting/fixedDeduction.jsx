import React, { useEffect, useState } from "react";
import * as FixedDeduction_Action from "../../../store/actions/payroll/FixedDeduction/index";
import { connect } from "react-redux";
import Input from '../../../components/basic/input/index'
import Select from '../../../components/basic/input/select'
import { Skeleton, message } from "antd";
import { Button, CancelButton, DeleteButton } from '../../../components/basic/button/index';

const OneTimeAllowanceForm = ({ getDeductionEmployeeData, getDeductionEmployeeSallaryData, getDeductionList, currentUser, getEmployeeData, getAllowanceDetail, saveAllowanceDetail, cancel, DeleteAllowanceDetail }) => {
    const [employee, setEmployee] = useState()
    const [employeeSallary, setEmployeeSallary] = useState()
    const [allowanceList, setAllowanceList] = useState()
    const [loader, setLoader] = useState(false)
    const [isNext, setIsNext] = useState(false)
    const [loading, setLoading] = useState(false)
    const [delLoading, setDelLoading] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();



    const [allowanceDetail, setAllowanceDetail] = useState({
        Amount: "",
        Remarks: "",
        Allowance_Code: "",
        Emp_code: "",
        Deduction_code: ""
    })
    console.log(currentUser, 'asdas')
    const reset = () => {
        cancel('read')
        setAllowanceDetail({
            Amount: "",
            Remarks: "",
            Allowance_Code: "",
            Emp_code: "",
            Deduction_code: ""
        })
    }
    useEffect(() => {
        DataLoader()
    }, [])
    const DataLoader = async () => {
        setLoader(true)
        const employeeData = await getDeductionEmployeeData({ Emp_code: currentUser })
        const allowanceList = await getDeductionList()
        const employeeDataSallary = await getDeductionEmployeeSallaryData({ Emp_code: currentUser })
        setEmployeeSallary(employeeDataSallary)
        setEmployee(employeeData[0]);
        setAllowanceList(allowanceList)
        setLoader(false)
    }



    const MessageSuccess = () => {
        messageApi.open({
            type: 'loading',
            content: 'Please Wait',
            duration: 0,
        });
    };

    const [isStopped, setIsStopped] = useState(false)

    const OnSelect = async (e) => {
        if (e?.label !== undefined) {
            setIsStopped(true)
            MessageSuccess()
            const AllowanceDetail = await getAllowanceDetail({ DeductionCode: e?.value, Emp_code: employee?.Sequence_no })
            setAllowanceDetail({
                Amount: AllowanceDetail[0]?.Amount == undefined ? '' : AllowanceDetail[0]?.Amount,
                Remarks: AllowanceDetail[0]?.Remarks == undefined ? '' : AllowanceDetail[0]?.Remarks,
                Deduction_code: e?.value,
                Allowance_Code: 0,
                Emp_code: employee?.Sequence_no,
            })
            setIsStopped(false)
            messageApi.destroy()
            setIsNext(true)
        }
        else {
            setIsNext(false)
        }
    }





    const RemarksChange = (e) => {
        setAllowanceDetail(
            {
                Amount: allowanceDetail.Amount,
                Remarks: e?.target?.value,
                Deduction_code: allowanceDetail.Deduction_code,
                Allowance_Code: allowanceDetail.Allowance_Code,
                Emp_code: allowanceDetail.Emp_code,
            }
        )
    }
    const AmountChange = (e) => {
        setAllowanceDetail(
            {
                Amount: e?.target?.value,
                Remarks: allowanceDetail.Remarks,
                Deduction_code: allowanceDetail.Deduction_code,
                Allowance_Code: allowanceDetail.Allowance_Code,
                Emp_code: allowanceDetail.Emp_code,
            }
        )
    }
    const saveAllowance = async () => {
        setLoading(true)
        if (allowanceDetail.Amount == "" || allowanceDetail.Amount == undefined) {
            message.error('Amount is required')
            setLoading(false)
        }
        else if (allowanceDetail?.Amount?.length > 6) {
            message.error('Enter valid amount')
            setLoading(false)
        }
        else if (allowanceDetail.Remarks == "" || allowanceDetail.Amount == undefined) {
            message.error('Remarks is required')
            setLoading(false)
        }
        else {
            const AllowanceSave = await saveAllowanceDetail({
                Emp_Code: allowanceDetail?.Emp_code,
                Allowance_code: '0',
                Deduction_code: allowanceDetail?.Deduction_code,
                ADE_flag: "D",
                FOE_flag: "F",
                Amount: allowanceDetail?.Amount,
                Reverse_flag: "N",
                Remarks: allowanceDetail?.Remarks
            })
            console.log(AllowanceSave, 'cccc')
            if (AllowanceSave.success == "success") {
                message.success('Deduction Created');
                setLoading(false)
                reset()
            }
            setLoading(false)
        }
    }


    const DeleteAllowance = async () => {
        setDelLoading(true)
        const AllowanceSave = await DeleteAllowanceDetail({
            Emp_Code: allowanceDetail?.Emp_code,
            Allowance_code: 0,
            Deduction_code: allowanceDetail?.Deduction_code,
        })
        if (AllowanceSave.success == "success") {
            message.success('Deduction Deleted');
            setDelLoading(false)
            reset()
        }
        setDelLoading(false)
    }
    return (
        <>
            {contextHolder}
            {loader ?
                <div className="pt-3">
                    <Skeleton active />
                </div>
                :
                <>
                    <div className="row">
                        <div className="col-md-3 p-0">
                            <Input value={employee?.Emp_name} readonly={true} label={'Employee Name'} name={'employeeName'} />
                        </div>
                        <div className="col-md-3 p-0">
                            <Input value={employee?.Desig_name} readonly={true} label={'Designation'} name={'designation'} />
                        </div>
                        <div className="col-md-3 p-0">
                            <Input value={employee?.Dept_name} readonly={true} label={'Department'} name={'department'} />
                        </div>
                        <div className="col-md-3 p-0">
                            <Select isStopped={isStopped} handleChange={OnSelect} label={'Select Deduction'} option={allowanceList} />
                        </div>
                        <div className="col-md-3 p-0">
                            <Input value={employeeSallary?.LastMonthNetSalary?.LastMonthNetSalary == null ? "0.00" : employeeSallary?.LastMonthNetSalary?.LastMonthNetSalary} readonly={true} label={'Last Month Net Salary'} name={'employeeName'} />
                        </div>
                        <div className="col-md-3 p-0">
                            <Input value={employeeSallary?.LastMonthGrossSalary?.LastMonthGrossSalary} readonly={true} label={'Last Month Gross Salary'} name={'designation'} />
                        </div>
                        {isNext &&
                            <>
                                <div className="col-12 mt-5">
                                    <h3 style={{ color: 'black' }}><b>Transaction Information</b></h3>
                                </div>
                                <hr />

                                <div className="col-md-6 p-0">
                                    <Input onChange={AmountChange} OrValue={allowanceDetail.Amount} placeholder={"Enter amount"} label={'Amount'} name={'Amount'} type={'number'} />
                                </div>
                                <div className="col-md-6 p-0">
                                    <Input onChange={RemarksChange} OrValue={allowanceDetail.Remarks} placeholder={"Enter remarks"} label={'Remarks'} name={'Remarks'} max={'50'} />
                                </div>
                                <div className="col-12 mt-5 p-0 d-flex justify-content-end align-items-center">
                                    <CancelButton onClick={reset} title={'Cancel'} />
                                    <DeleteButton loading={delLoading} onClick={DeleteAllowance} title={'Delete'} />
                                    <Button loading={loading} onClick={saveAllowance} title={'Save'} />
                                </div>
                            </>
                        }
                    </div>
                </>
            }
        </>
    )
}
function mapStateToProps({ FixedDeduction }) {
    return { FixedDeduction };
}
export default connect(mapStateToProps, FixedDeduction_Action)(OneTimeAllowanceForm);