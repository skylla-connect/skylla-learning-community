import React from 'react';
import { mount, configure } from 'enzyme';
import { MemoryRouter } from 'react-router';
import LandingPage  from './App/screens/login/index';
import App from './unauthenticated-app';
import Adapter from 'enzyme-adapter-react-16';
import * as ROUTES from "./App/config/routes";

configure({ adapter: new Adapter() });

jest.mock('firebase/app');

test('invalid path should redirect to sign in', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ ROUTES.SIGN_IN ]}>
      <App/>
    </MemoryRouter>
  );
  expect(wrapper.find(LandingPage)).toHaveLength(1);
});