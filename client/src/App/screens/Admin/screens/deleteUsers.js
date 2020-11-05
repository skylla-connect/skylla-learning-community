import React from 'react';
import MaterialTable from 'material-table';
import { Paper } from '@material-ui/core';

export default function CustomEditComponent(props) {
    const { useState } = React;
  
    const [columns, setColumns] = useState([
        {
            title: 'First Name', field: 'name',
            editComponent: props => (
                <input
                    type="text"
                    value={props.value}
                    onChange={
                        e => props.onChange(e.target.value)
                    }
                />
            )
        },

        { 
          title: 'Surname', 
          field: 'surname' 
        },

        { 
            title: 'Email',
            field: 'email', 
            type: 'email' 
        },

        {
            title: 'Role',
            field: 'role',
            lookup: { 34: 'Trainer', 63: 'Trianee' },
        },
    ]);
  
    const [data, setData] = useState([
      { name: 'Ronnie', surname: 'Namwanza', email: 'test@gmail.com', role: 63 },
      { name: 'Skylla', surname: 'Connect', email: 'trainee@gmail.com', role: 34 },
    ]);
  
    return (
      <div style={{
          width: '95%',
          margin: '70px auto'
      }}>
        <MaterialTable
            title="Edit / Delete Trainers &amp; Trainees"
            columns={columns}
            style={{
                backgroundColor: 'transparent',
                borderStyle: 'none',
            }}

            // overriding the container
            components={{
                Container: props => <Paper {...props} elevation={0}/>
           }}

            data={data}

            editable={{
            onRowAdd: newData =>
                new Promise((resolve, reject) => {
                setTimeout(() => {
                    setData([...data, newData]);
                    
                    resolve();
                }, 1000)
            }),

            // Update row data
            onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                setTimeout(() => {
                    const dataUpdate = [...data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    setData([...dataUpdate]);
    
                    resolve();
                }, 1000)
            }),
            
            // Delete rows
            onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                setTimeout(() => {
                    const dataDelete = [...data];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setData([...dataDelete]);
    
                    resolve();
                }, 1000)
                }),
            }}

            // As an admin, I can export user data.
            options={{
                exportButton: true,
                exportCsv: (columns, data) => {
                  alert('Data exported successfully !' + data.length + ' rows');
                }
            }}
        />
      </div>
    )
}
  