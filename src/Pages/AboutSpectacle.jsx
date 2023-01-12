import React, { useState } from 'react';
import { Tabs, Tab, Container, ListGroup, Figure, Button, Modal, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import SuperSlider from '../Components/SuperSlider';
import getData from '../Data';
import axios from 'axios';

import InitUser from '../User';

const Figura = (props) =>
(<Figure style={{ marginLeft: '25px', marginRight: '25px', textAlign: 'center', verticalAlign: 'text-top', width: '200px', height: '275px' }}>
    <Figure.Image style={{ borderRadius: 100, border: '2px solid black' }} src={props.photo} />
    <p style={{ margin: 0 }}>{props.name}</p>
    <Figure.Caption>{props.roleName}</Figure.Caption>
</Figure>)

const ListGroupItem = (props) =>
(<ListGroup.Item>
    <div className="ms-2 me-auto">
        <div className="fw-bold">{props.name}</div>
        {props.value}
    </div>
</ListGroup.Item>)

const FilledListGroup = (props) => (
    <ListGroup horizontal>
        <ListGroupItem name='Жанр' value={props.data.genre} />
        <ListGroupItem name='Продолжительность' value={props.data.time} />
        <ListGroupItem name='Антракты' value={props.data.antracts == 0 ? 'Нет' : props.data.antracts} />
        <ListGroupItem name='Возраст' value={`${props.data.minAge}+`} />
    </ListGroup>
)

const buyTicket = (props) => {
    console.log(props);
    if (props.xPos && props.yPos) {

        axios.get('http://localhost:3001/ticketsInfo').then((response) => {
            console.log(response.data);
            if (response.data.filter(spectacle => spectacle.spectacleDataName == props.spectacle.dataName && 
                spectacle.x == props.xPos && spectacle.y == props.yPos ).length == 0) {
                    axios.get('http://localhost:3001/buyTicket', {
                        params: {
                            spectacleDataName: props.spectacle.dataName,
                            userEmail: props.user.email,
                            x: props.xPos,
                            y: props.yPos,
                        }
                    }).then((response) => {
                        console.log(response.data);
                        if (!response.data?.result) {
                            let data = { ...props.spectacle, count: response.data.count };
                            console.log(data);
                            props.setSpectacle(data);
                            alert('Вы приобрели билет!');
                        } else {
                            alert('Ошибка покупки билетов!');
                        }

                    });
                } else {
                    alert('Билет уже куплен! Выберите другой!');
                }
        })

    }
}


const TiketModel = ({ show, handleClose, spectacle, user, setSpectacle}) => (<Modal show={show} onHide={handleClose}user={user}>
    <Modal.Header closeButton>
        <Modal.Title>Покупка билетов</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>
            <Form.Group controlId="SeatPlace">
                <Form.Label>Место</Form.Label>
                <Form.Control placeholder="Введите место"></Form.Control>
            </Form.Group>

            <Form.Group controlId="RowPlace">
                <Form.Label>Ряд</Form.Label>
                <Form.Control placeholder="Введите ряд"></Form.Control>
            </Form.Group>
        </Form>
    </Modal.Body>
    <Modal.Footer>
        <Button onClick={() => buyTicket({setSpectacle, spectacle, user, xPos: +document.getElementById('SeatPlace').value,yPos:+document.getElementById('RowPlace').value })}>Купить</Button>
    </Modal.Footer>
</Modal>)

const Tickets = ({setSpectacle, spectacle, user}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <ListGroup horizontal>
            <ListGroupItem name='Осталось мест' value={spectacle?.count} />
            <Button onClick={handleShow}>Купить</Button>
            <TiketModel setSpectacle={setSpectacle} user={user} spectacle={spectacle} show={show} handleClose={handleClose}/>
        </ListGroup>
    )
}

export const AboutSpectacle = () => {
    let { user } = InitUser();
    const { name: spectacleName } = useParams();
    console.log(spectacleName);
    const data = getData(spectacleName);
    const [spectacle, setSpectacle] = React.useState(undefined);

    React.useEffect(() => {
        axios.get('http://localhost:3001/catalog', {
            params: {
                dataName: spectacleName,
            }
        }).then((response) => {
            console.log(response.data);
            setSpectacle(response.data);
        });
    }, []);
    return (
        <Container>
            <h1>{data.mainInfo.nameSpectacle}</h1>
            <p>Постановка {data.mainInfo.whoDidItName}</p>

            <Container style={{ width: '900px' }} >
                <SuperSlider items={data.items} />
            </Container>
            <br />

            <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3">
                <Tab eventKey="profile" title="Описание">
                    {data.bigText.split('\n').map(paragraphText => <p>{paragraphText}</p>)}
                </Tab>

                <Tab eventKey="show" title="О спектакле">
                    <FilledListGroup data={data.listGroupData} />
                    <br />
                </Tab>

                <Tab eventKey="contact" title="Актёры">
                    {
                        data.actors.map(actor =>
                            <Figura name={actor.name}
                                lastname={actor.surname}
                                roleName={actor.roleName}
                                photo={actor.photo} />)
                    }
                </Tab>
                <Tab eventKey="tickets" title="Билеты">
                    <Tickets spectacle={spectacle} setSpectacle={setSpectacle} user={user} />
                </Tab>
            </Tabs>
        </Container>
    )
}