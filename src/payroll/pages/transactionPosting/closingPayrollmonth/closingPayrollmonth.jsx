import React, { useEffect, useState } from "react";
import Style from './closingPayrollmonth.module.css'
import Header from "../../../../components/Includes/Header";
import SecondaryHeader from "../../../component/secondaryHeader";
import { Skeleton, message } from "antd";
import { Button } from '../../../../components/basic/button/index'
import * as hrRelease_Action from "../../../../store/actions/payroll/closingPayrollmonth/index";
import { connect } from "react-redux";
import Flags from "../../../component/flags";
import baseUrl from '../../../../config.json'

const ClosingPayrollMonth = ({ ChangeFlag }) => {
    const [loadingClick, setLoadingClick] = useState(false)
    const [monthNow, setMonthNow] = useState()

    useEffect(() => {
        fetch(`${baseUrl.baseUrl}/tranPaySlips/Process_TranPaySlips`, {
            method: "POST",
            headers: {
                accessToken: "Bareer " + localStorage.getItem("access_token"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "Payslip_category": localStorage.getItem("Payroll_Category")
            }),
        })
            .then((res) => res.json())
            .then(response => setMonthNow(response?.message[0]?.v_str))
    }, [])

    function getMonthNumber(monthName) {
        const monthMap = {
            January: 1,
            February: 2,
            March: 3,
            April: 4,
            May: 5,
            June: 6,
            July: 7,
            August: 8,
            September: 9,
            October: 10,
            November: 11,
            December: 12
        };
        const formattedMonthName = monthName.trim().charAt(0).toUpperCase() + monthName.trim().slice(1).toLowerCase();
        return monthMap[formattedMonthName] || undefined;
    }
    const ChangeFlagBtn = async () => {
        setLoadingClick(true)
        const InfoData = await ChangeFlag({ currentYear: monthNow?.split('/')[1], currentMonth: getMonthNumber(monthNow?.split('/')[0]) })
        if (InfoData.success) {
            message.success('Closed successfully')
        }
        setLoadingClick(false)
    }



    return (
        <>
            <div>
                <Header />
            </div>
            <div>
                <SecondaryHeader isSearch={false} title={'Closing Payroll Month'} total={'0'} />
            </div>
            <div className={Style.TableBody}>
                <div className="container pt-5">
                    <Flags color={'Green'} Title={`Do You want to close payroll for ${monthNow}`} />
                    <div className="py-4">
                        <Button onClick={ChangeFlagBtn} loading={loadingClick} title={'Close'} />
                    </div>
                </div>
            </div>
        </>
    )

}


function mapStateToProps({ hrRelease }) {
    return { hrRelease };
}
export default connect(mapStateToProps, hrRelease_Action)(ClosingPayrollMonth);