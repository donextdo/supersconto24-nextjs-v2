import {useSelector} from "react-redux";
import {RootState} from "@/app/[lang]/redux/store";
import {useEffect, useMemo, useState} from "react";
import {useSearchParams} from "next/navigation";

type UseCurrencyTypes = { ratio: number, targetRate: number, localeRate: number, getPrice: Function, formatter: Intl.NumberFormat }
const useCurrency = (locale = "EUR"):UseCurrencyTypes  => {
    const searchParams = useSearchParams();
    const rates = useSelector((state: RootState) => state.siteData.currencyRates)
    const [localeRate, setLocaleRate] = useState(0)
    const [targetRate, setTargetRate] = useState(0)
    const [ratio, setRatio] = useState(0)

    useEffect(() => {
        if (rates?.rates) {
            setLocaleRate(rates.rates[locale])
            setTargetRate(rates.rates[searchParams.get("currency") ?? "EUR"] ?? 0)
            setRatio((1 / rates.rates[locale]) * (rates.rates[searchParams.get("currency") ?? "EUR"] ?? 0))
        }
    }, [locale, rates, searchParams])

    const formatter = useMemo(() => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: searchParams.get("currency") ?? "EUR"
        });

    }, [searchParams])

    const getPrice = (price: number) => {
        return formatter.format(price * ratio)
    }

    return {ratio, targetRate, localeRate, getPrice, formatter}


}

export default useCurrency