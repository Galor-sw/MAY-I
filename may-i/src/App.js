import './App.css';
import Map from "./componnents/Map";
import Card from "./componnents/Card";
import {useState} from "react";
import DrinkInvite from "./componnents/drinkInvite";

const users = [{
    userId: 4,
    type: 2,
    name: 'eli',
    mail: 'eli@gmail.com'
}, {
    userId: 2,
    type: 2,
    name: 'tamir',
    mail: 'tamir@gmail.com'
}, {
    userId: 3,
    type: 3,
    name: 'haim',
    mail: 'haim@gmail.com'
}
]

function App() {
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState('');
    const changeUser = (number) => {
        setUserId(number);
        let userJson = users.find(e => e.userId === number);
        setUser(userJson);
    }

    const [communicationCard, setCommunication] = useState();
    const [blur, setBlur] = useState('');
    console.log(blur);
    return (
        <div>
            <div
                className={'grid place-content-center gap-4 mainLinear bg-cover h-screen relative w-full bg-cover bg-center ' + blur}>
                <Map changeUser={changeUser}/>
                {userId !== '' && <Card user={user} func={setCommunication} blur={setBlur}/>}
            </div>
            {communicationCard === 'drink' && <DrinkInvite func={setCommunication} blur={setBlur}/>}
        </div>
    );
}

export default App;
