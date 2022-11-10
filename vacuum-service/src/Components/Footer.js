import React, { Component } from 'react';

import {Navbar} from 'react-bootstrap';
class Footer extends Component {
    render() {
        return (
           <>
           <Navbar fixed="bottom" bg="dark" variant="dark" className='text-white'>
           SFG Company
           </Navbar>
           
           </>
        );
    }
}

export default Footer;