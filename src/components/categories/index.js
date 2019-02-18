import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class Categories extends Component {
    constructor() {
        super();

        this.state ={
            categories: [],
            limit: 8,
            showMore: true,
            loader: true
        }

        this.getCategories = this.getCategories.bind(this);
        this.showMore = this.showMore.bind(this);
    }

    componentWillMount() {
        this.getCategories();
    }
    getCategories() {
        let category =[];

        axios.get('https://api.chucknorris.io/jokes/categories')
            .then((response) => {

                if(this.state.showMore){
                    category =  response.data.splice(0, this.state.limit);
                }else{
                    category = response.data;
                }

                this.setState({
                    categories: category,
                    loader: false
                })
            }) 
            .catch(reject => {
                console.error(reject);
            })
    }

    showMore() {
        this.setState({
            showMore: false
        });
        this.getCategories();
    }
    render() {
        return(
            <div className="categories">
            {
                !this.state.loader ? (
                    this.state.categories.map((el) => (
                    <NavLink key={el} to={`/${el}`} className="item">{el}</NavLink>
                ))) : (
                    "loading..."
                )
                
            }
            {
                this.state.showMore ? (
                        <button onClick={this.showMore} className="showMore">Show more</button>
                    ) : null
            }
            </div>
        ) 
    }
}

export default Categories;
