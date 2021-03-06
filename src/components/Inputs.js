import React, { Component } from 'react';

class Inputs extends Component {
    render() {
        const { countries, onGuessChange } = this.props;

        const countryInputs = countries.map(country => {
            return (
                <div
                    key={country.name}
                    className='guess-container'
                >
                    <input
                        type='radio'
                        value={country.name}
                        name='countryGuess'
                        id={country.name}
                        onChange={onGuessChange}
                    />
                    <label htmlFor={country.name} className='input-label'>
                        <span className="radio-button"></span>
                        {country.name}
                    </label>
                </div>
            )
        })

        return (
            <div className='inputs-container'>
                {countryInputs}
            </div>
        )
    }
}

export default Inputs;