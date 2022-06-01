import React from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";

const Input = ({ name, handleChange, type, handleShowPassword }) => (
  <TextField
    name={name}
    onChange={handleChange}
    variant="outlined"
    required
    size="small"
    fullWidth
    type={type}
    // widoczność hasła w inputach 'password'
    InputProps={
      name === "password"
        ? {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                  {type === "password" ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }
        : null
    }
  />
);

export default Input;
