// import React, { useState } from 'react';
// import axios from 'axios';
// import { useHistory } from 'react-router-dom';
// import Login from './Login.component';

// const Logout = (props) => {
//     let history = useHistory();
//     axios.post('/api/users/logout/')
//             .then(res => {
//                 console.log(res.data);
//                 history.push('/login/');
//             })
//             .catch(() => {
//                 alert('Login fail')
//             }
//             )
//     return (
//         <Login />
        
//     );
// }
// export default Logout;