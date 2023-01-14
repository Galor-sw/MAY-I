const DrinkInvite = ({func, blur}) => {
    const closeWindow = () => {
        func('');
        blur('');
    }
    return (
        <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center backdrop-blur-lg ">
            <div className="w-40 h-40 bg-red-200 drop-shadow-lg text-lg">drink drink</div>
            <button className='absolute top-4 right-4' onClick={closeWindow}>X</button>
        </div>
    )
}

export default DrinkInvite;
