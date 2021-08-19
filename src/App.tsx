import React from 'react';

import './App.css';
import 'antd/dist/antd.css';
import { Table } from "antd";
import {ColumnsType} from "antd/lib/table/interface";

interface columnType{
  title: string,
  width: number,
  dataIndex: string,
  key: string,
  fixed: string,
}
const columns:ColumnsType<columnType> = [
  {
    title: 'Full Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Age',
    width: 100,
    dataIndex: 'age',
    key: 'age',
    fixed: 'left',
  },
  {
    title: 'Column 1',
    dataIndex: 'address',
    key: '1',
    width: 150,
  },
];


const data:any[]=[];
for (let i = 0; i < 20; i++) {
  data.push({
    key: i,
    name: `Edward. ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
function App() {
  // @ts-ignore
  return (
    <div className="App">
      <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 400 }} />,
    </div>
  );
}

export default App;
