import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useGlobalState, GlobalStateInterface } from "./GlobalStateProvider";
import { PageContainer } from "./PageContainer";
import { Box, Button, TextField } from "@material-ui/core";

const PageOne = () => {
  const history = useHistory();
  const { handleSubmit, register } = useForm();
  const { setState } = useGlobalState();

  const submitFunction = (data: Partial<GlobalStateInterface>) => {
    setState((prev) => ({ ...prev, ...data }));
    history.push("/two");
  };

  return (
    <PageContainer>
      <h1>PAGE ONE</h1>

      <form onSubmit={handleSubmit(submitFunction)}>
        <Box mb={1}>
          <TextField
            autoComplete="firstname"
            name="firstname"
            label="First name"
            variant="outlined"
            type="text"
            inputRef={register}
            InputLabelProps={{ htmlFor: "firstname" }}
            inputProps={{ id: "firstname" }}
          />
        </Box>
        <Box mb={1}>
          <TextField
            autoComplete="lastname"
            name="lastname"
            label="Lastname"
            variant="outlined"
            type="text"
            inputRef={register}
            InputLabelProps={{ htmlFor: "lastname" }}
            inputProps={{ id: "lastname" }}
          />
        </Box>
        <Box mb={1}>
          <TextField
            autoComplete="age"
            name="age"
            label="Age"
            variant="outlined"
            type="number"
            inputRef={register}
            InputLabelProps={{ htmlFor: "age" }}
            inputProps={{ id: "age" }}
          />
        </Box>
        <Button variant="contained" color="primary" type="submit">
          Next Page
        </Button>
      </form>
    </PageContainer>
  );
};

export default PageOne;
