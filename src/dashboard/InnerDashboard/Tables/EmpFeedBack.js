import React from 'react'
import { Space, Table, } from 'antd';


const EmpFeedBack = () => {

    const columns = [
        {
            title: 'Employee ID',
            dataIndex: 'Id',
            width: 100,
        },
        {
            title: 'Employee Name',
            dataIndex: 'Emp_Name',
            width: 200,
        },
        {
            title: 'Team',
            dataIndex: 'team',
            width: 200,
        },
        {
            title: 'Job Title',
            dataIndex: 'job',
            width: 300,
        },
        {
            title: 'Avg. Rating/5',
            dataIndex: 'rating',
            width: 150,
        },
        {
            title: 'Feedback',
            dataIndex: 'Feedback',
            width: 400,
        },
    ];
    const data = [
        {
            key: '1',
            Id: 'S011',
            Emp_Name: "Hanna Moos",
            team: "Finance",
            job: "Senior Consultant",
            rating: "4.0",
            Feedback: "Completed assigned task"
        },
        {
            key: '2',
            Id: 'S011',
            Emp_Name: "Hanna Moos",
            team: "Finance",
            job: "Senior Consultant",
            rating: "4.0",
            Feedback: "Completed assigned task"
        },
        {
            key: '3',
            Id: 'S011',
            Emp_Name: "Hanna Moos",
            team: "Finance",
            job: "Senior Consultant",
            rating: "4.0",
            Feedback: "Completed assigned task"
        },
        {
            key: '4',
            Id: 'S011',
            Emp_Name: "Hanna Moos",
            team: "Finance",
            job: "Senior Consultant",
            rating: "4.0",
            Feedback: "Completed assigned task"
        },
        {
            key: '5',
            Id: 'S011',
            Emp_Name: "Hanna Moos",
            team: "Finance",
            job: "Senior Consultant",
            rating: "4.0",
            Feedback: "Completed assigned task"
        },
    ];


    return (
        <>

            <div className="col-lg-6 mt-3">
                <div className='feedbackBox'>
                <h5>Employee feedback details</h5>
                <Table
                    className="feedBack_tables"
                    columns={columns}
                    loading={false}
                    dataSource={data}
                    scroll={{ x: 10 }}
                    pagination={false}
                    bordered 
                    tableLayout="fixed"
                />
                </div>
            </div>
        </>
    )
}

export default EmpFeedBack