import React, { useState } from 'react';
import axios from "axios";
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

const SpectacleCard = (props) => (
    <Card key={props.val} style={{ width: '24rem' }}>
        <Card.Img
            variant="top"
            src={props.card.src}
        />
        <Card.Body>
            <Card.Title>{props.card.title}</Card.Title>
            <Card.Text>{props.card.text}</Card.Text>
            <div>Кол-во: {props.card.count} </div>
            <Link to={`/aboutSpectacle/${props.card.dataName}`} className="btn btn-primary">Узнать больше</Link>
        </Card.Body>
    </Card>
)

const Row3ColCards = (props) => (
    <Row key={props.val} style={{ paddingLeft: '40px' }}>
        {
            props.data.map((current, id) => (
                <Col val={id + props.val * 3} md={{ span: 4 }}>
                    <SpectacleCard card={current} />
                </Col>
            ))
        }
    </Row>
)

function split(data) {
    let mas = []
    let size = Math.ceil(data.length / 3);
    for (let i = 0; i < size; i++) {
        mas.push(data.slice(3 * i, 3 * i + 3));
    }
    return mas;
}


export const About = () => {

    const [value, setValue] = React.useState(null);
    const { searchString: search } = useParams();
    console.log(search);

    React.useEffect(() => {
      axios.get('http://localhost:3001/catalog').then((response) => {
        let data = response.data;
        console.log(data, search);
        if (search != undefined) {
            let searchStr = search.toLowerCase();
            data = data.filter(el => el.title.toLowerCase().includes(searchStr));
            console.log(data, searchStr);
        }
        setValue(split(data));
        console.log(data);
      });
    }, [search]);

    if (!value) return null;

    
    // let text = '12';
    // let mas = split(filter(text));
    // let [value, setValue] = useState(split(data));

    return (
        <>
            <Container style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
                <h2 className="text-center m-4">Афиша</h2>
                {/* <div className="form">
                    <form className="search_form">
                        <input
                            type="text"
                            placeholder="Поиск по названию..."
                            className="search_input"/>
                    </form>
                </div> */}
                {
                    value.map((littleMas, ind) => <><Row3ColCards val={ind} data={littleMas} /><br /></>)
                }
            </Container>
        </>
    )
}
