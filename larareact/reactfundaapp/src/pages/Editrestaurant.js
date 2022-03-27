import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function EditRestaurant(props) {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [restaurantInput, setRestaurant] = useState([]);
    const [errorInput, setError] = useState([]);

    useEffect(() => {
        
        const restaurant_id = props.match.params.id;
        axios.get(`/api/edit-restaurant/${restaurant_id}`).then( res => {

            if(res.data.status === 200)
            {
                setRestaurant(res.data.restaurant);
                setLoading(false);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history.push('/restaurants');
            }
        });

    }, [history]);

    const handleInput = (e) => {
        e.persist();
        setRestaurant({...restaurantInput, [e.target.name]: e.target.value });
    }

    const updateRestaurant = (e) => {
        e.preventDefault();
        
        const restaurant_id = props.match.params.id;
        // const data = restaurantInput;
        const data = {
            name: restaurantInput.name,
            address: restaurantInput.address,
            email: restaurantInput.email,
            phone: restaurantInput.phone,
        }

        axios.put(`/api/update-restaurant/${restaurant_id}`, data).then(res=>{
            if(res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                setError([]);
                history.push('/restaurants');
            }
            else if(res.data.status === 422)
            {
                swal("All fields are mandetory","","error");
                setError(res.data.validationErrors);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history.push('/restaurants');
            }
        });
    }

    if(loading)
    {
        return <h4>Loading Edit Restaurant Data...</h4>
    }
    
    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit Restaurants 
                                    <Link to={'/restaurants'} className="btn btn-danger btn-sm float-end"> BACK</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={updateRestaurant} >
                                    <div className="form-group mb-3">
                                        <label>Restaurant Name</label>
                                        <input type="text" name="name" onChange={handleInput} value={restaurantInput.name} className="form-control" />
                                        <span className="text-danger">{errorInput.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Restaurant Address</label>
                                        <input type="text" name="address" onChange={handleInput} value={restaurantInput.address}  className="form-control" />
                                        <span className="text-danger">{errorInput.address}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Restaurant Email</label>
                                        <input type="text" name="email" onChange={handleInput} value={restaurantInput.email}  className="form-control" />
                                        <span className="text-danger">{errorInput.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Restaurant Phone</label>
                                        <input type="text" name="phone" onChange={handleInput} value={restaurantInput.phone}  className="form-control" />
                                        <span className="text-danger">{errorInput.phone}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" id="updatebtn" className="btn btn-primary">Update Restaurant</button>
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

export default EditRestaurant;