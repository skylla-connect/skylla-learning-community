/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from '@emotion/core'

import React from 'react';
import {FaSearch, FaTimes} from 'react-icons/fa'
import { Spinner } from "../../components";
import ModuleRow from "./components/ModuleRow";
import FirebaseContext from 'firebase';
// import modules from "./components/data/modules.json";

//MUI stuff
import  makeStyles  from '@material-ui/core/styles/makeStyles';
import Tooltip from '@reach/tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { withFirebase } from '../../firebase';
import useCallbackStatus from '../../utils/use-callback-status';
import { useOrderItemState } from '../../session/order-context';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      fontFamily: "Helvetica",
    },
    grid: {
      width: '90%', 
      margin: 'auto',
      [theme.breakpoints.down('sm')]: {
          width: '100%'
      }
    }
  }));

const Discover = (props) => {
  const [art , setArt] = React.useState([]);

  const getModules = async () => {
    const db = FirebaseContext.firestore()
   db.collection('/modules')
  .get()
  .then(snap =>{
    const data = [] 
    snap.docs.map(doc => {
      data.push(doc.data()) })
      setArt(data);
    return data;
  })
  }
  async function search(query) {
    return await (props.firebase.doSearch(query)
    .then(snapshot => {
      const data = [] 
      snapshot.docs.map(doc => {
        data.push(doc.data()) })
      return data;
    })
    );
  }
    const classes = useStyles();
    const [query, setQuery] = React.useState('');
    const [hasSearched, setHasSearched] = React.useState();
    console.log(getModules());
    const { data, status, isPending, isRejected, isResolved, error, run} = useCallbackStatus()
    React.useEffect(() => {
      run(getModules())
    },[]);
    console.log(isPending);
    console.log(isRejected);
    console.log(isResolved);
    console.log(status);
    console.log(error);
    console.log(data);
      let books = art;
      const orders = useOrderItemState()
      console.log(orders);
      console.log(books);
      books = books.filter(li => !orders.find(item => item.modId === li.id));
      console.log(books);
    
    function handleInputChange(e) {
        setQuery(e.target.value)
    }

    function handleSearchClick(e) {
        e.preventDefault()
        setHasSearched(true)
        run(search(query))
    }
    return ( 
        <div className={classes.root}>
            <div>
        <form onSubmit={handleSearchClick}>
          <input
            onChange={handleInputChange}
            placeholder="Search modules..."
            id="search"
            css={{
              width: '100%',
              padding: '10px'
            }}
          />
          <Tooltip label="Search Books">
            <label htmlFor="search">
              <button
                type="submit"
                css={{
                  border: '0',
                  position: 'relative',
                  marginLeft: '-35px',
                  background: 'transparent',
                }}
              >
                {isPending ? (
                  <Spinner />
                ) : isRejected ? (
                  <FaTimes aria-label="error" css={{color: 'red'}} />
                ) : (
                  <FaSearch aria-label="search" />
                )}
              </button>
            </label>
          </Tooltip>
        </form>

        {isRejected ? (
          <div css={{color: 'red'}}>
            <p>There was an error:</p>
            <pre>{error.message}</pre>
          </div>
        ) : null}
      </div>
      <div>
        {hasSearched ? null : (
            <div css={{marginTop: 20, fontSize: '1.1em', textAlign: 'center'}}>
                <p>Welcome to the Module page.</p>
                <p>Select a module you want to learn ...</p>
                {isPending ? (
                <div css={{width: '100%', margin: 'auto'}}>
                    <Spinner />
                </div>
                ) : isResolved && books.length ? (
                <p>Here you go! Find more modules with the search bar above.</p>
                ) : isResolved && !books.length ? (
                <p>
                    Hmmm... I couldn't find any modules to suggest for you. Sorry.
                </p>
                ) : null}
            </div>
            )}
             {isResolved ? (
          books.length ? (
            <List css={{marginTop: 20}}>
              {books.map(book => (
                <ListItem key={book.id}>
                  <ModuleRow key={book.id} book={book} />
                </ListItem>
              ))}
            </List>
          ) : hasSearched ? (
            <div css={{marginTop: 20, fontSize: '1.2em', textAlign: 'center'}}>
              <p>Hmmm... can't find any module</p>
              <p>let me load a modules for you...</p>
              {isPending ? (
                <div css={{width: '100%', margin: 'auto'}}>
                  <Spinner />
                </div>
              ) : (
                <p>
                  Hmmm... I couldn't find any module with the query "{query}."
                  Please try another.
                </p>
              )}
            </div>
          ) : null
        ) : null}
      </div>
        </div>
        
     );
}
 
export default withFirebase(Discover);

