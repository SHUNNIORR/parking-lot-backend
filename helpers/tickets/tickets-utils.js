function calculateParkingFee(typeOfVehicle,startDate, endDate) {
    const halfHourCost=0; // Cost per half hour
    if(typeOfVehicle ==='MOTORCYCLE'){
        halfHourCost = 700;
    }else if(typeOfVehicle ==='CAR'){
        halfHourCost = 1500;
    }
    const millisecondsPerHalfHour = 30 * 60 * 1000; // 30 minutes in milliseconds

    // Convert strings to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = end - start;

    // Calculate the number of half hours
    const numberOfHalfHours = Math.ceil(differenceInMilliseconds / millisecondsPerHalfHour);

    // Calculate the total cost
    const totalCost = numberOfHalfHours * halfHourCost;

    return totalCost;
}

module.exports = calculateParkingFee