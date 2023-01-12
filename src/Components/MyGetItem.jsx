import react from 'react';
import { Carousel, Image } from 'react-bootstrap';

function MyGetItem(props) {
    let radius = props?.settings?.radius ? props.settings.radius : 0;
    let height = props?.settings?.height ? props.settings.height : 'auto';

    let src = props.item.src;
    let alt = props.item.alt;
    let title = props.item.title;

    return (
        <Carousel.Item>
            <Image style={{ borderEndEndRadius: radius, borderEndStartRadius: radius, height: height }} className='d-block w-100' src={src} alt={alt} />
            {
                title &&
                <Carousel.Caption>
                    <h3>{title}</h3>
                </Carousel.Caption>
            }
        </Carousel.Item>
    )
}

export default MyGetItem;