import React, { useEffect, useState } from "react";
import * as advanceSalary_Action from "../../../store/actions/payroll/advanceSalary/index";
import { connect } from "react-redux";
import Input from '../../../components/basic/input/index'
import Select from '../../../components/basic/input/select'
import { Skeleton, message } from "antd";
import { Button, CancelButton, DeleteButton } from '../../../components/basic/button/index';

const OneTimeAllowanceForm = ({ getDeductionEmployeeData, currentUser, getAllowanceDetail, saveAllowanceDetail, cancel, DeleteAllowanceDetail }) => {
    const [employee, setEmployee] = useState()
    const [employeeSallary, setEmployeeSallary] = useState()
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
        const AllowanceDetail = await getAllowanceDetail({ Emp_code: currentUser })
        setAllowanceDetail({
            Amount: AllowanceDetail[0]?.Amount == undefined ? '' : AllowanceDetail[0]?.Amount,
            Remarks: AllowanceDetail[0]?.Remarks == undefined ? '' : AllowanceDetail[0]?.Remarks,
            Deduction_code: "28",
            Allowance_Code: 0,
            Emp_code: employee?.Sequence_no,
        })
        setEmployee(employeeData[0]);
        setLoader(false)
    }

    const RemarksChange = (e) => {
        setAllowanceDetail(
            {
                Amount: allowanceDetail.Amount,
                Remarks: e.target.value,
                Deduction_code: allowanceDetail.Deduction_code,
                Allowance_Code: allowanceDetail.Allowance_Code,
                Emp_code: allowanceDetail.Emp_code,
            }
        )
    }
    const AmountChange = (e) => {
        setAllowanceDetail(
            {
                Amount: e.target.value,
                Remarks: allowanceDetail.Remarks,
                Deduction_code: allowanceDetail.Deduction_code,
                Allowance_Code: allowanceDetail.Allowance_Code,
                Emp_code: allowanceDetail.Emp_code,
            }
        )
    }
    const saveAllowance = async () => {
        console.log(allowanceDetail.Amount, 'asdas')
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
                Emp_Code: currentUser,
                Amount: allowanceDetail?.Amount,
                Remarks: allowanceDetail?.Remarks
            })
            if (AllowanceSave.success == "success") {
                message.success('Advance Salary Created');
                setLoading(false)
                reset()
            }
            setLoading(false)
        }
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
                            <Input value={employeeSallary?.LastMonthNetSalary?.LastMonthNetSalary == null ? "0.00" : employeeSallary?.LastMonthNetSalary?.LastMonthNetSalary} readonly={true} label={'Last Month Net Salary'} name={'employeeName'} />
                        </div>

                        <div className="col-12 mt-5">
                            <h3 style={{ color: 'black' }}><b>Transaction Information</b></h3>
                        </div>
                        <hr />



                        <div className="col-md-6 p-0">
                            <Input onChange={AmountChange} value={allowanceDetail.Amount} placeholder={"Enter amount"} label={'Amount'} name={'Amount'} type={'number'} />
                        </div>
                        <div className="col-md-6 p-0">
                            <Input onChange={RemarksChange} value={allowanceDetail.Remarks} placeholder={"Enter remarks"} label={'Remarks'} name={'Remarks'} max={'50'} />
                        </div>
                        <div className="col-12 mt-5 p-0 d-flex justify-content-end align-items-center">
                            <CancelButton onClick={reset} title={'Cancel'} />
                            <Button loading={loading} onClick={saveAllowance} title={'Save'} />
                        </div>
                    </div>
                </>
            }
        </>
    )
}
function mapStateToProps({ FixedDeduction }) {
    return { FixedDeduction };
}
export default connect(mapStateToProps, advanceSalary_Action)(OneTimeAllowanceForm);