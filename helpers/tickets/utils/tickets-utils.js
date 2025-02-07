function calculateParkingFee(typeOfVehicle, startDate, endDate) {
  console.log("typeOfVehicle", typeOfVehicle);
  let halfHourCost = 0; // Cost per half hour
  if (typeOfVehicle === "MOTORCYCLE") {
    halfHourCost = 700;
  } else if (typeOfVehicle === "CAR") {
    halfHourCost = 1500;
  }
  const millisecondsPerHalfHour = 30 * 60 * 1000; // 30 minutes in milliseconds

  // Convert strings to Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = end - start;

  // Calculate the number of half hours
  const numberOfHalfHours = Math.ceil(
    differenceInMilliseconds / millisecondsPerHalfHour
  );
  console.log("hora", start.toLocaleString())
  console.log("numberOfHalfHours", numberOfHalfHours);
  // Calculate the total cost
  const totalCost = numberOfHalfHours * halfHourCost;

  return totalCost;
}

function mappedTickets(tickets) {
  return tickets.map((ticket) => {
    const arrivalTime = ticket.arrivalTime
      ? new Date(ticket.arrivalTime)
      : null;
    const departureTime = ticket.departureTime
      ? new Date(ticket.departureTime)
      : null;

    // Formatear solo si las fechas son válidas
    const formattedArrivalTime =
      arrivalTime instanceof Date && !isNaN(arrivalTime)
        ? new Intl.DateTimeFormat("es-ES", {
            dateStyle: "short",
            timeStyle: "medium",
          }).format(arrivalTime)
        : null;

    const formattedDepartureTime =
      departureTime instanceof Date && !isNaN(departureTime)
        ? new Intl.DateTimeFormat("es-ES", {
            dateStyle: "short",
            timeStyle: "medium",
          }).format(departureTime)
        : null;

    return {
      plate: ticket.plate,
      vehicle: ticket.typeOfVehicle.type,
      arrivalTime: formattedArrivalTime,
      departureTime: formattedDepartureTime,
      fee: ticket.fee,
      id: ticket.uid, // `uid` mapeado a `id`
    };
  });
}

module.exports = { calculateParkingFee, mappedTickets };
