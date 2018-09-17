import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Stores from './Stores';

class Beverages extends Component {
render() {
    const { beverages, latitude, longitude } = this.props;

    const beverageListItem = beverages.map((beverage, index) => {
        let beverageTag = beverage.tags;
        let beverageImage = beverage.image_thumb_url;       
        
        //include beaus brand and beer
        if(beverageTag.includes("beaus") === false || beverageTag.includes("beer") === false){
            return null;    
        }

        //assume incomplete product info, skip.
        if (beverageImage === null) {
            return null;
        }

        // must be seasonal beverage        
        if (beverage.is_seasonal === false) {
            return null;
        } else {            
            beverage.displayPrice = beverage.regular_price_in_cents > 0 ? (beverage.regular_price_in_cents / 100) : 0;
            let itemDataTarget = '#m'+beverage.id;

            return (
                <div className="col-md-4" key={index} >
                    <div className="card mb-4 shadow-sm">
                        <img className="card-img-top" src={beverageImage} alt={beverage.name} width="20" />
                        <div className="card-body">
                            <h5 className="card-text">{beverage.name}</h5>
                            
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm">{beverage.primary_category} : {beverage.secondary_category}</div>
                                </div>
                                <div className="row">                                          
                                    <div className="col-sm">{beverage.package}</div>
                                </div>
                            </div>

                            <hr></hr>
                            
                            <div className="d-flex justify-content-between align-items-center">
                                {/* open Modal button */}
                                <button type="button" 
                                    className="btn btn-primary" data-toggle="modal" data-target={itemDataTarget} >
                                    Stores
                                </button>

                                {/* Modal window for clicked item */}
                                <div className="modal fade" id={ 'm' + beverage.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
                                
                                <div className="modal-dialog modal-dialog-centered" role="document" >
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalCenterTitle">{beverage.name} - Product #{beverage.id}</h5>
                                            
                                            {/* X window to close */}
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        
                                        <div className="modal-body modal-body-custom">
                                            <div className="container">
                                                <div className="row">
                                                    {beverage.tasting_note}
                                                </div>
                                                <div>&nbsp;</div>
                                                <div className="row">Available at the following locations:</div>
                                                <div>&nbsp;</div>

                                                <Stores 
                                                    productId = {beverage.id} 
                                                    latitude = {latitude} 
                                                    longitude = {longitude} />

                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>            
                                                </div>                                                
                                            </div>
                                        </div>                                        
                                    </div>                                    
                                </div>
                                </div>

                                <small className="text-muted">$ {beverage.displayPrice}</small>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    });

    return (
        <div className="row"> 
            {beverageListItem}
        </div>
    )
  }
}

Beverages.propTypes = { 
    beverages: PropTypes.array.isRequired,
    longitude: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired
}

export default Beverages

