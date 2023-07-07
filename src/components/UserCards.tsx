import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Avatar,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const UserCards = ({
  filteredData,
  expanded,
  editIndex,
  editData,
  calculateAge,
  handleCountryChange,
  handleCancel,
  isFormValid,
  isSaveEnabled,
  handleSave,
  handleDelete,
  handleEdit,
  handleChange,
  handleInputChange,
}: any) => {
  return (
    <div>
      {filteredData.map((s: any, i: number) => (
        <div className="mb-4" key={i}>
          <Accordion
            expanded={expanded === `panel${i}`}
            onChange={handleChange(`panel${i}`)}
            className="border border-gray-300 rounded"
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <div className="flex items-center">
                <Avatar alt={s.first} src={s.picture} className="w-10 h-10" />
                <div className="ml-4">
                  {editIndex === i ? (
                    <div className="flex flex-wrap">
                      <div className="w-1/2">
                        <TextField
                          label="First Name"
                          value={`${editData.first}`}
                          InputProps={{
                            style: {
                              borderRadius: "10px",
                              marginRight: "8px",
                            },
                          }}
                          className="xs:w-1/2"
                          size="small"
                          onChange={(e) =>
                            handleInputChange("first", e.target.value)
                          }
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                      <div className="w-1/2">
                        <TextField
                          label="Last Name"
                          value={`${editData.last}`}
                          InputProps={{
                            style: {
                              borderRadius: "10px",
                            },
                          }}
                          size="small"
                          onChange={(e) =>
                            handleInputChange("last", e.target.value)
                          }
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>
                  ) : (
                    <Typography className="text-xl">
                      {s.first} {s.last}
                    </Typography>
                  )}
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails
              className="flex flex-wrap"
              style={{ flexBasis: "100%" }}
            >
              <div className="w-1/3 md:pr-7 pr-2">
                {editIndex === i ? (
                  <TextField
                    label="Age"
                    type="text"
                    value={calculateAge(s.dob).toString()}
                    disabled
                    InputProps={{
                      style: {
                        borderRadius: "10px",
                      },
                    }}
                    size="small"
                  />
                ) : (
                  <>
                    <Typography className="text-gray-500">Age</Typography>
                    <Typography>{calculateAge(s.dob)} Years</Typography>
                  </>
                )}
              </div>
              <div className="w-1/3">
                {editIndex === i ? (
                  <FormControl>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                      label="Gender"
                      value={editData?.gender}
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
                      }
                      sx={{
                        borderRadius: "10px",
                      }}
                      size="small"
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="transgender">Transgender</MenuItem>
                      <MenuItem value="rather not say">Rather not say</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                ) : (
                  <>
                    <Typography className="text-gray-500">Gender</Typography>
                    <Typography>{s.gender}</Typography>
                  </>
                )}
              </div>
              <div className="w-1/3">
                {editIndex === i ? (
                  <TextField
                    label="Country"
                    value={editData?.country}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    error={!editData?.country.match(/^[a-zA-Z\s]*$/)}
                    helperText={
                      !editData?.country.match(/^[a-zA-Z\s]*$/) &&
                      "Please enter a valid country name"
                    }
                    InputProps={{
                      style: {
                        borderRadius: "10px",
                      },
                    }}
                    size="small"
                  />
                ) : (
                  <>
                    <Typography className="text-gray-500">Country</Typography>
                    <Typography>{s.country}</Typography>
                  </>
                )}
              </div>
              <div className="w-full mt-6">
                {editIndex === i ? (
                  <TextField
                    label="Description"
                    multiline
                    maxRows={4}
                    value={editData?.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    InputProps={{
                      style: {
                        borderRadius: "10px",
                      },
                    }}
                    size="small"
                    fullWidth
                  />
                ) : (
                  <>
                    <Typography className="text-gray-500">
                      Description
                    </Typography>
                    <Typography className="mt-2">{s.description}</Typography>
                  </>
                )}
              </div>
              <div className="w-full">
                {editIndex === i ? (
                  <div className="flex justify-end mt-2">
                    <IconButton
                      size="large"
                      color="error"
                      onClick={handleCancel}
                    >
                      <HighlightOffIcon />
                    </IconButton>
                    <IconButton
                      size="large"
                      color="primary"
                      disabled={!isSaveEnabled || !isFormValid()}
                      onClick={handleSave}
                    >
                      <CheckCircleOutlineIcon />
                    </IconButton>
                  </div>
                ) : (
                  <div className="flex justify-end mt-2">
                    <IconButton
                      size="large"
                      color="error"
                      onClick={() => handleDelete(i)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      size="large"
                      color="primary"
                      onClick={() => handleEdit(i)}
                    >
                      <EditIcon />
                    </IconButton>
                  </div>
                )}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
    </div>
  );
};

export default UserCards;
