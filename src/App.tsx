import { useState } from "react";

interface Country {
    name: { common: string; official: string };
    capital: string[];
    borders: string[];
    population: number;
    altSpellings:string[];
    flags: { png: string; svg: string; alt: string };
    maps: { googleMaps: string };
}


type CountryInfoProps = {
    country: Country | null;
};


const fetchCountryData = async (countryCode: string): Promise<Country> => {
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
    const countries = await res.json();
    console.log(countries);
    return countries[0];
};


export default function App() {
    const [code, setCode] = useState("dk");
    const [country, setCountry] = useState<Country | null>(null);


    const getInfo = async () => {
        const info = await fetchCountryData(code);
        setCountry(info);
    };


    return (
        <>
            <h1>Show Country Info</h1>
            <input
                type="text"
                id="code"
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter Country Code"
            />
            <button onClick={() => getInfo()}>Get Info</button>
            <CountryInfo country={country} />
        </>
    );
}
const CountryInfo = ({country}: CountryInfoProps) => {

    return country == null ? (
        <p>Enter Country Code above to fetch country info</p>
    ) : (
        <>
            <h1>Country Info</h1>
            <h4>Flag</h4>
            <img style={{ width: 100 }} src={country.flags.png} alt={country.flags.alt} />
            <p>Country Name Common: {country.name.common}</p>
            <p>Country Name Official: {country.name.official}</p>
            <p>Country Capital: {country.capital.join(", ")}</p>
            <p>Population: {country.population}</p>
            <p>Country Borders: {country.borders.join(", ")}</p>
            <h4>Alternative Spellings</h4>
            <ol>{
                country.altSpellings?.map((alt, i) => (
                    <li key={i}>{alt}</li>
                ))
            }</ol>
            <a href={country.maps.googleMaps} target="_blank">
                Google Maps
            </a>
        </>
    );
};
