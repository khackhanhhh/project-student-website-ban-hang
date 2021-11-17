import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Category = props => (
  <tr>
    <td>{props.category.name}</td>
    <td>
      <Link to={"/categories/edit/" + props.category._id}><EditIcon /></Link> | <a href="#" onClick={() => { props.deleteCategory(props.category._id) }}><DeleteIcon className="DeleteIcon" /></a>
    </td>
  </tr>
)

const CategoryList = (props) => {
  const [categories, setCategories] = useState([]);
  const [id, setId] = useState();
 
  useEffect(() => {
    axios.get('/api/categories')
      .then(response => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.log(error);
      })
  },[]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleDelete = () => {
    setOpen(false);

    axios.delete('/api/categories/' + id)
      .then(res => console.log(res.data));
    setCategories(
      categories.filter(el => el._id !== id)
    )
  };
  const deleteCategory = (id) => {
    setOpen(true);
    setId(id);
  }
  const categoryList = () => {
    return categories.map(currentcategory => {
      return <Category category={currentcategory} deleteCategory={deleteCategory} key={currentcategory._id} />;
    })
  }
  return (
    <div className=" mt-3">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure delete category ?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    
      <div className="d-flex justify-content-between ">
        <h3>List Category</h3>
        <Link to="/category" className="navbar-item text-light">
          <button className="btn btn-success mb-2 mr-3 ">Add</button>
        </Link>

      </div>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Category</th>
            <th>Actions</th>
          </tr>

        </thead>
        <tbody>
          {categoryList()}
        </tbody>
      </table>
    </div>
  );
}
export default CategoryList;
// export default class CategoryList extends Component {
//   constructor(props) {
//     super(props);
//     this.deleteCategory = this.deleteCategory.bind(this);
//     this.state = { categories: [] };
//   }
//   componentDidMount() {
//     axios.get('/api/categories')
//       .then(response => {
//         this.setState({ categories: response.data });
//       })
//       .catch((error) => {
//         console.log(error);
//       })
//   }
//   deleteCategory(id) {
//     axios.delete('/api/categories/' + id)
//       .then(res => console.log(res.data));
//     this.setState({
//       categories: this.state.categories.filter(el => el._id !== id)
//     })
//   }
//   categoryList() {
//     return this.state.categories.map(currentcategory => {
//       return <Category category={currentcategory} deleteCategory={this.deleteCategory} key={currentcategory._id}/>;
//     })
//   }
//   render() {
//     return (
//       <div>
//         <h3>List Category</h3>
//         <table className="table">
//           <thead className="thead-light">
//             <tr>
//               <th>Category</th>
//               <th>Actions</th>
//             </tr>

//           </thead>
//           <tbody>
//             {this.categoryList()}
//           </tbody>
//         </table>
//       </div>

//     )
//   }
// }