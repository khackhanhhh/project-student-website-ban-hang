import React, { useState, useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const EditProduct = (props) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [guarantee, setGuarantee] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [catId, setCatId] = useState('');
    const [ image, setImage ] = useState();
    let history = useHistory();

    useEffect(() => {
        axios.get('/api/products/' + props.match.params.id)
            .then(response => {
                setName(response.data.product.name);
                setPrice(response.data.product.price);
                setDiscount(response.data.product.discount);
                setGuarantee(response.data.product.guarantee);
                setDescription(response.data.product.description);
                setCatId(response.data.product.category._id);
                setImage(response.data.product.uploadedImage);

            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('/api/categories')
            .then(response => {
                if (response.data.categories.length > 0) {
                    setCategories(response.data.categories)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);
    const onChangeName = (e) => {
        setName(
            e.target.value
        );
    }


    const onChangePrice = (e) => {
        setPrice(
            e.target.value
        );
    }

    const onChangeDiscount = (e) => {
        setDiscount(
            e.target.value
        );
    }

    const onChangeGuarantee = (e) => {
        setGuarantee(
            e.target.value
        );
    }

    const onChangeDescription = (e) => {
        setDescription(
            e.target.value
        );
    }

    const onChangeCategories = (e) => {
        const cat = categories.find(category => category._id == e.target.value)
        setCatId(cat._id);
    }

    const onChangeImage = (e) => {
        setImage(
            e.target.files[0]
        );
    }
    const onSubmit = (e) => {
        e.preventDefault();

        const product = {
            catId,
            name,
            price,
            discount,
            guarantee,
            description,
        };

        axios.put('/api/products/update/' + props.match.params.id, product)
            .then(res => {
               
                const formData = new FormData();

                // // Update the formData object
                formData.append(
                    "product_pic",
                    image
                );
                // console.log(image)
                axios.post( "/api/products/" + res.data._id + '/uploads', formData)
                .then(res =>{
                    console.log('image ===', res);
                    // window.location='/';
                    history.push('/')
                })
            });
            
    }

    return (
        <div className=" mt-3">
            <h3>Edit Product Log</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Category </label>
                    <select refs="categoryInput"
                        className="form-control"
                        value={catId}
                        onChange={onChangeCategories}>
                        {
                            categories.map(function (category) {
                                return <option
                                    key={category._id}
                                    value={category._id}>{category.name}
                                </option>;
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Name Product: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={name}
                        onChange={onChangeName}
                    />
                </div>
                <div className="form-group">
                    <label>Price : </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={price}
                        onChange={onChangePrice}
                    />
                </div>
                <div className="form-group">
                    <label>Discount </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={discount}
                        onChange={onChangeDiscount}
                    />
                </div>
                <div className="form-group">
                    <label>Guarantee : </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={guarantee}
                        onChange={onChangeGuarantee}
                    />
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <textarea type="text"
                        className="form-control"
                        value={description}
                        onChange={onChangeDescription}
                    />
                </div>
                <div className="form-group">
                    <label>Image:</label>
                    <br />
                    <img src={`/uploads/${image}` } width ="100px" height="100px" ></img>
                    <form action='' encType="multipart/form-data">
                        <input
                            type="file"
                            className="form-control-file mt-3"
                            name="product_pic"
                            // value={image}
                            onChange={onChangeImage}
                        />
                    </form>
                    {/* <input type="file" 
                    className="form-control-file"
                    value ={file}
                    onChange={onChangFile} 
                    /> */}
                </div>
                <div className="d-flex flex-row">
                    <div className="form-group mr-4">
                        <input type="submit" value="Save" className="btn btn-primary" />
                    </div>
                    <Link to="/" className="navbar-item text-light">
                        <button className="btn btn-danger form-group" >Cancel</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}
export default EditProduct
// export default class EditProduct extends Component {
//     constructor(props) {
//         super(props);

//         this.onChangeNameCategory = this.onChangeNameCategory.bind(this);
//         this.onChangeNameProduct = this.onChangeNameProduct.bind(this);
//         this.onChangePrice= this.onChangePrice.bind(this);
//         this.onChangeDiscount= this.onChangeDiscount.bind(this);
//         this.onChangeGuarantee= this.onChangeGuarantee.bind(this);
//         this.onChangeDescription = this.onChangeDescription.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);

//         this.state = {
//             namecategory: '',
//             nameproduct: '',
//             price : '',
//             discount : '',
//             guarantee : '',
//             description: '',
//             categories: []
//         }
//     }

//     componentDidMount() {
//         axios.get('/api/products/' + this.props.match.params.id)
//             .then(response => {
//                 this.setState({
//                     namecategory: response.data.namecategory,
//                     nameproduct: response.data.nameproduct,
//                     price :response.data.price,
//                     discount:response.data.discount,
//                     guarantee : response.data.guarantee,
//                     description: response.data.description,
//                 })
//             })
//             .catch(function (error) {
//                 console.log(error);
//             })

//         axios.get('/api/categories/')
//             .then(response => {
//                 this.setState({ categories: response.data.map(category => category.namecategory) });
//             })
//             .catch((error) => {
//                 console.log(error);
//             })
//     }

//     onChangeNameCategory(e) {
//         this.setState({
//             namecategory: e.target.value
//         });
//     }

//     onChangeNameProduct(e) {
//         this.setState({
//             nameproduct: e.target.value
//         });
//     }

//     onChangePrice(e){
//         this.setState({
//             price: e.target.value
//         });
//     }
//     onChangeDiscount(e){
//         this.setState({
//             discount: e.target.value
//         });
//     }
//     onChangeGuarantee(e){
//         this.setState({
//             guarantee: e.target.value
//         });
//     }

//     onChangeDescription(e) {
//         this.setState({
//             description: e.target.value
//         });
//     }

//     onSubmit(e) {
//         e.preventDefault();

//         const product = {
//             namecategory: this.state.namecategory,
//             nameproduct: this.state.nameproduct,
//             price : this.state.price,
//             discount : this.state.discount,
//             guarantee : this.state.guarantee,
//             description: this.state.description,
//         };

//         console.log(product);

//         axios.post('/api/products/update/' + this.props.match.params.id, product)
//             .then(res => console.log(res.data));

//         window.location = '/';
//     }

//     render() {
//         return (
//             <div>
//                 <h3>Edit Product Log</h3>
//                 <form onSubmit={this.onSubmit}>
//                     <div className="form-group">
//                         <label>Category </label>
//                         <select ref="categoryInput"
//                             className="form-control"
//                             value={this.state.namecategory}
//                             onChange={this.onChangeNameCategory}>
//                             {
//                                 this.state.categories.map(function (category) {
//                                     return <option
//                                         key={category}
//                                         value={category}>{category}
//                                     </option>;
//                                 })
//                             }
//                         </select>
//                     </div>
//                     <div className="form-group">
//                         <label>Name Product: </label>
//                         <input type="text"
//                             required
//                             className="form-control"
//                             value={this.state.nameproduct}
//                             onChange={this.onChangeNameProduct}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>Price : </label>
//                         <input type="text"
//                             required
//                             className="form-control"
//                             value={this.state.price}
//                             onChange={this.onChangePrice}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>Discount </label>
//                         <input type="text"
//                             required
//                             className="form-control"
//                             value={this.state.discount}
//                             onChange={this.onChangeDiscount}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>Guarantee : </label>
//                         <input type="text"
//                             required
//                             className="form-control"
//                             value={this.state.guarantee}
//                             onChange={this.onChangeGuarantee}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>Description: </label>
//                         <input type="text"
//                             className="form-control"
//                             value={this.state.description}
//                             onChange={this.onChangeDescription}
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