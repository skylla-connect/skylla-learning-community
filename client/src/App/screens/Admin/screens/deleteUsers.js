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
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

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
                    title: 'Photo',
                    field: 'imageUrl', 
                    // minWidth: 100,
                    // maxWidth: 150,
                    render: (row) => (
                        <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            // height: '80px'
                        }}
                        >
                            <ListItemAvatar>
                                <Avatar 
                                    alt="" 
                                    src={row.photo}
                                />
                            </ListItemAvatar>
                        </div>
                    ) 
                },

                {
                    title: 'Full Name', field: 'name',
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
                    field: 'email', 
                    type: 'string' 
                },
    
            ],

            data: [],
            users: [],
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

    deleteUserDetails(userId){
        this.db.collection("users/trainer/sys_trainers")
            .get()
            .then(querySnapshot => {
            try {
                let user = querySnapshot.docs;
                user.map(doc => doc.ref.delete().where("uid", "==", userId).limit(1))
                this.setState({
                    users: user
                });
            } catch(error) {
                this.setState({error});
            }
        });

        this.handleClick()
    }

    componentDidMount() {
        this.db.collection("users/trainer/sys_trainers")
            .onSnapshot(querySnapshot => {
            const user = querySnapshot.docs.map(doc => doc.data());
            this.setState({ users: user });
        });
            
    }


    render () {
        let { users } = this.state;
        users.map(user => (
            <div key={user.uid}>
                <Typography variant="body1" paragraph>
                    {user.displayName}
                </Typography>
                <Typography variant="body1" paragraph>
                    {user.email}
                </Typography>
            </div>
          ))


        return (
        <div style={{
            width: '90%',
            margin: '70px auto',
        }}>
            <Typography variant="h6" paragraph>
                Delete Trainer's Accounts
            </Typography>

            <MaterialTable
                title=""
                columns={this.state.columns}
                style={{
                    backgroundColor: 'transparent',
                    borderStyle: 'none',
                }}

                // overriding the container
                components={{
                    Container: props => <Paper {...props} elevation={0}/>
                }}

                data={this.state.users}

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
  