import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { User } from "../../models/User";
import { formatDate } from "../../utils/formatDate";

const TableHeaderCell = (props: Record<any, any>) => (
  <TableCell
    sx={{
      fontWeight: "bold",
    }}
    {...props}
  />
);

type Props = {
  users: User[];
};

const renderUserTableRow = (user: User) => {

  const userBirthdayFormatted = formatDate(user.birthday);

  return (
    <TableRow
      key={user.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {`${user.firstName} ${user.lastName}`}
      </TableCell>
      <TableCell align="left">{user.email}</TableCell>
      <TableCell align="left">{user.birthday ? userBirthdayFormatted : ""}</TableCell>
    </TableRow>
  )
}

const UsersTable = ({ users }: Props) => (
  <TableContainer component={Paper}>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell align="left">Email</TableHeaderCell>
          <TableHeaderCell align="left">Birthday</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => renderUserTableRow(user))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default UsersTable;
