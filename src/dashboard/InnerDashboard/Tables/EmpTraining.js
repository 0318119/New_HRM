import React from 'react'
import { Space, Table, } from 'antd';


const EmpTraining = () => {

    const columns = [
        {
            title: 'Employee ID',
            dataIndex: 'Id',
            width: 100,
        },
        {
            title: 'Employee Name',
            dataIndex: 'name',
            width: 200,
        },
        {
            title: 'Training Completion Rate',
            dataIndex: 'CompletionRate',
            width: 200,
        },
        {
            title: 'Skill Improvemnt',
            dataIndex: 'skill',
            width: 200,
        },
        {
            title: 'Engagement in Learning',
            dataIndex: 'learning',
            width: 200,
        },
        {
            title: 'Time to Competency',
            dataIndex: 'competency',
            width: 200,
        },
        {
            title: 'ROI of Training',
            dataIndex: 'ROI',
            width: 200,
        },
        {
            title: 'Employee Feedback',
            dataIndex: 'Feedback',
            width: 600,
        },
    ];
    const data = [
        {
            key: '1',
            Id: 'S001',
            name: "Hamza",
            CompletionRate: "94%",
            skill: "79%",
            learning: "87%",
            competency: "5 months",
            ROI: "95%",
            Feedback: "I learned practical techniques that I can apply in my daily interactions with colleagues and clients.",
        },
        {
            key: '2',
            Id: 'S001',
            name: "Rehman",
            CompletionRate: "94%",
            skill: "79%",
            learning: "87%",
            competency: "5 months",
            ROI: "95%",
            Feedback: "I learned practical techniques that I can apply in my daily interactions with colleagues and clients.",
        },
        {
            key: '3',
            Id: 'S001',
            name: "Mustufa",
            CompletionRate: "94%",
            skill: "79%",
            learning: "87%",
            competency: "5 months",
            ROI: "95%",
            Feedback: "I learned practical techniques that I can apply in my daily interactions with colleagues and clients.",
        },
        {
            key: '4',
            Id: 'S001',
            name: "Arbab",
            CompletionRate: "94%",
            skill: "79%",
            learning: "87%",
            competency: "5 months",
            ROI: "95%",
            Feedback: "I learned practical techniques that I can apply in my daily interactions with colleagues and clients.",
        },
        {
            key: '5',
            Id: 'S001',
            name: "Ahemad",
            CompletionRate: "94%",
            skill: "79%",
            learning: "87%",
            competency: "5 months",
            ROI: "95%",
            Feedback: "I learned practical techniques that I can apply in my daily interactions with colleagues and clients.",
        },
        
    ];


    return (
        <>

            <div className="col-lg-12 mt-5">
                <div className='feedbackBox'>
                <h5>Employee Training and Development Details</h5>
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

export default EmpTraining