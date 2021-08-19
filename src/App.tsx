import React from 'react';

import './App.css';
import 'antd/dist/antd.css';
import { Table } from "antd";
import {ColumnsType} from "antd/lib/table/interface";

interface columnType{
  key: number,
  name: string,
  age: number,
  address: string,
}
const columns:ColumnsType<columnType> = [
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
    onFilter: (value, record) => record.name.indexOf(value+"") === 0,
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
    onFilter: (value, record) => record.address.indexOf(value+"") === 0,
  },
];

const firstName = ['Edward','Bran','Elizabet','Mister','Magnus']
const lastName = ['Bowie','Kiss','Dow','Me','Li']
const fi:string[]=[]
for (let i = 0; i < firstName.length; i++) {
  for(let j=0; j<lastName.length; j++)
    fi.push(firstName[i]+" "+lastName[j])
}
const data:any[]=[]
for (let i = 0; i < fi.length; i++) {
  data.push({
    key: i,
    name: `${fi[i]}`,
    age: 20+i,
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
