import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

jest.mock('react-dom', () => ({
    render: jest.fn()
}));

it('should render without crashing', () => {
    const div = document.getElementById('div');
    ReactDOM.render(<App />, div);
    global.document.getElementById = (id) => id === 'root' && div;
    expect(ReactDOM.render).toHaveBeenCalledWith(<App />, div);
})