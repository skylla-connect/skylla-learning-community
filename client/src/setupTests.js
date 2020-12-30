// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const docData = { data: "MOCK_DATA" };
const docResult = {
    // simulate firestore get doc.data() function
    data: () => docData
};

const get = jest.fn(() => Promise.resolve(docResult));
const set = jest.fn();
const doc = jest.fn(() => {
    return {
        set,
        get
    };
});

const firestore = () => {
    return { doc };
};

firestore.FindValue = {
    serverTimeStamp: () => {
        return "MOCK_TIME";
    }
}

export { 
    firestore 
};
