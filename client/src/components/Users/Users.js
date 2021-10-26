import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const process = async () => {
      const response = await fetch("http://localhost:5000/users");
      const data = await response.json();
      setUsers(data);
    };
    process();
  }, []);

  async function deleteUser(_id) {
    const response = await fetch(`http://localhost:5000/users/${_id}`, {
      method: "delete",
    });
    const data = await response.json();
    if (data.deletedCount > 0) {
      const remainingUsers = users.filter((user) => user._id !== _id);
      setUsers(remainingUsers);
    } else {
      alert("something went wrong!");
    }
  }

  return (
    <div>
      <h2>This is Users</h2>
      <h1>users: {users.length}</h1>
      <ul>
        {users?.map((user) => (
          <li key={user._id}>
            id:{user._id},name:{user.name}, age:{user.age}
            <button onClick={() => deleteUser(user._id)}>X</button>
            <Link to={`/users/update/${user._id}`}>
              <button>Edit</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
