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
  const [newUser, setNewUser] = useState("");
  // const [userAccess, setUserAccess] = useState("");
  const [searchBar, setSearchBar] = useState("");

  const onAddUser = (e) => {
    setNewUser((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
    console.log(setNewUser);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setTableData((pre) => {
      return [tableData, ...pre];
    });
    console.log(tableData);
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
          onChange={(e) => setSearchBar(e.target.value)}
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
          {tableData
            .filter(
              (item) => item.username.toLocaleLowerCase().includes(searchBar)
              // item.email.toLocaleLowerCase().includes(searchBar)
            )
            .map((item) => {
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
                        <Switch defaultChecked disabled={true} />
                      ) : (
                        <Switch defaultuUnChecked disabled={true} />
                      )}
                    </td>
                    {/* {currentUser.userAccess === "staff" ||
                  currentUser.userAccess === "manager" ? (
                    ""
                  ) : ( */}
                    <td className="restricted">
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
                    {/* )} */}
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
        value={newUser.username}
        onChange={onAddUser}
      />
      <input
        type="email"
        name="email"
        placeholder="Enter your Email"
        value={newUser.email}
        onChange={onAddUser}
      />
      <input
        type="number"
        name="age"
        placeholder="Enter your age"
        value={newUser.age}
        onChange={onAddUser}
      />
      <select value={newUser.userAccess} onChange={onAddUser}>
        <option value="" disable selected hidden>
          Select Your Rank
        </option>
        <option>Super Admin</option>
        <option>Admin</option>
        <option>Manager</option>
        <option>Staff</option>
      </select>
      <button onClick={submitHandler}>Add</button>
    </>
  );
};

export default DommyData;
