import { Row, Col } from "reactstrap";
import io from "socket.io-client";
import "./Concert.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getSeats,
  loadSeatsRequest,
  loadSeats,
} from "../../../redux/seatsRedux";
import { useState, useEffect } from "react";

const Concert = ({ performer, price, genre, day, image }) => {
  const [socket, setSocket] = useState("");
  const dispatch = useDispatch();
  const seats = useSelector(getSeats);

  useEffect(() => {
    const newSocket = io(
      process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000/"
    );
    dispatch(loadSeatsRequest());
    newSocket.on("seatsUpdated", (seatsData) => dispatch(loadSeats(seatsData)));
    setSocket(newSocket);
  }, [dispatch]);

  const freeSeats = 50 - seats.filter((seat) => seat.day === day).length;

  return (
    <article className="concert">
      <Row noGutters>
        <Col xs="6">
          <div className="concert__image-container">
            <img
              className="concert__image-container__img"
              src={image}
              alt={performer}
            />
          </div>
        </Col>
        <Col xs="6">
          <div className="concert__info">
            <img className="concert__info__back" src={image} alt={performer} />
            <h2 className="concert__info__performer">{performer}</h2>
            <h3 className="concert__info__genre">{genre}</h3>
            {freeSeats === 1 && (
              <p className="concert__info__tickets">
                Only {freeSeats} ticket left
              </p>
            )}
            {freeSeats === 0 && (
              <p className="concert__info__tickets">SOLD OUT</p>
            )}
            {freeSeats > 1 && (
              <p className="concert__info__tickets">
                Only {freeSeats} tickets left
              </p>
            )}
            <p className="concert__info__day-n-price">
              Day: {day}, Price: {price}$
            </p>
          </div>
        </Col>
      </Row>
    </article>
  );
};

export default Concert;
