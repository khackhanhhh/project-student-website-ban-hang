import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const CreateCategory = (props) => {
    const [name, setName] = useState('');
    let history = useHistory();

    const onChangeName = (e) => {
        setName(
            e.target.value
        );
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const category = {
            name
        }
        axios.post('/api/categories/add', category)
            .then(res => {
                console.log(res.data);
        history.push('/categorylist/');
            });
    }
    return (
        <div className=" mt-3">
            <h3>Create New Category</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Category Name: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={name}
                        onChange={onChangeName}
                    />
                </div>

                <div className="d-flex">
                    <div className="form-group mr-4">
                        <input type="submit" value="Create Category" className="btn btn-primary" />
                    </div>
                    
                        <Link to="/categorylist" className="navbar-item text-light">
                            <button className="btn btn-danger form-group" >Cancel</button>
                        </Link>
                    
                </div>
            </form>
        </div>
    )
}
export default CreateCategory;
// export default class CreateCategory extends Component {
//     constructor(props) {
//         super(props);
//         this.onChangeNameCategory = this.onChangeNameCategory.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);
//         this.state = {
//             namecategory: ''
//         };
//     }
//     onChangeNameCategory(e) {
//         this.setState({
//             namecategory: e.target.value
//         });
//     }
//     onSubmit(e) {
//         e.preventDefault();
//         const newCategory = {
//             namecategory: this.state.namecategory,
//         };
//         console.log(newCategory);

//         axios.post('/api/categories/add', newCategory)
//   .then(res => console.log(res.data));

//         this.setState({
//             namecategory: ''
//         })
//     }

//     render() {
//         return (
//             <div>
//                 <h3>Create New Category</h3>
//                 <form onSubmit={this.onSubmit}>
//                     <div className="form-group">
//                         <label>Category Name: </label>
//                         <input type="text"
//                             required
//                             className="form-control"
//                             value={this.state.namecategory}
//                             onChange={this.onChangeNameCategory}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <input type="submit" value="Create Category" className="btn btn-primary" />
//                     </div>
//                 </form>
//             </div>
//         )
//     }
// }