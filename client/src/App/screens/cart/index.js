/** @jsx jsx */
import {jsx} from '@emotion/core'

import styled from '@emotion/styled'
import React from "react";

import * as colors from "../../styles/colors";
import Checkout from '../checkout/index';
import Store from "../../session/checkout-context";

import { Link, Router } from "@reach/router";
import Discover from "./discover";
import * as mq from '../../styles/media-queries';
import Navbar from '../components/navbar-checkout';
import YourModules from './imodules';
import OrderProvider from '../../session/order-context';
import Product from '../productDetails';

function CartApp({match}) {
    return (
      <div>
        <Navbar />
      <div  css={{
        margin: '0 auto',
        padding: '2em 0',
        maxWidth: '840px',
        width: '100%',
        display: 'grid',
        gridGap: '1em',
        gridTemplateColumns: '3fr 9fr',
        [mq.small]: {
          gridTemplateColumns: '1fr',
          gridTemplateRows: 'auto',
          width: '100%',
          padding: '2em 1em',
        },
      }} 
      >
        <div>
          <Navigation match={match} />
        </div>
        <main css={{width: '100%'}}>
          <Store>
            <OrderProvider>
              <Router>
                  <Discover path={`${match.path}/discover`} />
                  <YourModules path={`${match.path}/finished`} />
                  <Product path={`${match.path}/module/:moduleId`} />
                  <Checkout path={`${match.path}/checkout/:module`}/>
              </Router>
            </OrderProvider>
          </Store>
        </main>
        <footer />
      </div>
      </div>
    )
  }
  
export default CartApp;

const NavLink = styled(Link)({
    display: 'block',
    padding: '8px 15px 8px 10px',
    margin: '5px 0',
    width: '100%',
    height: '100%',
    color: colors.text,
    borderRadius: '2px',
    borderLeft: '5px solid transparent',
    ':hover': {
      color: colors.indigo,
      textDecoration: 'none',
      background: colors.gray10,
    },
  })
  
  function Navigation(params) {
    const {match} = params;
    return (
      <nav
        css={{
          position: 'sticky',
          top: '2em',
          padding: '3em 1.5em',
          border: `1px solid ${colors.gray10}`,
          borderRadius: '3px',
          [mq.small]: {
            padding: '0.5em 1em',
            position: 'static',
          },
        }}
      >
        <ul
          css={{
            listStyle: 'none',
            padding: '0',
            fontSize: "1.0em",
            '& [aria-current="page"]': {
              borderLeft: `5px solid ${colors.indigo}`,
              background: colors.gray10,
              ':hover': {
                background: colors.gray10,
              },
            },
          }}
        >
          <li>
            <NavLink to={`${match.url}/finished`}>Your Modules</NavLink>
          </li>
          <li>
            <NavLink to={`${match.url}/discover`}>Discover</NavLink>
          </li>
        </ul>
      </nav>
    )
  }