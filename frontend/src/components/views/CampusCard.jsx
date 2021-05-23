import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    backgroundColor: '#C0C0C0',
  },
});


const CampusCard = ({ campus }) => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <img src={campus.imageUrl} width="100%" alt={campus.name} />
          <Link to={`/campus/${campus.id}`}>
            <h1>{campus.name}</h1>
          </Link>
        {/* <div className="stud">
            {this.props.numOfStudents} Students
        </div> */}
        </CardContent>
      </Card>
    </>
  );
};

export default CampusCard;
