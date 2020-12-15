import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import app from 'firebase/app';

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

  handleChangedHandler = event => {
      this.setState({ 
        [event.target.name]: event.target.value 
    });
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
          <div>

          <CssBaseline />

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
                onChange={this.handleChangedHandler}
              />

              <div style={{display:'flex'}}>
                <TextField
                  variant='outlined'
                  placeholder='Enter Phone Number'
                  name='number'
                  value={number}
                  style={{margin:'0 0 20px 0'}}
                  fullWidth
                  onChange={this.handleChangedHandler}
                />

                <TextField
                  variant='outlined'
                  placeholder='Enter Email Address'
                  fullWidth
                  style={{margin:'0 0 0 10px'}}
                  name="email"
                  type="email"
                  value={email}
                  onChange={this.handleChangedHandler}
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
                  onChange={this.handleChangedHandler}
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
                  onChange={this.handleChangedHandler}
                />

                <TextField
                  variant='outlined'
                  name='id'
                  value={id}
                  placeholder='Enter I.D Number'
                  style={{margin:'0 0 0 10px'}}
                  fullWidth
                  onChange={this.handleChangedHandler}
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

              {
                error && <p>
                  {error.message}
                </p>
              }
            </form>

          </div>
        </Container>
      </div>
    );
  }
}

export default Hired;

