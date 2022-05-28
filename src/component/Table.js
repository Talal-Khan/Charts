import React, { Component } from 'react'
import {Col, Row, Container} from 'react-bootstrap'

export default class Table extends Component {
    render() {
        return (
            <div>
              <Container>
                <Row>
                    <Col>1 of 2</Col>
                    <Col>2 of 2</Col>
                </Row>
                <Row>
                    <Col>1 of 3</Col>
                    <Col>2 of 3</Col>
                    <Col>3 of 3</Col>
                </Row>
                </Container>
            </div>
        )
    }
}
