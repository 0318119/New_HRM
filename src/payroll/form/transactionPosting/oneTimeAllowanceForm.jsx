import React, { useEffect, useState } from "react";
import * as oneTimeAllowance_Action from "../../../store/actions/payroll/oneTimeAllowance/index";
import { connect } from "react-redux";
import Input from '../../../components/basic/input/index'
import Select from '../../../components/basic/input/select'
import { Skeleton, message } from "antd";
import { Button, CancelButton, DeleteButton } from '../../../components/basic/button/index';

const OneTimeAllowanceForm = ({ currentUser, getEmployeeData, getAllowanceList, getAllowanceDetail, saveAllowanceDetail, cancel, DeleteAllowanceDetail }) => {
    const [employee, setEmployee] = useState()
    const [allowanceList, setAllowanceList] = useState()
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
        setLoading(true)
        const employeeData = await getEmployeeData({ Emp_Code: currentUser })
        const allowanceList = await getAllowanceList()
        setEmployee(employeeData[0]);
        setAllowanceList(allowanceList)
        setLoading(false)
    }





    const [isStopped, setIsStopped] = useState(false)
    const MessageSuccess = () => {
        messageApi.open({
            type: 'loading',
            content: 'Please Wait',
            duration: 0,
        });
    };

    const OnSelect = async (e) => {
        if (e?.label !== undefined) {
            setIsStopped(true)
            MessageSuccess()
            const AllowanceDetail = await getAllowanceDetail({ Allowance_Code: e?.value, Emp_code: employee?.Sequence_no })
            setAllowanceDetail({
                Amount: AllowanceDetail[0]?.Amount == undefined ? '' : AllowanceDetail[0]?.Amount,
                Remarks: AllowanceDetail[0]?.Remarks == undefined ? '' : AllowanceDetail[0]?.Remarks,
                Deduction_code: 0,
                Allowance_Code: e?.value,
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
                Allowance_code: allowanceDetail?.Allowance_Code,
                Deduction_code: '0',
                ADE_flag: "A",
                FOE_flag: "O",
                Amount: allowanceDetail?.Amount,
                Reverse_flag: "N",
                Remarks: allowanceDetail?.Remarks
            })
            if (AllowanceSave.success == "success") {
                message.success('Allowance Created');
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
            Allowance_code: allowanceDetail?.Allowance_Code,
            Deduction_code: 0,
        })
        if (AllowanceSave.success == "success") {
            message.success('Allowance Deleted');
            setDelLoading(false)
            reset()
        }
        setDelLoading(false)
    }

    return (
        <>
            {contextHolder}
            <div className="container p-0">
                {loading ?
                    <div className="pt-3">
                        <Skeleton active={true} />
                    </div>
                    :
                    <>
                        <div className="row">
                            <div className="col-md-6 p-0">
                                <Input value={employee?.Emp_name} readonly={true} label={'Employee Name'} name={'employeeName'} />
                                <Input value={employee?.Desig_name} readonly={true} label={'Designation'} name={'designation'} />
                            </div>
                            <div className="col-md-6 p-0">
                                <Input value={employee?.Dept_name} readonly={true} label={'Department'} name={'department'} />
                                <Select isStopped={isStopped} type={'allowance'} handleChange={OnSelect} label={'Select Allowance'} option={allowanceList} />
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
                                    <div className="col-12 mt-5 d-flex justify-content-end align-items-center p-0">
                                        <CancelButton onClick={reset} title={'Cancel'} />
                                        <DeleteButton loading={delLoading} onClick={DeleteAllowance} title={'Delete'} />
                                        <Button loading={loading} onClick={saveAllowance} title={'Save'} />
                                    </div>
                                </>
                            }
                        </div>
                    </>
                }
            </div>
        </>
    )
}
function mapStateToProps({ oneTimeAllowance }) {
    return { oneTimeAllowance };
}
export default connect(mapStateToProps, oneTimeAllowance_Action)(OneTimeAllowanceForm);