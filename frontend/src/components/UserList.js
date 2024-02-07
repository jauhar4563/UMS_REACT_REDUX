
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  getAllUsers,reset,UserBlock, editUser} from '../features/adminAuth/adminAuthSlice';
import Swal from 'sweetalert2';


function UserList() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.adminAuth.users);
  const isLoading = useSelector((state) => state.adminAuth.isLoading);

  useEffect(() => {
    dispatch(getAllUsers());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleBlock = (userId) => {
    if (window.confirm("Are you sure want to block the user?")) {
      dispatch(UserBlock(userId));
    }
  };

  const handleEdit = (userId, name, email) => {
    Swal.fire({
      title: 'Edit User',
      html: `
        <input id="swal-input-name" class="swal2-input" value="${name}">
        <input id="swal-input-email" class="swal2-input" value="${email}">
      `,
      showCancelButton: true,
      confirmButtonText: 'Save',
      preConfirm: () => {
        const newName = document.getElementById('swal-input-name').value;
        const newEmail = document.getElementById('swal-input-email').value;
        if (!newName || !newEmail) {
          Swal.showValidationMessage('Name and email are required');
          return false;
        }
        dispatch(editUser({ userId, name: newName, email: newEmail }));
      }
    });
  };
  
 
  return (
    <div className="user-list">

      
       {isLoading && <p>Loading...</p>}
      {users && users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {/* <img src={`user_photo${index + 1}.jpg`} alt="User Photo" /> */}
                  <img src={user?.profileUrl ? user.profileUrl :  "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg"} alt="profile"  />

                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isBlock ? "Blocked" : "Unblocked"}</td>
                <td className="action-buttons">
                  <div className="table-button">
                  <button onClick={() => handleBlock(user._id)}  className="btn">{user.isBlock ? "Unblock" : "Block"}</button>
                  <button  onClick={() => handleEdit(user._id, user.name, user.email)} className="btn-1">Edit</button>

                  </div>
               
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users available</p>
      )}
    </div>
  );
  
}

export default UserList;