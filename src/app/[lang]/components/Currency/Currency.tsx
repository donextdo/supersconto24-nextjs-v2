const Currency = ({setSelectedCurrency}: { setSelectedCurrency: Function }) => {
    return (
        <div
            className='absolute w-[100px] max-h-[540px] bg-white left-0 top-4 z-50 px-5 py-4 shadow-lg space-y-2 rounded-lg flex flex-col'>
            <button className="text-xs hover:text-primary" onClick={() => setSelectedCurrency("USD")}>USD</button>
            <button className="text-xs hover:text-primary" onClick={() => setSelectedCurrency("EUR")}>EUR</button>
        </div>
    );
}

export default Currency;