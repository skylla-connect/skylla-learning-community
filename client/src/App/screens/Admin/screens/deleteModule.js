import React from 'react';
import MaterialTable from 'material-table';
import { Paper } from '@material-ui/core';
import app from 'firebase/app';
import { withFirebase } from "../../../../App/firebase";
import 'firebase/firestore';
import { compose } from 'recompose';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
  
class DeleteUsers extends React.Component {
    constructor(props) {
        super(props);
        this.db = app.firestore();
        this.state = {
            columns: [
                {
                    title: 'Module Name', field: 'module',
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
                    title: 'Description',
                    field: 'description', 
                    type: 'string' 
                },
        
                { 
                    title: 'Trainer',
                    field: 'trainer', 
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
        this.db.collection("modules")
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
        this.db.collection("modules")
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
                    {mod.module}
                </Typography>
                <Typography variant="body1" paragraph>
                    {mod.trainer}
                </Typography>
            </div>
          ))


        return (
        <div style={{
            width: '80%',
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
                this.state.users &&  <Snackbar 
                    open={this.state.open} 
                    autoHideDuration={6000} 
                    onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="success">
                        You have deleted the user's account successfully!
                    </Alert>
                </Snackbar>
            }
        </div>
        )
    }
}

export default compose(
    withFirebase,
)(DeleteUsers)
  