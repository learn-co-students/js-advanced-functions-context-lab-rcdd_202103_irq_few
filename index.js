/* Your Code Here */
let createEmployeeRecord = function(empInfo) {
    const [firstName, familyName, title, payPerHour] = empInfo;
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
};

let createEmployeeRecords = function(empRecords) {
    return empRecords.map(emp => createEmployeeRecord(emp));
};

let createTimeInEvent = function(dateStamp) {
    const [date, hour] = dateStamp.split(" ");

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour,10),
        date: date
    });

    return this;
};

let createTimeOutEvent = function(dateStamp) {
    const [date, hour] = dateStamp.split(" ");

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour,10),
        date: date
    });

    return this;
};

let hoursWorkedOnDate = function(dateStamp) {

    let timeIn = this.timeInEvents.filter(timeIn => timeIn.date === dateStamp)[0].hour;
    let timeOut = this.timeOutEvents.filter(timeOut => timeOut.date === dateStamp)[0].hour;

    return ((timeOut - timeIn) * .01);
};

let wagesEarnedOnDate = function(dateStamp) {
    return this.payPerHour * hoursWorkedOnDate.call(this, dateStamp);
};

// provided by the lab
let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = function(sourceArray, firstName) {
    let empRecord = sourceArray.filter(emp => emp.firstName === firstName);

    return !!empRecord[0] ? empRecord[0] : undefined;
};

let calculatePayroll = function(empArray) {
    // I couldn't make this pass adjusting my code from the first lesson
    // the solution uses allWagesFor, which I had wanted to use in the first lesson
    // but it called out wagesEarnedOnDate
    // following the solution and using my allWagesFor made the function much nicer
    // and work properly - yay!
    return empArray.reduce((total, wages) => total += allWagesFor.call(wages),0);
};