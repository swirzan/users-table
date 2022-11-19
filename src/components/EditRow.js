import React from "react";

const EditRow = (props) => {
  const editItemId = props.editItemId;
  const setEditItemId = props.setEditItemId;
  const tableData = props.tableData;
  const setTableData = props.setTableData;
  const setEditing = props.setEditing;
  console.log(editItemId);

  const changeHandler = (e) => {
    setEditItemId((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
    console.log(setEditItemId);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const updatedData = tableData.map((item) =>
      item.id === editItemId.id ? { ...tableData, ...editItemId } : item
    );
    setTableData(updatedData);
    setEditing(false);
  };

  return (
    <form>
      <input
        type="text"
        name="username"
        value={editItemId.username}
        onChange={changeHandler}
      />

      <input
        type="email"
        name="email"
        value={editItemId.email}
        onChange={changeHandler}
      />

      <input
        type="number"
        name="age"
        value={editItemId.age}
        onChange={changeHandler}
      />
      <button onClick={submitHandler}>Update</button>
      <button>Cancel</button>
    </form>
  );
};

export default EditRow;
