import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';

class Stores extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stores: [],
        }
    }

    componentDidMount() {
        const {productId, latitude, longitude} = this.props;

        axios
        .get(`https://lcboapi.com/stores?lat=${latitude}&lon=${longitude}&product_id=${productId}&access_key=${process.env.REACT_APP_API_KEY}`)
        .then(response => {
            this.setState({ 
                stores: response.data.result
            })        
        })
        .catch( (error) => {
            console.log(`API Get stores error. ${error}`);
        })
    }

    render() {
        const {productId, latitude, longitude} = this.props;
        
        const storeList = this.state.stores.map((store, index) => {
            const distanceKm = (store.distance_in_meters / 1000).toFixed(1);
            const addressLine1 = store.address_line_1.replace(/ /g, "+");
            const postalCode = store.postal_code.replace(/ /g, "+");

            const directionURL = `https://www.google.ca/maps/dir/${latitude},${longitude}/${addressLine1},+${store.city},+${postalCode}`;
            
            //console.log(directionURL);

            return (
                <div className="row" key={index} >
                    <div className="col-sm">
                        <address>
                            <div><strong>{store.name} - #{store.store_no}</strong></div>
                            <div>{store.address_line_1}, {store.city}, {store.province} {store.postal_code}</div>
                            <div>P: {store.telephone} &emsp; F: {store.fax}</div>
                            <div>{distanceKm} Kilometers</div>
                        </address>
                    </div>
                    <div className="col-2">
                        <a href={directionURL} target="_blank"
                            data-toggle="tooltip" data-placement="top" 
                            title="Click to see Google direction">                            
                            <img className="direction-icon" width="50px" height="50px" alt=""/>
                        </a>
                    </div>
                </div> 
            )
        })

   
        return (
            <div className="row"> 
                <div className="container">
                    {storeList}
                </div>
            </div>
        )
    }
}

Stores.propTypes = {
    productId: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
}


export default Stores
