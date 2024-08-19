import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, setSelectedUser, selectUsers, selectLoading } from "../redux/reducers/userSlice";
import { Link, Outlet } from "react-router-dom";
import { AppDispatch } from "../redux/store";


const Users = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectUsers);
  const loading = useSelector(selectLoading);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleUserDetails = (user: any) => {
    dispatch(setSelectedUser(user));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

 
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  return (
    <div className="container py-5">
      <div className="row">
        <h3 className="mb-5">List of Available Users</h3>
        {loading && <p>Loading...</p>}
          <div className="col-md-8 border-end pe-3">
            <input type="text" onChange={handleSearch} className="form-control mb-3 py-2 shadow-none"/>
        <div className="row">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((val: any) => (
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
