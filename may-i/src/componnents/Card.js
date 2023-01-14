import ChatButton from "./chatButton";
import DrinkButton from "./drinkButton";

const Card = ({user, func, blur}) => {
    let pic;
    if (user.type === 2) {
        pic = 'man ';
    } else if (user.type === 3) {
        pic = 'woman ';
    }
    return (
        <div className="min-w-[300px] max-w-[400px] bg-red-200 place-self-center rounded-md gap-2 m-2">
            <div className="m-2">
                <div className="userName grid grid-flow-col border-b-2 m-2">
                    <div className={pic + "w-10 h-10 bg-contain"}>
                    </div>
                    <div>
                        {user.name}
                    </div>
                </div>
                <div className="mail m-2 border-b-2">
                    {user.mail}
                </div>
                <div className="grid place-center grid-flow-col gap-1">
                    <DrinkButton func={func} blur={blur}/>
                    <ChatButton func={func}/>
                </div>
            </div>
        </div>
    )
}

export default Card;
