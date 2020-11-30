import React, { Component } from 'react';
import { Centered } from '../../../components';
import app from 'firebase/app';
import { withFirebase } from "../../../../App/firebase";
import 'firebase/firestore';
import { compose } from 'recompose';
import {
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@material-ui/core'

const DeleteModules = () => (
    <div style={{
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'left !important'
    }}>
        <div style={{
            width: '100%',
            position: 'relative',
            Height: '100vh',
           }}>
            <Centered>
                <div>
                    <h5
                    style={{
                        fontSize: '16px',
                        textTransform: 'capitalize',
                        color: '#000000',
                        paddingBottom: '30px',
                    }}>Delete module (s)</h5>
                    <ModulesFetched />
                </div>
            </Centered>
        </div>
    </div>
);


class Modules {
    constructor (module, description, content ) {
        this.module = module;
        this.description = description;
        this.content = content;
    }
    toString() {
        return this.module + ', ' + this.description + ', ' + this.content;
    }
}

// Firestore data converter
var ModuleConverter = {
    toFirestore: function(mod) {
        return {
            module: mod.module,
            state: mod.description,
            content: mod.content
            }
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new Modules(data.module, data.description, data.content)
    }
}

class ModulesFetched extends Component {
    constructor(props) {
        super(props);
        this.db = app.firestore();
        this.state = {mydata: ''}
    }

    componentDidMount(){
        let data = [];

        this.db.collection("users/admin/dashboard/module/modules")
        .withConverter(ModuleConverter)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach((doc,key) => {
                data.push({
                    module:doc.data().module, 
                    description: doc.data().description,
                    content:doc.data().content
                });
            });
        });

        this.setState({
            mydata: data
        })
    }


   render () {
       const { mydata } = this.state;
       console.log(mydata.map(id => id))
       
    return (
       <div>{ mydata }</div>
    );
   }
}

export default compose(
    withFirebase,
)(DeleteModules);