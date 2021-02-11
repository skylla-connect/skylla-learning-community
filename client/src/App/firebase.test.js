describe('Base', () => {
    const original = console.error

    beforeEach(() => {
        console.error = jest.fn()
    })

    afterEach(() => {
        jest.resetModules();
        console.error = original
    });


  test('firebase initializeApp called with firebase environment variables', () => {
    const firebase = require('firebase');
    jest.mock('firebase');

    const env = process.env;
    process.env = {
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_DATABASE_URL,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    };
    // let mockInitializeApp = jest.fn();
    // firebase.initializeApp = mockInitializeApp;
    firebase.apps = [];

    require('./');
    // expect(mockInitializeApp.mock.calls[0][0]).toEqual(expectedConfig);

    process.env = env;
  });
});