import React , {Component } from 'react';
import { Controlled as CodeMirror} from 'react-codemirror2';
import Pusher from 'pusher-js';
import pushid from 'pushid';
import axios from 'axios' ;
import './Editor.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import app from 'firebase/app'
import Button from '@material-ui/core/Button';
import FirebaseContext from 'firebase'

class Editor extends Component{
  constructor(){
    super();
      this.state = {
        id:'',
        html:'',
        css:'',
        js:'',
        counter:0
      };
      this.pusher = new Pusher('d855047d1bed3308cabe',{
        cluster:'eu',
        forceTLS: true
      });
      this.channel = this.pusher.subscribe('editor');
      this.db = app.firestore()
      this.AuthUser = FirebaseContext.auth().currentUser
      
  }

  handleFirebase = (e) =>{
    e.preventDefault()
    this.db.collection("users/trainer/dashboard/solutions/solutions").add({
      html:this.state.html,
      css:this.state.css,
      js:this.state.js,
      user:this.AuthUser.displayName,
      counter:this.state.counter + 1,
    })
  }
  componentDidUpdate(){
    this.runCode();
  }
  componentDidMount(){
    this.setState({
      id:pushid(),
    });
    this.channel.bind('code-update',data =>{
      const {id} = this.state;
      if(data.id === id) return ;
      
      this.setState({
        html : data.html,
        css : data.css,
        js: data.js,
        
      });
      
    });
  }
  syncUpdates = () => {
    const data = {...this.state};

    axios
    .post('http://localhost:5000/update-editor',data)
    .catch(console.error)
  };
  runCode = () =>{
    const {html , css , js} = this.state;

    const iframe = this.refs.iframe;
    const document = iframe.contentDocument;
    const documentContents = `
    <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
            <style>
              ${css}
            </style>
          </head>
          <body>
            ${html}

            <script type="text/javascript">
              ${js}
            </script>
          </body>
          </html>
    `;
    document.open();
    document.write(documentContents);
    document.close();
  };
 
  render(){
    const {html , js ,css} = this.state;
    const codeMirrorOptions = {
      theme : 'material',
      lineNumbers : true ,
      scrollbarStyle : null,
      lineWrapping : true,
    };
    
    return(
      <div >
        <form onSubmit={this.handleFirebase}>
          <div className='App'>
            <section className='playground'>
          
              <div className='code-editor html-code'>
              
                <div className='editor-header'>HTML</div>
                <CodeMirror
                  value={html}
                  options={{
                    mode:'htmlmixed',
                    ...codeMirrorOptions,
                  }}
                  onBeforeChange={(editor , data , html) => {
                    this.setState({html}, () => this.syncUpdates());
                  }}
                />

              </div>
              <div className='code-editor css-code'>
                <div className='editor-header'>CSS</div>
                <CodeMirror
                value={css}
                options={{
                  mode: 'css',
                  ...codeMirrorOptions,
                }}
                onBeforeChange={(editor , data , css) => {
                  this.setState({css}, () => this.syncUpdates());
                }}
              />
              </div>
              <div className='code-editor js-code'>
                <div className='editor-header'>Javascript</div>
                <CodeMirror
                  value ={js}
                  options={{
                    mode: 'javascript',
                    ...codeMirrorOptions,
                  }}
                  onBeforeChange={(editor , data , js) => {
                    this.setState({js}, () => this.syncUpdates());
                  }}
                />
              </div>

          </section>

          <section className='result'>
            <iframe title='result' className='iframe' ref='iframe' />

          </section>
          </div>
          
          <Button variant='contained' color='primary' type='submit' style={{margin:'25px' , width:'15%'}} className='button'> Submit Code</Button>
          
        </form>
      </div>
    )
  }

}
export default Editor;