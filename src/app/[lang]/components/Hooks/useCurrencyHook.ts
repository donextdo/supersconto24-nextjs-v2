import {useSelector} from "react-redux";
import {RootState} from "@/app/[lang]/redux/store";
import {useEffect, useState} from "react";

type UseCurrencyTypes = { ratio: number, targetRate: number, localeRate: number }
const useCurrency = (locale = "EUR", target = "EUR"): number[] => {
    const rates = useSelector((state: RootState) => state.siteData.currencyRates)
    const [localeRate, setLocaleRate] = useState(0)
    const [targetRate, setTargetRate] = useState(0)
    const [ratio, setRatio] = useState(0)

    useEffect(() => {
        if (rates?.rates) {
            console.log(rates, rates.rates[locale],rates.rates[target])
            setLocaleRate(rates.rates[locale])
            setTargetRate(rates.rates[target] ?? 0)
            setRatio((1 / rates.rates[locale])* (rates.rates[target] ?? 0))
        }
    }, [locale, rates])

    return [ratio, targetRate, localeRate]


}

export default useCurrency