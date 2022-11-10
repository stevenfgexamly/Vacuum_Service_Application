import React from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';

function UnauthorizedPage() {
    return (
        <>
            <Card className="bg-dark text-white">
                <CardHeader><h1>UNAUTHORIZED</h1></CardHeader>
            </Card>
        </>
    );
}

export default UnauthorizedPage;