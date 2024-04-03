import { FieldValues, useForm } from "react-hook-form";
import { User } from "../../models/User";
import useAxios from "axios-hooks";
import { Alert, Box, Button, TextField } from "@mui/material";

interface Props {
  user: User;
  onSubmit: () => void;
}

const EditForm = ({ user, onSubmit }: Props) => {

  const { register, handleSubmit } = useForm<User>({
    values: user,
  });

  const [{ loading, error }, executePut] = useAxios(
    {
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/user/${user.id}`,
      method: "PUT",
    },
    { manual: true },
  );

  const onFormSubmit = async (data: FieldValues) => {
    const response = await executePut({ data });

    if (response?.data?.rowsAffected) {
      onSubmit();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {error && (
            <Alert severity="error">
              Sorry - there was an error updating the user
            </Alert>
          )}
          <TextField
            label="First Name"
            variant="outlined"
            {...register("firstName")}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            {...register("lastName")}
          />
          <TextField label="Email" variant="outlined" {...register("email")} />
          <TextField type="date" label="Birthday" variant="outlined" {...register("birthday")} />
          <Button variant="contained" type="submit" disabled={loading}>
            Update User
          </Button>
        </Box>
      </form>
    </>
  );
}

export default EditForm;
