import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import styles from '../../styles/Dashboard.module.css';
import AirportBookingForm from './AirportBookingForm';
import Modal from './Modal';

const PriorityPassBookings = () => {
	const [bookings, setBookings] = useState([]);
	useEffect(() => {
		fetch('https://shuttlelanee.herokuapp.com/api/booking/priority')
			.then((res) => res.json())
			.then((data) => {
				setBookings(data.data);
			})
			.catch((err) => console.log(err));
	}, []);
	console.log(bookings);
	const [editMode, setEditMode] = useState(false);
	const onClickHandler = () => {
		setEditMode(true);
	};
	return (
		<>
			{editMode && (
				<Modal
					isOpen={editMode}
					onCloseHandler={() => {
						setEditMode(false);
					}}
				>
					<AirportBookingForm />
				</Modal>
			)}

			<Grid item xs={12}>
				<main
					style={{
						width: '98%',
					}}
				>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'flex-end',
							marginBottom: '1rem',
						}}
					>
						<h3>Airport Bookings</h3>
						<button
							className={styles.button}
							onClick={onClickHandler}
						>
							Add Booking
						</button>
					</div>
					<table className={styles.table}>
						<thead>
							<tr className={styles.theading}>
								<th>#</th>
								<th>Booking reference</th>
								<th>Details</th>

								<th>Date & Time</th>
								<th>Contact</th>
								<th>Amount</th>
								<th>Payment </th>
								<th>Booking Date</th>
							</tr>
						</thead>
						<tbody className={styles.tableContent}>
							{bookings?.map((item, idx) => {
								return (
									<tr key={item.bookingReference}>
										<td
											style={{
												marginRight: '15px',
												paddingLeft: '5px',
												display: 'inline-block',
											}}
										>
											{++idx}
										</td>
										<td>{item.bookingReference}</td>
										<td>
											<p>
												<strong>Transfer Type: </strong>
												<u
													style={{
														fontStyle: 'italic',
														color: '#4D96FF',
													}}
												>
													{item.service}
												</u>
											</p>

											<p
												style={{
													width: '80%',
													height: 'fit-content',
												}}
											>
												<strong>Airport: </strong>{' '}
												{item?.airport}
											</p>
											<p>
												<strong>Flight Number: </strong>{' '}
												{item.flightNumber}
											</p>

											<p>
												<strong>Cabin Class: </strong>{' '}
												{item.cabinClass}
											</p>

											<p>
												<strong>Passengers: </strong>{' '}
												{item.passengers}
											</p>
										</td>

										<td>
											{item.date?.slice(0, 10)} <br /> &{' '}
											{item.time}
										</td>
										<td>
											<p>
												<span>{item.title}</span>{' '}
												<span>{item.firstName}</span>
												<span>{item.lastName}</span>
											</p>
											<p>{item.email}</p>
											<p>
												<span>+{item.countryCode}</span>
												<span>{item.mobile}</span>
											</p>
										</td>
										<td>
											NGN <br />
											{item.amount}
										</td>
										<td>{item.paymentStatus}</td>
										<td>
											{item.createdAt.slice(0, 10)} <br />
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</main>
			</Grid>
		</>
	);
};

export default PriorityPassBookings;
