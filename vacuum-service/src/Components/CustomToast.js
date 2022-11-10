import React, { Component } from 'react';

import {Toast} from 'react-bootstrap';

class CustomToast extends Component {
    render() {
        const toastCSS ={
            position : 'fixed',
            top:'20px',
            right:'20px'
        }
        return (
            <div style={{zIndex : 1}}>
            <div style={ this.props.show?toastCSS : null}>
            <Toast className={`border text-white ${this.props.type === "success"
                    ? "border-success bg-success" : "border-danger bg-danger"}`}>
                <Toast.Header  closeButton={false} show={this.props.show}>
                    <strong style={{'color':'black'}}>{this.props.type === "success"
                    ? "Success" : this.props.type === "danger" ?"Deletion" : "Error" }</strong>
                </Toast.Header>
                <Toast.Body>
                    {this.props.message}
                </Toast.Body>
            </Toast>
            </div>
            </div>
        );
    }
}

export default CustomToast;