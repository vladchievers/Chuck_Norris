import React, { Component }  from 'react';
import axios from 'axios';



class Joke extends Component {
    constructor(){
        super();

        this.state = {
            joke: null,
            loader: false
        }

        this.getJoke = this.getJoke.bind(this);
    }
    componentWillMount() {
        this.getJoke();
    }

    componentWillReceiveProps() {
        this.getJoke();
    }

    getJoke(){
        let category = this.props.match.params.category;
        let url = `https://api.chucknorris.io/jokes/random${category ? `?category=${category}` : ''}`;

        this.setState({
            loader: true
        });

        axios.get(url)
            .then(response => {
                console.log(response.data)
                this.setState({
                    joke: response.data,
                    loader: false
                })
            })
            .catch(reject => {
                this.setState({
                    loader: false
                })
                console.error(reject)
            })
    }
    render(){
        const { joke , loader } = this.state;
        return (
            <div>
                <div className="joke">
                    {
                        joke && joke.icon_url ? 
                            (
                                <img className="image" src={joke.icon_url} />
                            )
                            : null
                    }
                    <p>{loader ? "loading..." : joke.value}</p>
                </div>
                <button 
                    className="btn"
                    onClick={this.getJoke}> 
                    Random
                </button>
            </div>
        )
    }
}

export default Joke;