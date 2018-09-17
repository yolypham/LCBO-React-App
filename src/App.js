import React, { Component } from 'react';
import axios from 'axios';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Content from './components/layout/Content';
import Beverages from './components/Beverages.jsx';

import './App.css';

let beverageArray = [];
// let totalBeverageList = [];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beverages: [],
            product_id: "",
            longitude: "",
            latitude: ""
        };
    }

    componentDidMount() {
        this.getLocation();

        const fx = () => { 
            this.loadBeverages();
        }

        setTimeout(fx, 5000);
    }

    getLocation = () => {
        const geolocation = navigator.geolocation;
    
        new Promise((resolve, reject) => {
          if (!geolocation) {
            reject(new Error('Not Supported'));
          }
          
          geolocation.getCurrentPosition((position) => {
            resolve(position);

            // console.log(position.coords.latitude);
            // console.log(position.coords.longitude);

            this.setState ({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
          }, () => {
            reject (new Error('Permission denied'));
          });
        });
    } 

    loadBeverages = () => { 
        axios
            .get(`https://lcboapi.com/products?where=is_seasonal&per_page=100&page=1&q="beer+beau"&access_key=${process.env.REACT_APP_API_KEY}`)
            .then(response => {
                response.data.result.map((beverage) => {
                beverageArray.push(beverage);    
            })    
                this.setState({
                    beverages: beverageArray
                });
            })
            .catch( (error) => {
                console.log(`API Get products error. ${error}`);
            })
    }
    
    render() {

        const { beverages, longitude, latitude } = this.state;

        return (
            <div>
                <Header />
                <Content />
                <div className="album py-5 product-section-custom">
                    <div className="container container-items-custom">
                        <Beverages 
                            beverages={beverages}
                            longitude={longitude}
                            latitude={latitude} 
                        /> 
                    </div>
                </div>                
                <Footer />             
            </div>
        );
    }
}

export default App;
