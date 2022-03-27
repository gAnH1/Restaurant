import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function AddRestaurant() {

    const history = useHistory();
    const [restaurantInput, setRestaurant] = useState({
        name: '',
        address: '',
        email: '',
        phone: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setRestaurant({...restaurantInput, [e.target.name]: e.target.value })
    }

    const saveRestaurant = async (e) => {
        e.preventDefault();
        
        const data = {
            name:restaurantInput.name,
            address:restaurantInput.address,
            email:restaurantInput.email,
            phone:restaurantInput.phone,
        }

        axios.post('/api/add-restaurant', data).then(res => {

            if(res.data.status === 200)
            {
                swal("Success!",res.data.message,"success");
                setRestaurant({
                    name: '',
                    address: '',
                    email: '',
                    phone: '',
                    error_list: [],
                });
                history.push('/restaurants');
            }
            else if(res.data.status === 422)
            {
                setRestaurant({...restaurantInput, error_list: res.data.validate_err });
            }
        });
    }

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Add Restaurants 
                                    <Link to={'/'} className="btn btn-danger btn-sm float-end"> BACK</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={saveRestaurant} >
                                    <div className="form-group mb-3">
                                        <label>Restaurant Name</label>
                                        <input type="text" name="name" onChange={handleInput} value={restaurantInput.name} className="form-control" />
                                        <span className="text-danger">{restaurantInput.error_list.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Restaurant Address</label>
                                        <input type="text" name="address" onChange={handleInput} value={restaurantInput.address}  className="form-control" />
                                        <span className="text-danger">{restaurantInput.error_list.address}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Restaurant Email</label>
                                        <input type="text" name="email" onChange={handleInput} value={restaurantInput.email}  className="form-control" />
                                        <span className="text-danger">{restaurantInput.error_list.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Restaurant Phone</label>
                                        <input type="text" name="phone" onChange={handleInput} value={restaurantInput.phone}  className="form-control" />
                                        <span className="text-danger">{restaurantInput.error_list.phone}</span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Save Restaurant</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default AddRestaurant;