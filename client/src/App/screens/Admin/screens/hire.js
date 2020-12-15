import React, { Component, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import { Paper } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import app from 'firebase/app';
import MaterialTable from 'material-table'


const INITIAL_STATE = {
  email: '',
  fullname: '',
  number:'',
  address:'',
  id:'',
  gender:'',
  error: null,
};

class Hired extends Component {

  useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(0),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '50%', // Fix IE 11 issue.
      marginTop: theme.spacing(10),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  

  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.db = app.firestore()
  }

  onSubmit = event => {
    const { email, address ,fullname ,number , id ,gender } = this.state;
    event.preventDefault();

    app.firestore().settings({
        timestampsInSnapshots: true
    });
    this.db.collection(`users/admin/dashboard/hired_trainees/hired`).add({
        Fullname : fullname,
        EmailAddress : email,
        Contact : number,
        Id_Number : id ,
        Physical_Address : address,
        Gender : gender
    }).then(function DocId(docRef) {
        let x = docRef.id;
        return docRef.id;
    })

    .catch(error => {
        this.setState({error : error});
    });
    this.setState({
        ...INITIAL_STATE
    })
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    
  };

  render() {
    const { email, fullname, number , address ,id ,gender, error } = this.state;

    const isInvalid = 
        fullname === '' || 
        email === '' ||
        number === '' ||
        address === '' ||
        id === '' ||
        gender === '';

    return (
     <div>
          <Container component="main" maxWidth="md">
       <div >
    < CssBaseline />
    <div style={{
      marginTop: '9.9em',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
    <Typography component="h1" variant="h5">
      Hire Developers
    </Typography>
    </div>
    <form onSubmit={this.onSubmit} style={{
          width: '80%', // Fix IE 11 issue.
          margin:'20px auto auto auto',
        }}>
            <TextField
            variant='outlined'
            placeholder='Enter Full Name'
            name='fullname'
            value={fullname}
            style={{margin:'40px 0 20px 0'}}
            fullWidth
            autoFocus
            onChange={this.onChange}
          />
            <div style={{display:'flex'}}>
            <TextField
            variant='outlined'
            placeholder='Enter Phone Number'
            name='number'
            value={number}
            style={{margin:'0 0 20px 0'}}
            fullWidth
            autoFocus
            onChange={this.onChange}
          />
            <TextField
            variant='outlined'
            placeholder='Enter Email Address'
            fullWidth
            autoFocus
            style={{margin:'0 0 0 10px'}}
            name="email"
            type="email"
            value={email}
            onChange={this.onChange}
          />
            </div>
           <div style={{display:'flex'}}>
           <TextField
            variant='outlined'
            placeholder='Enter Physical Address'
            fullWidth
            name='address'
            value={address}
            style={{margin:'0 0 20px 0'}}
            autoFocus
            onChange={this.onChange}
          />
           </div>
          <div style={{display:'flex'}}>
          <TextField
            variant='outlined'
            placeholder='Enter Gender'
            name='gender'
            value={gender}
            style={{margin:'0 0 20px 0'}}
            fullWidth
            autoFocus
            onChange={this.onChange}
          />
           <TextField
            variant='outlined'
            name='id'
            value={id}
            placeholder='Enter I.D Number'
            style={{margin:'0 0 0 10px'}}
            fullWidth
            autoFocus
            onChange={this.onChange}
          />
          </div>

        <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isInvalid}
            color="primary"
            style={{
              margin:'3px, 0, 0,  2px',
            }}
          >
            Hire
          </Button>

        {error && <p>{error.message}</p>}
      </form>
      </div>
      </Container>
           <div style={{margin:'40px 0 0 0'}}>
           <DeleteUsers />
           </div>
     </div>
    );
  }
}

export default Hired;


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