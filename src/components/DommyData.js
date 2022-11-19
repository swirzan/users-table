import React, { useState } from "react";
import EditRow from "./EditRow";
import { Switch, Input } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { dommyData } from "./TableData";
const { Search } = Input;

const DommyData = () => {
  const [tableData, setTableData] = useState(dommyData);
  const [editItemId, setEditItemId] = useState("");
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [userAccess, setuserAccess] = useState("");

  const onAddUsername = (e) => {
    setUsername(e.target.value);
  };
  const onAddUserAge = (e) => {
    setAge(e.target.value);
  };
  const onAddUserEmail = (e) => {
    setEmail(e.target.value);
  };
  const onAddUserAccess = (e) => {
    setuserAccess(e.target.value);
  };

  const addUserHandler = (event) => {
    const newUser = {
      id: new Date().getTime(),
      username: username,
      age: age,
      email: email,
      userAccess: userAccess,
    };
    setTableData((pre) => {
      return [...pre, newUser];
    });
    setUsername("");
    setAge("");
    setEmail("");
  };

  const deleteHandler = (id) => {
    const updatedList = [...tableData].filter((item) => item.id !== id);
    setTableData(updatedList);
  };

  const editHandler = (id) => {
    let editedRow = tableData.find((item) => {
      return item.id === id;
    });
    setEditItemId(editedRow);
    setEditing(true);
  };
  const currentUser = {
    userAccess: "admin",
  };

  return (
    <>
      {editing && (
        <EditRow
          editItemId={editItemId}
          setEditItemId={setEditItemId}
          tableData={tableData}
          setTableData={setTableData}
        />
      )}
      <div>
        <Search
          style={{
            width: 300,
            float: "right",
            marginRight: "340px",
          }}
          placeholder="Search"
          enterButton
        />
        <br />
        <br />
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Age</th>
              <th>User Access</th>
              <th>Account Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          {tableData.map((item) => {
            return (
              <tbody key={item.id}>
                <tr>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.age}</td>
                  <td
                    className={
                      item.userAccess.toLocaleLowerCase() === "super admin"
                        ? "superAdminColor"
                        : item.userAccess.toLocaleLowerCase() === "admin"
                        ? "adminColor"
                        : item.userAccess.toLocaleLowerCase() === "manager"
                        ? "managerColor"
                        : item.userAccess.toLocaleLowerCase() === "staff"
                        ? "staffColor"
                        : ""
                    }
                  >
                    {item.userAccess}
                  </td>
                  <td>
                    {item.accountStatus ? (
                      <Switch defaultChecked />
                    ) : (
                      <Switch defaultuUnChecked />
                    )}
                  </td>
                  {currentUser.userAccess === "staff" ||
                  currentUser.userAccess === "manager" ? (
                    ""
                  ) : (
                    <td>
                      <EditOutlined
                        style={{ marginRight: "15px" }}
                        onClick={() => {
                          editHandler(item.id);
                          setEditing(true);
                        }}
                      />
                      <DeleteOutlined
                        style={{ color: "red" }}
                        onClick={() => {
                          deleteHandler(item.id);
                        }}
                      />
                    </td>
                  )}
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
      <h3>Add New User</h3>
      <input
        type="text"
        name="username"
        placeholder="Enter your Name"
        value={username}
        onChange={onAddUsername}
      />
      <input
        type="email"
        name="email"
        placeholder="Enter your Email"
        value={email}
        onChange={onAddUserEmail}
      />
      <input
        type="number"
        name="age"
        placeholder="Enter your age"
        value={age}
        onChange={onAddUserAge}
      />
      {/* <input
        type="text"
        name="userAccess"
        placeholder="Selete your user access"
        value={userAccess}
        onChange={onAddUserAccess}
      /> */}
      <select value={userAccess} onChange={onAddUserAccess}>
        <option value="" disable selected hidden>
          Select Your Rank
        </option>
        <option>Super Admin</option>
        <option>Admin</option>
        <option>Manager</option>
        <option>Staff</option>
      </select>
      <button
        onClick={() => {
          addUserHandler();
        }}
      >
        Add
      </button>
    </>
  );
};

export default DommyData;
