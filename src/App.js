import React, { Component } from 'react';
import './App.css';

class App extends Component {
    state = { city: '', weather: '', temp: '', temp_min: '', temp_max: '', icon: '', place: '', country: '', des: '', vbl: false };

    handleChange = (evt) => {
        let c = evt.target.value;
        this.setState({ city: c });
    }

    handleClick = () => {

        fetch("http://api.openweathermap.org/data/2.5/weather?q=" + this.state.city + "&units=metric&appid=359aa66ecff18573ced234066ba66502")
            .then((response) => response.json())
            .then((dt) => {
                this.setState({
                    weather: dt.weather[0].main, temp: dt.main.temp, temp_min: dt.main.temp_min,
                    temp_max: dt.main.temp_max, icon: dt.weather[0].icon, place: dt.name,
                    country: dt.sys.country, des: dt.weather[0].description, vbl: true
                });
            })
            .catch((err) => {
                console.error(err);
            })
    }
    render() {
        let output = null;
        if (this.state.vbl === true) {
            output = (
                <>
                    <img src={ `http://openweathermap.org/img/wn/${ this.state.icon }@2x.png` } alt={ this.state.weather } id="pic" /><br />
                    City: {this.state.place }<br />
                    Country: {this.state.country }<br />
                    Weather : {this.state.weather }  ({this.state.des })<br />
                    Temperature: {this.state.temp }°C <br />
                    Min Temperature: {this.state.temp_min }°C <br />
                    Min Temperature:   {this.state.temp_max }°C <br />

                </>
            );
        }
        return (
            <div className="container">
                <h1>Weather App</h1>
                Enter City Name:<br />
                <input type="text" value={ this.state.city } onChange={ this.handleChange } id="inp" /><br />
                {output }
                <input type="button" value="Search" onClick={ this.handleClick } id="btn" />
            </div>
        );
    }
}

export default App;