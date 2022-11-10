import React from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';

function Page404() {
    return (
        <>
            <Card className="bg-dark text-white">
                <CardHeader><h1>404 PAGE NOT FOUND</h1></CardHeader>
            </Card>
        </>
    );
}

export default Page404;