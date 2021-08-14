import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Grid } from "@material-ui/core";

import AirportTransferBooking from "../../components/admin/AirportTransferBooking";
import SuccessfullPayments from "../../components/admin/SuccessfullPayments";
import PriorityPassBookings from "../../components/admin/PriorityPassBookings";
import CarBooking from "../../components/admin/CarBooking";
import Overview from "../../components/admin/Overview";
import AdminAside from "../../components/admin/AdminAside";
import User from "../../components/admin/User";
import Vehicles from "../../components/admin/Vehicles";
import ExchangeRates from "../../components/admin/ExchangeRates";
import HotelBookings from "../../components/admin/HotelBookings";
import FleetManagementBooking from "../../components/admin/FleetManagementBooking";

import styles from "../../styles/Dashboard.module.css";

const dashboard = () => {
  const [state, setState] = useState("Overview");
  const [airportBookings, setAirportBookings] = useState([]);
  const [carBookings, setCarBookings] = useState([]);
  const [hotelBookings, setHotelBookings] = useState([]);
  const [priorityBookings, setPriorityBookings] = useState([]);

  const onStateChange = (value) => {
    console.log("value", value);
    setState(value);
  };
  useEffect(() => {
    // Airport Bookings
    fetch("https://shuttlelanee.herokuapp.com/api/booking/airport")
      .then((res) => res.json())
      .then((data) => {
        {
          console.log("IN DASH", data);
          setAirportBookings(data.data);
        }
      })
      .catch((err) => console.log(err));

    // Car Bookings
    fetch("https://shuttlelanee.herokuapp.com/api/booking/car")
      .then((res) => res.json())
      .then((data) => {
        {
          console.log("IN car DASh", data.data);
          setCarBookings(data.data);
        }
      })
      .catch((err) => console.log(err));

    // Hotel Bookings
    fetch("https://shuttlelanee.herokuapp.com/api/booking/hotel")
      .then((res) => res.json())
      .then((data) => {
        {
          console.log("IN hotel DASh", data.data);
          setHotelBookings(data.data);
        }
      })
      .catch((err) => console.log(err));

    // Priority Pass Bookings
    fetch("https://shuttlelanee.herokuapp.com/api/booking/priority")
      .then((res) => res.json())
      .then((data) => {
        {
          console.log("IN priorty DASh", data.data);
          setPriorityBookings(data.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="flex-start"
      className={styles.container}
    >
      <Grid item sm={2}>
        <AdminAside onStateChange={onStateChange} />
      </Grid>
      <Grid item container justifyContent="space-evenly" sm={10}>
        {state == "Overview" ? (
          <Overview
            bookings={airportBookings}
            carBooking={carBookings}
            hotelBookings={hotelBookings}
            priorityBookings={priorityBookings}
          />
        ) : state.includes("Car") ? (
          <CarBooking />
        ) : state.includes("Airport") ? (
          <AirportTransferBooking />
        ) : state.includes("Priority") ? (
          <PriorityPassBookings />
        ) : state.includes("Vehicles") ? (
          <Vehicles />
        ) : state.includes("Fleet") ? (
          <User />
        ) : state.includes("Fleet") ? (
          <FleetManagementBooking />
        ) : state.includes("Rates") ? (
          <ExchangeRates />
        ) : state.includes("Hotel") ? (
          <HotelBookings />
        ) : (
          <div>Loading..!</div>
        )}
      </Grid>
    </Grid>
  );
};

export default dashboard;
