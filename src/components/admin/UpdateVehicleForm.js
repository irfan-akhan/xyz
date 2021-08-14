import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import styles from "../../styles/Admin.module.css";
const UpdateVehicleForm = ({ vehicle }) => {
  const updateVehicle = () => {};
  const [cars, setcars] = useState(vehicle.cars);
  return (
    <Grid item sm={8}>
      <div className={styles.vehicles}>
        <form>
          <h3>{vehicle.name}</h3>
          <input type="text" placeholder="Add Car" />
          <h3>Rate: {vehicle.rate}</h3>
          <input type="number" placeholder="Update Vehicle Rate" />
        </form>
        <div>
          {cars?.map((car) => {
            return <span>{car}</span>;
          })}
        </div>
        <div>
          <button onClick={updateVehicle}>Submit</button>
        </div>
      </div>
    </Grid>
  );
};

export default UpdateVehicleForm;
