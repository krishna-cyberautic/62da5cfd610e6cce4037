import React, { useState, useEffect } from 'react'
import { Input, Card, Button } from 'antd';
import axios from 'axios';
const { Search } = Input;
const Api_key = '63e3cf110b2ea7e9bb5b7f52dbfa134e';
export const Weather = () => {
    const [searchItem, setSearchItem] = useState("");
    const [detail, setDetail] = useState([]);
    const [country, setCountry] = useState([]);
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        axios.get(`https://restcountries.eu/rest/v2/name/${searchItem}`)
            .then(res => setCountry(res.data))
            .catch(error => console.log(error.message));

    }, [country])

    const HandleWeather = (city) => {
        axios.get(`http://api.weatherstack.com/current? access_key=${Api_key}&query =${city}`)
            .then(res => setDetail(res.data))
            .catch(error => console.log(error.message))
        setFlag(true);
    }
    return (
        <div style={{ marginTop: '1rem' }}>
            <Search
                placeholder="Enter Country name"
                allowClear
                enterButton="Search"
                style={{ width: 300 }}
                onSearch={(value) => { setSearchItem(value) }}
            />

            {flag ?
                <div className="site-card-border-less-wrapper"
                    style={{
                        display: 'flex', justifyContent: 'center',
                        alignItems: 'center', marginTop: '1rem'
                    }}>
                    <Card title="Country Weather Dwtail" style={{ width: 300 }}>
                        {detail && detail.map((val) => {
                            return (

                                <p>Temperature:{val.temperature}</p>,
                                <p>weather_icons: <img src={val.weather_icons} alt="weather_icons" /></p>,
                                <p>wind_speed:{val.wind_speed}</p>,
                                <p>precip:{val.precip}</p>

                            )
                        })}

                    </Card>
                </div>
                :
                <div className="site-card-border-less-wrapper"
                    style={{
                        display: 'flex', justifyContent: 'center',
                        alignItems: 'center', marginTop: '1rem'
                    }}>
                    <Card title="Country" style={{ width: 300 }}>
                        {country && country.map((val) => {
                            return (

                                <p>Capital:{val.capital}</p>,
                                <p>Population:{val.population}</p>,
                                <p>Lating:{val.latlng[0]},{val.latlng[1]}</p>,
                                <p>Flag:<img src={val.flag} alt="flag" /></p>,
                                <Button onClick={HandleWeather(val.capital)}> Capital Weather</Button>
                            )
                        })}

                    </Card>
                </div>

            }
        </div>
    )
}
