import { Box, Button, CircularProgress } from "@mui/material";
import useAxios from "axios-hooks";
import { useNavigate, useParams } from "react-router-dom";
import EditForm from "./EditForm";
import MessageContainer from "../home/MessageContainer";

const EditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [{ data, loading, error }, refetch] = useAxios(
    `${process.env.REACT_APP_SERVER_BASE_URL}/user/${id}`,
  );

  if (loading) {
    return (
      <MessageContainer>
        <CircularProgress />
      </MessageContainer>
    );
  }

  if (error) {
    return (
      <MessageContainer>
        <Box>Error loading user</Box>
        <Button variant="contained" onClick={() => refetch()}>
          Retry
        </Button>
      </MessageContainer>
    );
  }

  const handleOnSubmit = () => {
    navigate("/", { replace: true });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignitems: "center",
          gap: 1,
        }}
      >
        <h1>User page</h1>
        <EditForm user={data.user} onSubmit={handleOnSubmit} />
      </Box>
    </>
  );
};

export default EditUserPage;
