import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select, Space, Table } from "antd";
import { UserAddOutlined, PlusCircleTwoTone, PlusSquareOutlined } from "@ant-design/icons";
import Question from "../../components/Question";

function Home(props){
    const initialState = [];
    const [persons, setPersons] = useState(initialState);
    const [selectedId, setSelectedId] = useState(0);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', gender: 'Other'});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        //get data from api
        axios.get("https://localhost:7114/api/v1/Person")
        .then(resp => {
            setPersons(resp.data)
        });
    }

    const handleOk = () => {
        savePerson();
        setOpen(false);
    }

    const handleCancel = () => {
        setOpen(false);
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleGenderChange = (value) => {
        setFormData({ ...formData, gender: value });
    };

    const savePerson = () => {
        //update
        if(formData.id)
            axios.put("https://localhost:7114/api/v1/Person/" + formData.id, formData )
                    .then(_ => fetchData());
        //new save
        else
            axios.post("https://localhost:7114/api/v1/Person", formData )
                    .then(_ => fetchData());   
                    
        setFormData(initialState);
    }

    const handleDelete = (id) => {
        setSelectedId(id);
        setIsModalOpen(true);
    }

    const handleEdit= (id) => {
        setOpen(true);
        const data = persons.find(o => o.id === id);
        setFormData(data);
    }

    const handleDeleteOk = () => {
        axios.delete("https://localhost:7114/api/v1/Person/" + selectedId )
                .then(_ => fetchData());
        
        setIsModalOpen(false);
    }

    const columns = [
        { title: 'Id', dataIndex: 'id', key: 'id' },
        { title: 'Name', dataIndex: 'name', key: 'name'},
        { title: 'Email', dataIndex: 'email', key: 'email'},
        { title: 'Gender', dataIndex: 'gender', key: 'gender'},
        { title: 'Phone Number', dataIndex: 'phone', key: 'phone' },
        {
            title: 'Action', dataIndex: '', key: 'action',
            render: (_, person) => (
                <Space>
                    <Button onClick={() => handleEdit(person.id)}>edit</Button>
                    <Button onClick={() => handleDelete(person.id)}>delete</Button>
                    {/* <Button onClick={() => {}} icon={<Add}>address</Button> */}
                    <PlusCircleTwoTone />
                    <PlusSquareOutlined />
                </Space>
            )
        }
      ];

    return (
        <>
            <Button onClick={() => setOpen(true)} icon={<UserAddOutlined />}>
                Add
            </Button>
            <Table options dataSource={persons} columns={columns} />

            <Question isOpen={isModalOpen} title="Delete" text="Are you sure you want to delete?" 
                handleOk={handleDeleteOk} 
                handleCancel={() => setIsModalOpen(false)} />

            <Modal
                title="Add New Person"
                centered
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                width={500}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                        Save
                    </Button>
                    ]}
            >
                <Form onSubmit={savePerson}>
                    <Form.Item>
                        <Input placeholder="Enter name" name = "name" value={formData.name} onChange={handleInputChange}/>
                    </Form.Item>
                    <Form.Item>
                        <Input placeholder="Enter email" name = "email" type="email" value={formData.email} onChange={handleInputChange}/>
                    </Form.Item>
                    <Form.Item>
                        <Input placeholder="Enter phone number" name = "phone" type="Number" value={formData.phone} onChange={handleInputChange}/>
                    </Form.Item>
                    <Form.Item>
                        <Select value={formData.gender} name = "gender" onChange={handleGenderChange}>
                            <option value=""></option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default Home;