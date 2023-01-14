const DrinkButton = ({func, blur}) => {
    const submit = () => {
        func('drink');
        blur('blur-md');
    }
    return (
        <button className={'drink m-1 bg-contain bg-no-repeat w-10 h-10 place-self-center'} onClick={submit}></button>
    )
}

export default DrinkButton;
