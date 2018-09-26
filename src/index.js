#!/usr/bin/env node
import axios from 'axios';
const args = process.argv.slice(2);

class Weather {
    constructor(city) {
        this.apiKey = '638df99df6885ac7bc3b947ac52d7719';
        this.baseURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
            this.apiKey
        }`;
    }
    async weather() {
        try {
            const res = await axios.get(`${this.baseURL}`);
            const cond = res.data.weather
                .map(item => {
                    return item.description;
                })
                .join(' ,');
            return ` The temperatur in ${args} is ${res.data.main.temp}°C ${cond}`;
        } catch (error) {
            console.error('Check your city the city you looking for is not exsit');
        }
    }
}
const temp = new Weather(args[0]);

temp
    .weather()
    .then(console.log)
    .catch(console.error);
