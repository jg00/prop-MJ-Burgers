import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux/Aux";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    constructor() {
      super();
      // HTTP request reset error
      axios.interceptors.request.use(req => {
        this.setState({
          error: null
        });
        return req;
      });

      // HTTP error response
      axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;

// Reference only as to why we placed below into constructor().
// Note: this componentDidMount() will be called only
// after componentDidMount() was called in the child components
// like <WrappedComponent {..this.props}.

// Since we reach out to the web in <WrappedComponent {..}, we never
// get to set up our axios.interceptors here.  We need to set these
// 'before' the child components are rendered.

// Fix is to place this in constructor() like above.

/*
    componentDidMount() {
      // HTTP request reset error
      axios.interceptors.request.use(req => {
        this.setState({
          error: null
        });
        return req;
      });

      // HTTP error response
      axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );
    }
  */
