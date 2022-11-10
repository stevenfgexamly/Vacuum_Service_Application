import React, { Component } from 'react';

import {Toast} from 'react-bootstrap';

class ToastError extends Component {
    render() {
        const toastCSS ={
            position : 'fixed',
            top:'20px',
            right:'20px'
        }
        return (
            <div style={ this.props.children.show?toastCSS : null}>
            <Toast>
                <Toast.Header className={"bg-error"}closeButton={false} show={this.props.children.show}>
                    <strong>Error</strong>
                </Toast.Header>
                <Toast.Body>
                    {this.props.children.message}
                </Toast.Body>
            </Toast>
            </div>
        );
    }
}

export default ToastError;