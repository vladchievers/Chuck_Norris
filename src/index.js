import React, { Component }  from 'react';
import ReactDOM from 'react-dom';

import {HashRouter as Router, Route} from 'react-router-dom';

import Categories from './components/categories';
import Joke from './components/joke';


class App extends Component {
    render() {
        return (
            <Router>
                <React.Fragment>
                    <Categories />
                    
                    <Route path="/:category" component={Joke} />
                    <Route path="/" exact component={Joke} />
                </React.Fragment>
            </Router>
        )
    }
}


ReactDOM.render(
    <App />,
    document.querySelector('#app')
); 