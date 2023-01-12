import React from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import picture1 from '../img/lake.jpg';
import picture2 from '../img/karmen.jpg';
import picture3 from '../img/princess.jpg';
import picture4 from '../img/sleep.jpg';
import picture5 from '../img/lefty.jpg';
import picture6 from '../img/anna.jpg';
import picture7 from '../img/onegin.jpg';
import SuperSlider from '../Components/SuperSlider';

const SpectacleCard = (props) => (
    <Card key={props.val} style={{ width: '22rem' }}>
        <Card.Img
            variant="top"
            src={props.card.src}
        />
        <Card.Body>
            <Card.Title>{props.card.title}</Card.Title>
            <Card.Text>{props.card.text}</Card.Text>
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

const data = [
    { dataName: 'Anna', title: 'Анна Каренина', src: picture6, text: `В оркестровой яме в основном духовые, а из динамиков грохочут барабаны с электрогитарой в духе рок-опер восьмедисятых. Вместо декораций — огромный экран, превращающий место действия то в вокзал, то в бальный зал и многое другое.` },
    { dataName: 'Onegin', title: 'Евгений Онегин', src: picture7, text: 'Римас Туминас поставил заснеженного «Евгения Онегина» с Сергеем Маковецким в главной роли под томную музыку Фаустаса Латенаса. Два акта воздушного благолепия, искусственного снега и поэзии заставляют поверить в то, что даже красота может быть избыточной.' },
    { dataName: 'Karmen', title: 'Кармен', src: picture2, text: 'Над секретом популярности «Кармен» размышляли композиторы, поэты, ученые. Важнейшая из причин – потрясающе яркая музыка, которая передает солнечный испанский колорит, но не докучает слушателю буквальными цитатами из фольклора.' },
]

let items = [
    { src: picture1, alt: 'first picture', name: 'Лебединое озеро' },
    { src: picture2, alt: 'second picture', name: 'Кармен' },
    { src: picture3, alt: 'third picture', name: 'Принцесса цирка' },
    { src: picture4, alt: 'fourth picture', name: 'Спящая красавица' },
    { src: picture5, alt: 'fifth picture', name: 'Левша' },
];

let settings = {
    radius: 10,
    height: '550px'
}

export const Home = () => {
    let mas = []
    let size = Math.ceil(data.length / 3);
    for (let i = 0; i < size; i++) {
        mas.push(data.slice(3 * i, 3 * i + 3));
    }
    return (
        <>
            <Container>
                <SuperSlider items={items} settings={settings} />
            </Container>

            <Container style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
                <h2 className="text-center m-4">Популярное</h2>
                {
                    mas.map((littleMas, ind) => <><Row3ColCards val={ind} data={littleMas} /><br /></>)
                }
            </Container>
        </>
    )
}