import React, {useState} from "react";
import {Button, Form, Input, Modal, Space, Table} from "antd";
import {useTypesSelector} from "../hooks/UseTypesSelector";
import {ColumnsType} from "antd/lib/table/interface";
import {TableDataRowType} from "../types/TableTypes";
import {useActions} from "../hooks/UseActions";


type LayoutType = Parameters<typeof Form>[0]['layout'];

const MyTable: React.FC = () => {
    const columns: ColumnsType<TableDataRowType> = [
        {
            title: 'Full Name',
            width: 100,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            filters: [
                {
                    text: 'Edward',
                    value: 'Edward',
                },
                {
                    text: 'Bran',
                    value: 'Bran',
                },
                {
                    text: 'Elizabet',
                    value: 'Elizabet',
                },
                {
                    text: 'Mister',
                    value: 'Mister',
                },
                {
                    text: 'Magnus',
                    value: 'Magnus',
                },
                {
                    text: 'Submenu',
                    value: 'Submenu',
                    children: [
                        {
                            text: 'Green',
                            value: 'Green',
                        },
                        {
                            text: 'Black',
                            value: 'Black',
                        },
                    ],
                },
            ],
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            onFilter: (value, record) => record.name.indexOf(value + "") === 0,
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend'],
        },
        {
            title: 'Age',
            width: 100,
            dataIndex: 'age',
            key: 'age',
            fixed: 'left',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: '1',
            width: 100,
            onFilter: (value, record) => record.address.indexOf(value + "") === 0,
        },
        {
            title: 'Action',
            key: 'action',
            width: 100,

            render: (text, record) => (
                <Space size="middle">
                    <a onClick={()=>delDate(record)}>Delete</a>
                    <a onClick={()=>{
                        setEditData(record);
                        setRow(record);
                        showModalEdit()
                    }}>Edit</a>
                </Space>
            ),
        },

    ];
    const formItemLayout = {
        labelCol: {span: 4},
        wrapperCol: {span: 14},
    }
    const emptyData:TableDataRowType={
        name: '',
        key:-1,
        age:0,
        address: '',
    }
    const [editData,setEditData]= useState<TableDataRowType>(emptyData);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isCreateRow, setIsCreateRow] = useState(false);
    const {tableRows} = useTypesSelector(state => state)
    const [dates, setDates] = useState([...tableRows.dates])
    const [row, setRow] = useState<TableDataRowType>(emptyData)
    const {newRow,delRow,editRow} = useActions()
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');

    const update=()=>{
        setDates([...tableRows.dates]);
    }

    const showModalCreate = () => {
        setRow(emptyData);
        setIsCreateRow(true);
        setIsModalVisible(true);
    };

    const delDate = (data: TableDataRowType) => {
        delRow({data});
        update()
    }

    const showModalEdit = () => {
        setIsCreateRow(false);
        setIsModalVisible(true);
    };
    const handleOkEdit = () => {
        setIsModalVisible(false);
        editRow({
            data:editData,
            newData:row
        })
        setEditData(emptyData)
        update()
    };
    const handleOkCreate = () => {
        setIsModalVisible(false);
        newRow({
            data: {
                name: row.name,
                age: row.age,
                address: row.address
            }
        })
        update()
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const onFormLayoutChange = ({layout}: { layout: LayoutType }) => {
        setFormLayout(layout);
    };
    function changeRow(value: React.ChangeEvent<HTMLInputElement>): void {
        setRow({
            ...row,
            [value.currentTarget.name]: value.currentTarget.value
        })
    }

    return (
        <div className="MyTable">
            <Button className="ButtonShowModalCreate" type="primary" onClick={showModalCreate}>Create</Button>
            <Table columns={columns} dataSource={dates} scroll={{x: 1500, y: 500}}/>
            <Modal title={isCreateRow ? "Create" : "Edit"} visible={isModalVisible}
                   onOk={isCreateRow ? handleOkCreate : handleOkEdit} onCancel={handleCancel}>
                {isCreateRow ? <Form
                        {...formItemLayout}
                        layout={formLayout}
                        form={form}
                        initialValues={{layout: formLayout}}
                        onValuesChange={onFormLayoutChange}>
                        <Form.Item label="Name">
                            <Input name="name" placeholder="Name..." defaultValue={""} value={row.name} onChange={changeRow}/>
                        </Form.Item>
                        <Form.Item label="Age">
                            <Input name="age" placeholder="Age..." defaultValue={""} value={row.age} onChange={changeRow}/>
                        </Form.Item>
                        <Form.Item label="Address">
                            <Input name="address" placeholder="Address..." defaultValue={""} value={row.address} onChange={changeRow}/>
                        </Form.Item>
                    </Form> :
                    <Form
                        {...formItemLayout}
                        layout={formLayout}
                        form={form}
                        initialValues={{layout: formLayout}}
                        onValuesChange={onFormLayoutChange}>
                        <Form.Item label="Name">
                            <Input name="name" placeholder="Name..." value={row.name}  onChange={changeRow}/>
                        </Form.Item>
                        <Form.Item label="Age">
                            <Input name="age" placeholder="Age..." value={row.age} onChange={changeRow}/>
                        </Form.Item>
                        <Form.Item label="Address">
                            <Input name="address" placeholder="Address..." value={row.address} onChange={changeRow}/>
                        </Form.Item>
                    </Form>}

            </Modal>
        </div>
    );
};
export default MyTable;