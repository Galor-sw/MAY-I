import './App.css';
import Map from "./componnents/Map";
import Card from "./componnents/Card";
import {useState} from "react";
import DrinkInvite from "./componnents/drinkInvite";
import axios from 'axios';
import cookie from 'js-cookie';


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

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}


function App() {

    const [userId, setUserId] = useState('');
    const [user, setUser] = useState('');
    const [sessionId, setSessionId] = useState('');

    const server = async (e) => {
        e.preventDefault();
        // JSON.stringify({email: "kobi.ronen@gmail.com", password: "123"});
        // headers: {
        //     'Content-Type': 'application/json'
        // }
        try {
            console.log('login');
            await axios.post('http://localhost:4020/login', {
                    email: "kobi.ronen@gmail.com", password: "123",
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }).then(response => response.json())
                .then(sessionID => {
                    // do something with the data

                    console.log(sessionID);
                    // setSessionId(sessionID);
                });

            // await axios.post('http://localhost:4020/login', {email: "kobi.ronen@gmail.com", password: "123"});
        } catch (error) {
        }
    }

    const userInfo = async (e) => {
        e.preventDefault();
        try {
            console.log('after login');
            console.log({toto: document.cookie});
            await axios.get('http://localhost:4020/userInfo', {
                withCredentials: true,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `Idea-de3e26ac=${cookie.get('Idea-de3e26ac')}; session=${cookie.get('session')}; session.sig=${cookie.get('session.sig')}; sessionId=${cookie.get('sessionId')}`
                }
            }).then(response => {
                // const data = response
                console.log({cookies: getCookie()})
                console.log({...response})
                const data = response.data;
                console.log(JSON.stringify(data))
            });

        } catch (error) {
            console.error(error);
        }
    }


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
                <button onClick={server}>login</button>
                <button onClick={userInfo}>afterLogin</button>
                <Map changeUser={changeUser}/>
                {userId !== '' && <Card user={user} func={setCommunication} blur={setBlur}/>}
            </div>
            {communicationCard === 'drink' && <DrinkInvite func={setCommunication} blur={setBlur}/>}
        </div>
    );
}

export default App;
