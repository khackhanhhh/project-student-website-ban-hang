import React, { useState, useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { Link } from 'react-router-dom';

const EditCategory = (props) => {
    const [name, setName] = useState('');

    useEffect(() => {
        axios.get('/api/categories/' + props.match.params.id)
            .then(response => {
                setName(response.data.category.name);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])
    const onChangeName = (e) => {
        setName(
            e.target.value
        );
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const category = {
            name
        };

        axios.put('/api/categories/update/' + props.match.params.id, category)
            .then(res => console.log(res.data));

            window.location = '/categorylist';
    }
    return (
        <div className=" mt-3">
            <h3>Edit Category Log</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Category : </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={name}
                        onChange={onChangeName}
                    />
                </div>
                <div className="d-flex ">
                    <div className="form-group mr-4">
                        <input type="submit" value="Edit Product Log" className="btn btn-primary" />
                    </div>

                    <Link to="/categorylist" className="navbar-item text-light">
                        <button className="btn btn-danger form-group" >Cancel</button>
                    </Link>

                </div>
            </form>
        </div>
    );
}

export default EditCategory;
//     constructor(props) {
//         super(props);

//         this.onChangeNameCategory = this.onChangeNameCategory.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);

//         this.state = {
//             namecategory: '',
//         }
//     }

//     componentDidMount() {
//         axios.get('/api/categories/' + this.props.match.params.id)
//             .then(response => {
//                 this.setState({
//                     namecategory: response.data.namecategory,
//                 })
//             })
//             .catch(function (error) {
//                 console.log(error);
//             })
//     }

//     onChangeNameCategory(e) {
//         this.setState({
//             namecategory: e.target.value
//         });
//     }

//     onSubmit(e) {
//         e.preventDefault();

//         const category = {
//             namecategory: this.state.namecategory,
//         };

//         console.log(category);

//         axios.post('/api/categories/update/' + this.props.match.params.id, category)
//             .then(res => console.log(res.data));
//         axios.post('/api/products/update/' + this.props.match.params.id, category)
//             .then(res => console.log(res.data));
//         window.location = '/';
//     }

//     render() {
//         return (
//             <div>
//                 <h3>Edit Category Log</h3>
//                 <form onSubmit={this.onSubmit}>
//                     <div className="form-group">
//                         <label>Category : </label>
//                         <input type="text"
//                             required
//                             className="form-control"
//                             value={this.state.namecategory}
//                             onChange={this.onChangeNameCategory}
//                         />
//                     </div>

//                     <div className="form-group">
//                         <input type="submit" value="Edit Product Log" className="btn btn-primary" />
//                     </div>
//                 </form>
//             </div>
//         )
//     }
// }