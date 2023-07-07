import React, { useState } from "react";
import "./App.css";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import info from "./data/celebrities.json";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UserCards from "./components/UserCards";

function App() {
  const [expanded, setExpanded] = useState<string | false | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>(null);
  const [isSaveEnabled, setIsSaveEnabled] = useState<boolean>(false);
  const [originalData, setOriginalData] = useState<any>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [data, setData] = useState(info);
  const [searchText, setSearchText] = useState<string>("");

  const calculateAge = (dateOfBirth: string): number => {
    const dob = new Date(dateOfBirth);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - dob.getFullYear();

    const hasBirthdayOccurred =
      currentDate.getMonth() > dob.getMonth() ||
      (currentDate.getMonth() === dob.getMonth() &&
        currentDate.getDate() >= dob.getDate());

    if (!hasBirthdayOccurred) {
      age--;
    }

    return age;
  };

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      if (!editIndex) {
        setExpanded(newExpanded ? panel : false);
      }
    };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const filteredData = data.filter(
    (item: any) =>
      item.first.toLowerCase().includes(searchText.toLowerCase()) ||
      item.last.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (index: number) => {
    const userData = data[index];
    const adultAge = 18;
    const userAge = calculateAge(userData.dob);
    if (userAge >= adultAge) {
      setEditIndex(index);
      setEditData({ ...userData });
      setOriginalData({ ...userData });
    } else {
      toast.error("You can only edit celebrities who are adults.");
    }
  };

  const handleCountryChange = (value: string) => {
    if (value.match(/^[a-zA-Z\s]*$/)) {
      handleInputChange("country", value);
    }
  };

  const handleSave = () => {
    if (editIndex === null || editData === null) {
      return;
    }
    console.log("Saving user details:", editData);
    const updatedData = [...data];
    updatedData[editIndex] = { ...editData };
    toast.success("Updated Succesfully!");
    setData(updatedData);
    setEditIndex(null);
    setEditData(null);
    setOriginalData(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditData(null);
    if (originalData) {
      setEditData({ ...originalData });
    }
    setOriginalData(null);
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setEditData((prevState: any) => ({
      ...prevState,
      [fieldName]: value,
    }));
    setIsSaveEnabled(true);
  };

  const isFormValid = () => {
    if (
      !editData.first ||
      !editData.last ||
      !editData.gender ||
      !editData.country ||
      !editData.description
    ) {
      return false;
    }
    return true;
  };

  //Handling Delete
  const handleDelete = (id: number) => {
    setConfirmDelete(id);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting user with ID:", confirmDelete);
    const updatedData = data.filter((s: any, i: number) => i !== confirmDelete);
    setData(updatedData);
    toast.error("Deleted Succesfully!");

    setConfirmDelete(null);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(null);
  };

  return (
    <div className="App">
      <TextField
        label="Search"
        value={searchText}
        onChange={handleSearchChange}
        fullWidth
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          style: {
            borderRadius: "10px",
            marginBottom: "8px",
          },
        }}
        className="mb-4"
      />
      <UserCards
        filteredData={filteredData}
        expanded={expanded}
        editIndex={editIndex}
        editData={editData}
        calculateAge={calculateAge}
        handleCountryChange={handleCountryChange}
        handleCancel={handleCancel}
        isFormValid={isFormValid}
        isSaveEnabled={isSaveEnabled}
        handleSave={handleSave}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleChange={handleChange}
        handleInputChange={handleInputChange}
      />
      <Dialog
        open={confirmDelete !== null}
        onClose={handleCancelDelete}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">
          {" "}
          Are you sure you want to delete?
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={handleCancelDelete}
            variant="outlined"
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer autoClose={1000} />
    </div>
  );
}

export default App;
