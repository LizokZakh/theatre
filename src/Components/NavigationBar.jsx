import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button, Modal, Form } from 'react-bootstrap';
import logo from '../img/logo.png';
import { Link } from'react-router-dom'
import {useNavigate} from 'react-router'
import axios from 'axios'
import UserDropdown from './UserDropdown';
import UserInit from '../User';

export default function NavigationBar() {
    const navigate = useNavigate();
    
    const { user, setUser } = UserInit();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [showR, setShowR] = useState(false);
    const handleCloseR = () => setShowR(false);
    const handleShowR = () => setShowR(true);

    const registrate = () => {
        let email = document.getElementById('formBasicEmailR').value;
        let surname = document.getElementById('formBasicSurname').value;
        let name = document.getElementById('formBasicName').value;
        let password = document.getElementById('formBasicPasswordR').value;
        // let check = document.getElementById('formBasicCheckBoxR').checked;
        console.log(email, password, surname, name);
        addUsers(email, password, surname, name);
    }

    const enter = () => {
        let email = document.getElementById('formBasicEmail').value;
        let password = document.getElementById('formBasicPassword').value;
        axios
            .get('http://localhost:3001/user', {
                params: {
                    email: email,
                    password: password,
                }
            })
            .then((response) => {
                let value = response.data;
                if (!value?.result) {
                    setUser(value);
                    setShow(false);
                }
                console.log(value);
            });
    }

    const addUsers = (email, password, surname, name) => {
        axios
            .post('http://localhost:3001/addUser', {
                email: email,
                password: password,
                surname: surname,
                name: name
            })
            .then((response) => {
                setShowR(false);
                console.log('user created');
            });
    }

    const submitSearch = (event) => {
        event.preventDefault();
        let value = event.target[0].value;
        event.target[0].value = "";
        console.log(value);
        const URL = `/about/${value}`;
        navigate(URL);
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>
                        <Nav.Link><Link to='/'>
                            <img
                                src={logo}
                                height="30"
                                width="30"
                                className="d-inline-block align-top"
                                alt="Logo"
                            />
                        </Link></Nav.Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link><Link to='/'>Главная</Link></Nav.Link>
                            <Nav.Link><Link to='/about'>Афиша</Link></Nav.Link>
                        </Nav>

                        <Nav>
                            <Form onSubmit={submitSearch}>
                                <Form.Group>
                                    <Form.Control type="text"
                                        placeholder="Поиск"
                                    />
                                </Form.Group>
                            </Form>
                        </Nav>

                        <Nav>
                            {(user) ? <UserDropdown user={user} setUser={setUser} /> : <>
                                <Button variant="primary" className="mr-2" onClick={handleShow}>Войти</Button>
                                <Button variant="primary" onClick={handleShowR}>Зарегестрироваться</Button>
                            </>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Вход</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Почта</Form.Label>
                            <Form.Control type="email" placeholder="Введите почту"></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password" placeholder="Введите пароль"></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicCheckBox">
                            <Form.Check type="checkbox" label="Запомните меня"></Form.Check>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={enter}>Войти</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showR} onHide={handleCloseR}>
                <Modal.Header closeButton>
                    <Modal.Title>Регистрация</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicSurname">
                            <Form.Label>Фамилия</Form.Label>
                            <Form.Control placeholder="Введите фамилию"></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicName">
                            <Form.Label>Имя</Form.Label>
                            <Form.Control placeholder="Введите имя"></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmailR">
                            <Form.Label>Почта</Form.Label>
                            <Form.Control type="email" placeholder="Введите почту"></Form.Control>
                            <Form.Text id='login' className='text-muted'>Ваша почта находится в безопасности</Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPasswordR">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password" placeholder="Введите пароль"></Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={registrate}>Зарегестрироваться</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
