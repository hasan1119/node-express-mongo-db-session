import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const UpdateUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  function nameHandler(e) {
    const name = e.target.value;
    const modifiedUser = { id: id, name: name, age: user.age };
    setUser(modifiedUser);
  }

  function ageHandler(e) {
    const age = e.target.value;
    const modifiedUser = { id: id, name: user.name, age: age };
    setUser(modifiedUser);
  }
  function updateUser(e) {
    fetch("http://localhost:5000/update", {
      method: "put",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => alert(data));
    e.preventDefault();
  }
  return (
    <div>
      <h2>This is Update User</h2>
      <form onSubmit={updateUser}>
        <input onChange={nameHandler} value={user.name} type="text" />
        <input onChange={ageHandler} value={user.age} type="text" />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateUser;
