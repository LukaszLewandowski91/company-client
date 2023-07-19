import { useDispatch, useSelector } from "react-redux";
import { Alert, Container } from "reactstrap";
import { getConcerts, loadConcertsRequest } from "../../../redux/concertsRedux";
import { useEffect } from "react";

const Prices = () => {
  const dispatch = useDispatch();
  const concerts = useSelector(getConcerts);

  useEffect(() => {
    dispatch(loadConcertsRequest());
  }, [dispatch]);

  const dayNumber = (day) => {
    if (day === 1) return "One";
    else if (day === 2) return "Two";
    return "Three";
  };

  const prepareWorkshop = (data) => {
    let i = 1;
    let workshops = "";
    for (let work of data) {
      i !== data.length
        ? (workshops = workshops + `${work.name}, `)
        : (workshops = workshops + `${work.name}`);

      i++;
    }
    return workshops;
  };

  return (
    <Container>
      <h1>Prices</h1>
      <p>
        Prices may differ according the day of the festival. Remember that
        ticket includes not only the star performance, but also 10+ workshops.
        We gathered several genre teachers to help you increase your vocal
        skills, as well as self confidence.
      </p>

      <Alert color="info">
        Attention!{" "}
        <strong>
          Children under 4 can go freely with you without any other fee!
        </strong>
      </Alert>

      {concerts.map((con) => (
        <div key={con._id}>
          <h2>Day {dayNumber(con.day)}</h2>
          <p>Price: {con.price}</p>
          <p>
            Workshops:
            <span> {prepareWorkshop(con.workshops)}</span>
          </p>
        </div>
      ))}
    </Container>
  );
};
export default Prices;
