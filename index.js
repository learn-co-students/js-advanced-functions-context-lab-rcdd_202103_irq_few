/* Your Code Here */


let createEmployeeRecord = (arr) => {
    let employee = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employee;
}

let createEmployeeRecords = (arr) => {
    return arr.map(function(employee) {
        return createEmployeeRecord(employee);
    })
}

let createTimeInEvent = function(dateStamp) {
    let newEvent = {
        type: "TimeIn",
        date: dateStamp.split(' ')[0],
        hour: parseInt(dateStamp.split(' ')[1])
    };
    this.timeInEvents.push(newEvent);
    return this;
}

let createTimeOutEvent = function(dateStamp) {
    let newEvent = {
        type: "TimeOut",
        date: dateStamp.split(' ')[0],
        hour: parseInt(dateStamp.split(' ')[1])
    };
    this.timeOutEvents.push(newEvent);
    return this;
}

const hoursWorkedOnDate = function(date) {
    let timeInEvent = this.timeInEvents.find(e => e.date === date)
    let hourIn = timeInEvent.hour
    let timeOutEvent = this.timeOutEvents.find(e => e.date === date)
    let hourOut = timeOutEvent.hour
    return parseInt((hourOut - hourIn)/100);
}

const wagesEarnedOnDate = function(date) {
    return parseInt(hoursWorkedOnDate.call(this, date) * this.payPerHour);
}

const findEmployeeByFirstName = (srcArray, firstName) => {
    return srcArray.find(employee => employee.firstName === firstName);
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}