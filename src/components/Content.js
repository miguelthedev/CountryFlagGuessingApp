import React, { Component } from 'react'
import Flag from './Flag';
import Inputs from './Inputs';
import Button from './Button';
import Answer from './Answer';

class Content extends Component {
	constructor(props) {
		super(props);

		this.state = {
			countries: [],
			correctAnswer: {},
			guess: '',
			gameOver: false
		}
		
		this.getRandomCountries = this.getRandomCountries.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleGuess = this.handleGuess.bind(this);
		this.handleNext = this.handleNext.bind(this);

	}

	componentDidMount() {
		this.fetchCountries();
	}

	// Grabs data from the restcountries api
	fetchCountries() {
		fetch('https://restcountries.eu/rest/v2/all')
		.then(data => data.json())
		.then(countries => this.getRandomCountries(countries));
	}

	// Generates an array of 4 random countries, also randomly picks an item from the array and sets it at the answer, then sets the state of countries, and correct answer
	getRandomCountries(countries) {
		const randomCountries = [];
		for(let i = 0; i < 4; i++) {
			const randomCountry = countries[Math.floor(Math.random()*countries.length)];
			randomCountries.push(randomCountry)
		}
		const correctAnswer = randomCountries[Math.floor(Math.random()*randomCountries.length)];
		this.setState({ countries: randomCountries, correctAnswer });
	}

	// Sets the state of guess
	handleChange(e) {
		this.setState({ guess: e.target.value });
	}

	// Sets the state of gameOver to true
	handleGuess(e) {
		e.preventDefault();
		this.setState({ gameOver: true });
	}

	// Generates a new array of countries and a new answer, sets the state of gameOver to false
	handleNext(e) {
		e.preventDefault();
		this.fetchCountries();
		this.setState({
            gameOver: false,
            correctAnswer: {},
            countries: []
        });
	}

	render() {

		return (
            <div className='content-container'>
                <form className='form'>
                    {!this.state.gameOver ?
                    <Inputs
                        countries={this.state.countries}
                        onGuessChange={this.handleChange}
                    /> :
                    <Answer
                        correctAnswer={this.state.correctAnswer.name}
                        guessedAnswer={this.state.guess}
                    />}
                    {!this.state.gameOver ?
                    <Button
                        text={'Guess'}
                        onClick={this.handleGuess}
                    /> :
                    <Button
                        text={'Next'}
                        onClick={this.handleNext}
                    />}
                </form>
                <Flag flagContent={this.state.correctAnswer}/>
            </div>
		)
	}
}

export default Content;