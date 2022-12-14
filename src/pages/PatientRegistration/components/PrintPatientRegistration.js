import React, { useRef, useEffect } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Divider,
} from "@material-ui/core";

export default function PrintPatientRegistration({ data }) {
  const [open, setOpen] = React.useState(true);
  const history = useHistory();
  const ref = useRef();
  const imageRef = React.useRef();
  const [back, setBack] = React.useState("#FFFFFF");
  const [fore, setFore] = React.useState("#000000");
  const [size, setSize] = React.useState(200);

  //const [photoBlob, setPhotoBlob] = React.useState("");
  const { appointmentData, visitData, abhaData, qrData } = data;
  const { healthIdNumber, healthId, photoBlob } = abhaData;
  const {
    display: patientName,
    gender,
    birthdate,
  } = appointmentData.patient.person;
  const { startDate, endDate, provider, location, types } =
    appointmentData.timeSlot.appointmentBlock;

  const { startdatetime } = visitData;

  const handlePrint = useReactToPrint({
    content: () => ref.current,
    onAfterPrint: () => handleClose(),
  });

  const handleClose = () => {
    setOpen(false);
    history.push({ pathname: "/app/patient-search" });
  };

  const getGenderString = (gender) => {
    if (gender === "M") return "Male";
    if (gender === "F") return "Female";
    if (gender === "O") return "Others";
  };

  const getAge = (birthdate) => {
    let difference = moment.duration(moment().diff(birthdate));
    if (difference.years() >= 1) return `${difference.years()} year(s)`;
    if (difference.months() >= 1) return `${difference.months()} month(s)`;
    if (difference.weeks() >= 1) return `${difference.weeks()} week(s)`;
    if (difference.days() >= 1) return `${difference.days()} day(s)`;
  };
  const getfilterhtml = (param) => {
    if (param === null || param === "") return false;
    else param = param.toString();

    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    return param.replace(/(<([^>]+)>)/gi, "");
  };
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">
        Patient Registered Successfully
      </DialogTitle>
      <DialogContent dividers ref={ref}>
        <Table>
          <TableBody>
            {photoBlob !== "" && (
              <>
                <TableRow>
                  <TableCell colSpan={4}>
                    <img
                      alt="A"
                      src={photoBlob}
                      ref={imageRef}
                      id="myImg"
                      width="600"
                      height="300"
                      rounded
                    />
                  </TableCell>
                </TableRow>
                <Divider />
              </>
            )}
            <TableRow>
              <TableCell>
                <Typography>UHID</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">
                  {appointmentData.patient.display.split(" ")[0]}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>REGISTRATION DATE</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">
                  {moment(startdatetime).format("DD/MM/yyyy (hh:mm a)")}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography>PATIENT'S NAME</Typography>
              </TableCell>
              <TableCell colSpan={3}>
                <Typography variant="h6">
                  {getfilterhtml(patientName)}
                </Typography>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography>ABHA Address</Typography>
              </TableCell>
              <TableCell>
                <Typography>{healthId}</Typography>
              </TableCell>
              <TableCell>
                <Typography>ABHA Number</Typography>
              </TableCell>
              <TableCell>
                <Typography>{healthIdNumber}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography>GENDER</Typography>
              </TableCell>
              <TableCell>
                <Typography>{getGenderString(gender)}</Typography>
              </TableCell>
              <TableCell>
                <Typography>AGE</Typography>
              </TableCell>
              <TableCell>
                <Typography>{getAge(birthdate)}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography>DEPARTMENT NAME</Typography>
              </TableCell>
              <TableCell>
                <Typography>{types[0].display}</Typography>
              </TableCell>
              <TableCell>
                <Typography>REPORTING PLACE</Typography>
              </TableCell>
              <TableCell>
                <Typography>{location.display}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography>DOCTOR NAME</Typography>
              </TableCell>
              <TableCell>
                <Typography>{provider.person.display}</Typography>
              </TableCell>
              <TableCell>
                <Typography>REPORTING TIME</Typography>
              </TableCell>
              <TableCell>
                <Typography>{`${moment(startDate).format(
                  "hh:mm a"
                )} to ${moment(endDate).format("hh:mm a")}`}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handlePrint} variant="contained" color="primary">
          Print
        </Button>
      </DialogActions>
    </Dialog>
  );
}
