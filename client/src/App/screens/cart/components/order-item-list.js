/** @jsx jsx */
import {jsx} from '@emotion/core'

import React from "react";
import { useOrderItemDispatch, useOrderItemState } from '../../../session/order-context'
import { withFirebase } from '../../../../firebase';
import { List, ListItem } from '@material-ui/core';
import ModuleRow from './ModuleRow';
import useCallbackStatus from '../../../utils/use-callback-status';
import modules from "./data/modules.json";
import { Spinner } from '../../../components';

function ListItemList(props) {
    const dispatch = useOrderItemDispatch();
    const getOrders = async (userId) => {
        return await (props.firebase.doGetUserOrders(userId)
        .then(snapshot => {
          console.log(snapshot.docs);
            dispatch({type: "fetch", payload: snapshot.docs})
          return snapshot.docs;
        })
        )
      }
      const { data, isPending, run} = useCallbackStatus();
      React.useEffect(() => {
        run(getOrders(props.firebase.auth.currentUser.uid))
      },[]);
  const listItems = modules.slice(1,5) || data
  dispatch({type: "fetch", payload: listItems})
//   const filteredListItems = listItems.filter(filterListItems)
    if (isPending) {
        return (
        
            <div css={{width: '100%', 
                    display: 'flex', 
                    flexDirection: 'row', 
                    justifyContent: 'center'
                    }}>
            <Spinner />
            </div>
        )
        } 
  if (!listItems.length) {
    return <div css={{marginTop: '1em', fontSize: '1.2em'}}>{props.noListItems}</div>
  }
 

  return (
    <div css={{marginTop: '1em'}}>
      <List>
        {listItems.map(listItem => (
          <ListItem key={listItem.id}>
            <ModuleRow book={listItem} finished={true} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default withFirebase(ListItemList);
