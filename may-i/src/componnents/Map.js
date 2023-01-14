import MapPixel from "./mapPixel";


const Map = ({changeUser}) => {
    // const [cardId, setCardId] = useState('');
    const changeCard = ({number}) => {
        // console.log('map changeCard: ', number);
        changeUser(number);
    }
    const locationMap = [
        [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 3, 3, 0, 0],
        [1, 0, 2, 3, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0],
        [1, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 1, 1, 1, 1, 0, 0, 3, 1, 0, 0, 1, 0],
        [0, 0, 0, 2, 2, 2, 3, 0, 0, 3, 1, 0, 2, 1, 3],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 0, 0, 1, 0],
        [0, 0, 0, 2, 3, 2, 3, 0, 0, 0, 1, 0, 0, 1, 0],
        [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 3, 0, 0],
        [2, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 1, 1, 0, 0],
        [1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
    ]
    return (
        <div>
            <div className="grid max-w-[900px] min-w-[500px]">
                {locationMap.map((i, key) => {
                        return (
                            <div key={key} className="grid grid-flow-col">
                                {i.map((index, key) =>
                                    <MapPixel key={key} number={index} changeCard={changeCard}/>)}
                            </div>
                        )
                    }
                )}
            </div>
        </div>
    )
}

export default Map;
