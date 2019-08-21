import React, { Component } from "react";

// Function that returns a component class
// importComponent function will use the a. "dynamic import syntax" and then b. gives a promise where we get the component we want to load and then c. render the component
// importComponent fucction's argument is a function which will 'eventually' return the import('define path to the component we want to load lazily') statement as a function.
const asyncComponent = importComponent => {
  return class extends Component {
    state = {
      component: null
    };

    // Set the state.component to the dynamically loaded component
    componentDidMount() {
      // Important - Execute importComponent() to get for example '"./NewPost/NewPost"
      // and that will return a promise
      importComponent().then(cmp => {
        this.setState({
          component: cmp.default // cmp will have one property called 'default' which is the component we will load dynamically
        });
      });
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  };
};

export default asyncComponent;
