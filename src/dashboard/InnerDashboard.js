import React from 'react'
import Header from '../components/Includes/Header'
import EmpSalaryDepart from './InnerDashboard/Tables/EmpSalaryDepart'
import EmpFeedBack from './InnerDashboard/Tables/EmpFeedBack'
import EmpTraining from './InnerDashboard/Tables/EmpTraining'

const InnerDashboard = () => {
  return (
    <>
      <Header />

      <section style={{ marginTop: "100px" }}>
        <div className="container">
          <div className="row">
              <EmpSalaryDepart />
              <EmpFeedBack />
              <EmpTraining />
          </div>
        </div>
      </section>
    </>
  )
}

export default InnerDashboard