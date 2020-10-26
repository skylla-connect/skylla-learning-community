/** @jsx jsx */
import {jsx} from '@emotion/core'

import {keyframes} from '@emotion/core'
import styled from '@emotion/styled'
import {FaSpinner} from 'react-icons/fa'

const spin = keyframes({
  '0%': {transform: 'rotate(0deg)'},
  '100%': {transform: 'rotate(360deg)'},
})

export const Centered = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100vh',
})


export function Spinner(props) {
  return (
    <FaSpinner
      css={{animation: `${spin} 1s linear infinite`}}
      aria-label="loading"
      {...props}
    />
  )
}

export function FullPageSpinner() {
  return (
    <Centered>
    <div css={{
      fontSize: '4em'}}>
      <Spinner />
    </div>
    </Centered>
  )
}
// *** input //

export const FormGroup = styled.div({
    display: 'flex',
    flexDirection: 'column',
  })
