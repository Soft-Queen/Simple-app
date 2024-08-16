import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, setSelectedUser, selectUsers, selectLoading } from "../redux/reducers/userSlice";
import { Link, Outlet } from "react-router-dom";
import { AppDispatch } from "../redux/store";


const Users = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectUsers);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleUserDetails = (user: any) => {
    dispatch(setSelectedUser(user));
  };

  return (
    <div className="container py-5">
      <div className="row">
        <h3 className="mb-5">List of Available Users</h3>
        {loading && <p>Loading...</p>}
          <div className="col-md-8 border-end pe-3">
        <div className="row">
          {users.length > 0 ? (
            users.map((val: any) => (
              <div className="col-md-4 mb-3" key={val.id}>
                <Link to={`details/${val.id}`} className="text-decoration-none">
                <div className="card p-4 h-100" onClick={() => handleUserDetails(val)}>
                  <span>{val.id}</span>
                  <p>{val.name}</p>
                  <p>{val.email}</p>
                  <p>{val.company.name}</p>
                
                    
                </div>
              </Link>
              </div>
            ))
          ) : (
            <div className="col-12">
              <p>No users found.</p>
            </div>
          )}
          </div>
        </div>
        <div className="col-md-4">
        <Outlet />
        </div>
      </div>
     
    </div>
  );
};

export default Users;
