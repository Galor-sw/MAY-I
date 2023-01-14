const mapPixel = ({number, changeCard}) => {

    let color;
    if (number === 1) {
        color = 'bg-black cursor-auto';
    } else if (number === 2) {
        color = 'man';
    } else if (number === 3) {
        color = 'woman';
    } else color = 'floor object-scale-down cursor-auto';


    let image;
    if (number === 0) {
        image = "bg-[url('./images/parquet.png')]"
    }
    const submit = () => {
        changeCard({number});
    }

    const nothing = () => {

    }
    return (
        <button className={color + ' w-10 h-10 bg-contain'}
                onClick={number <= 1 ? nothing : submit}
                type="button"
        >
        </button>
    )
}

export default mapPixel;
