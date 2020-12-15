import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { Paper } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import MaterialTable from 'material-table';
import app from 'firebase/app';
import Typography from '@material-ui/core/Typography';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
  
class ManageHiredTrainees extends React.Component {
    constructor(props) {
        super(props);
        this.db = app.firestore();
        this.state = {
            columns: [
                {
                    title: 'Full Name', field: 'Fullname',
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
                    title: 'Email',
                    field: 'EmailAddress', 
                    type: 'string' 
                },
        
                { 
                    title: 'Contact',
                    field: 'Contact', 
                    type: 'string' 
                },
                { 
                    title: 'Gender',
                    field: 'Gender', 
                    type: 'string' 
                },
                { 
                  title: 'Id Number',
                  field: 'Id_Number', 
                  type: 'string' 
              },
              { 
                title: 'Physical Address',
                field: 'Physical_Address', 
                type: 'string' 
            },
    
            ],
  
            data: [],
            modules: [],
            key:'',
            error: null,
            open: false,
        }
    }
  
    // handle click a way 
    handleClick = () => {
        this.setState({open: true});
    };
    
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({open: false});
    };
  
    deleteUserDetails(modId){
        this.db.collection("users/admin/dashboard/hired_trainees/hired")
            .get()
            .then(querySnapshot => {
            try {
                let module = querySnapshot.docs;
                module.map(doc => doc.ref.delete().where("uid", "==", modId).limit(1))
                this.setState({
                    modules: module
                });
                // console.log(module)
            } catch(error) {
                this.setState({error});
            }
        });
  
        this.handleClick()
    }
  
    componentDidMount() {
        this.db.collection("users/admin/dashboard/hired_trainees/hired")
            .onSnapshot(querySnapshot => {
            const module = querySnapshot.docs.map(doc => doc.data());
            this.setState({ modules: module });
        });
            
    }
  
  
    render () {
        let { modules } = this.state;
        modules.map(mod => (
            <div key={mod.uid}>
                <Typography variant="body1" paragraph>
                    {mod.Contact}
                </Typography>
                <Typography variant="body1" paragraph>
                    {mod.trainer}
                </Typography>
            </div>
          ))
  
  
        return (
        <div style={{
            width: '100%',
            margin: '70px auto',
        }}>
            <MaterialTable
                title="Modules Created"
                columns={this.state.columns}
                style={{
                    backgroundColor: 'transparent',
                    borderStyle: 'none',
                }}
  
                // overriding the container
                components={{
                    Container: props => <Paper {...props} elevation={0}/>
                }}
  
                data={this.state.modules}
  
                editable={{
                     // Delete rows
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataDelete = [...this.state.data];
                            const index = oldData.tableData.id;
                            dataDelete.splice(index, 1);
                            this.setState([...dataDelete]);
                            this.deleteUserDetails(oldData);
                            resolve();
                        }, 1000)
                    }),
                }}
  
                options={{
                    exportButton: true,
                    actionsColumnIndex: -1,
                    rowStyle: {
                        backgroundColor: '#EEE',
                    },
                    exportCsv: (columns, data) => {
                      alert('Data exported successfully !' + data.length + ' rows');
                    }
                }}
            />
  
            {
                this.state.users &&  <Snackbar s
                    open={this.state.open} 
                    autoHideDuration={6000} 
                    onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="success">
                        You have deleted module successfully!
                    </Alert>
                </Snackbar>
            }
        </div>
        )
    }
}

export default ManageHiredTrainees;