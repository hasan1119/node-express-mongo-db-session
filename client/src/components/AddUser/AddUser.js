import React, { useRef } from "react";

const AddUser = () => {
  const nameRef = useRef();
  const ageRef = useRef();

  async function addUser(e) {
    e.preventDefault();
    const name = nameRef.current.value;
    const age = ageRef.current.value;
    const user = { name, age };

    nameRef.current.value = "";
    ageRef.current.value = "";

    const response = await fetch("http://localhost:5000/users/add", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    alert(data);
  }

  return (
    <div>
      <h2>Please Add an User</h2>
      <form onSubmit={addUser}>
        <input ref={nameRef} placeholder="name" type="text" />
        <input ref={ageRef} placeholder="age" type="text" />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};

export default AddUser;
