import React from 'react';
import app from 'firebase/app';
import Card from '@material-ui/core/Card'
import 'firebase/firestore'

class Submissions extends React.Component{
    constructor(){
        super();
        this.state ={
            loading: false,
            users:[]
        };
        this.db = app.firestore()
    }
   
    componentDidMount() {
        this.setState({ loading: true });
        this.db.collection(`users/trainer/dashboard/solutions/solutions`)
        .get()
        .then(querySnapshot =>{
            const data = querySnapshot.docs.map(doc=> doc.data());
            console.log(data)
            this.setState({users:data})
        })
      }
    render(){

        const {users } = this.state;
        return(
            <div>
                {users.map(user =>(
                    <div key={user.id}>
                        <Card elevation={3}>
                            <h4>Html</h4>
                            {user.html}
                            
                            <h4>Css</h4>
                            {user.css}
                            
                            <h4>JavaScript</h4>
                            {user.js}

                        </Card>

                    </div>
                ))}
    
            </div>
        );

    }
   
}
export default Submissions;