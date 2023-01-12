import react from 'react';
import { Carousel } from 'react-bootstrap';
import MyGetItem from './MyGetItem';

function SuperSlider(props) {
    let sets = props.settings;

    let listItems = ""
    listItems = props.items.map(cur => MyGetItem(props={item:cur, settings:sets}));

    return (
        <>
            {listItems &&
                (<Carousel>
                    {listItems}
                </Carousel>)
            }
        </>
    )
}

export default SuperSlider;