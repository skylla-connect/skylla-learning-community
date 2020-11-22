/** @jsx jsx */
import {jsx} from '@emotion/core'

import React from 'react';
import {FaSearch, FaTimes} from 'react-icons/fa'
import {useAsync} from 'react-async';
import { Spinner } from "../../components";
import ModuleRow from "./components/ModuleRow";
import * as booksClient from '../../utils/modules-client'

//MUI stuff
import  makeStyles  from '@material-ui/core/styles/makeStyles';
import Tooltip from "@material-ui/core/Tooltip";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { withFirebase } from '../../../firebase';
import useCallbackStatus from '../../utils/use-callback-status';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    grid: {
      width: '90%', 
      margin: 'auto',
      [theme.breakpoints.down('sm')]: {
          width: '100%'
      }
    }
  }));
// function initialSearch() {
//     return booksClient.search('');
//   }
const Discover = (props) => {
  const getModules = () => {
    return (props.firebase.doGetModules()
    .then(result => {
      if(result.exists){
        return result.data();
      } else {
        return [];
      }
    })
    )
  }
  function search(query) {
    return props.firebase.doSearch(query);;
  }
    const classes = useStyles();
    const [query, setQuery] = React.useState('');
    const [hasSearched, setHasSearched] = React.useState();
    console.log(getModules());
    const {isPending, isRejected, isResolved, error, run} = useCallbackStatus()
    run(getModules())
      // const {books} = data || {books: []}
    
    function handleInputChange(e) {
        setQuery(e.target.value)
    }

    function handleSearchClick(e) {
        e.preventDefault()
        setHasSearched(true)
        // run(query)
    }
    return ( 
        <div className={classes.root}>
            {/* <div>
        <form onSubmit={handleSearchClick}>
          <input
            onChange={handleInputChange}
            placeholder="Search books..."
            id="search"
            css={{width: '100%'}}
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
      </div> */}
      {/* <div>
        {hasSearched ? null : (
            <div css={{marginTop: 20, fontSize: '1.2em', textAlign: 'center'}}>
                <p>Welcome to the discover page.</p>
                <p>Here, let me load a few books for you...</p>
                {isPending ? (
                <div css={{width: '100%', margin: 'auto'}}>
                    <Spinner />
                </div>
                ) : isResolved && books.length ? (
                <p>Here you go! Find more books with the search bar above.</p>
                ) : isResolved && !books.length ? (
                <p>
                    Hmmm... I couldn't find any books to suggest for you. Sorry.
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
              <p>Hmmm... can't find any books</p>
              <p>Here, let me load a few books for you...</p>
              {isPending ? (
                <div css={{width: '100%', margin: 'auto'}}>
                  <Spinner />
                </div>
              ) : (
                <p>
                  Hmmm... I couldn't find any books with the query "{query}."
                  Please try another.
                </p>
              )}
            </div>
          ) : null
        ) : null}
      </div> */}
        </div>
        
     );
}
 
export default withFirebase(Discover);

