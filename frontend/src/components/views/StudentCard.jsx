import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    backgroundColor: '#C0C0C0',
  },
});


const StudentCard = ({ student }) => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <img src={student.imageUrl} width="100%" alt={student.firstname} />
          <Link to={`/student/${student.id}`}>
            <h1>{student.firstname} {student.lastname}</h1>
          </Link>
          {student.campus
           ? <Link to={`/campus/${student.campus.id}`}>
               <p>{student.campus.name}</p>
             </Link>
           : <p> No Campus </p>
          }
        </CardContent>
      </Card>
    </>
  );
};

export default StudentCard;
