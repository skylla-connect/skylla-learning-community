import React from 'react';

const withAuthorization = () => Component => {
class WithAuthorization extends React.Component {
    render() {
        return <Component {...this.props} />;
        }
    }
    return WithAuthorization;
};
export default withAuthorization;