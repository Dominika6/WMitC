import React from "react";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const Input = ({
  name,
  handleChange,
  label,
  autoFocus,
  type,
  handleShowPassword,
}) => (
  <TextField
    name={name}
    onChange={handleChange}
    variant="outlined"
    required
    size="small"
    fullWidth
    label={label}
    autoFocus={autoFocus}
    type={type}
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
