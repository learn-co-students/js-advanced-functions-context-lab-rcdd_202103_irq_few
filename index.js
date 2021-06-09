/* Your Code Here */

const createEmployeeRecord = employeeRecord =>{
  return {
    firstName: employeeRecord[0],
    familyName: employeeRecord[1],
    title: employeeRecord[2],
    payPerHour: employeeRecord[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};


const createEmployeeRecords = employeeRecord =>{
  return employeeRecord.map(createEmployeeRecord);
};


function createTimeInEvent(dateStamp){
  let [date, hour] = dateStamp.split(' ');

  this.timeInEvents.push({
    type: "TimeIn", 
    hour: parseInt(hour, 10),
    date: date
  });
    return this;
}


function createTimeOutEvent(dateStamp){
  let [date, hour] = dateStamp.split(' ');

  this.timeOutEvents.push({
    type: "TimeOut", 
    hour: parseInt(hour, 10),
    date: date 
  });
    return this;
}


function hoursWorkedOnDate(date){
  const timeOutWork = this.timeOutEvents.find(event => event.date === date);
  const timeInWork = this.timeInEvents.find(event => event.date === date);

  return (timeOutWork.hour - timeInWork.hour) / 100;
}


function wagesEarnedOnDate(date){
  return this.payPerHour * hoursWorkedOnDate.call(this, date);
}


const findEmployeeByFirstName = (employees, firstName) =>{
  return employees.find(employee => {
    return employee.firstName === firstName;
  });
}

const calculatePayroll = (allEmployees) =>{
  return allEmployees.reduce((sum, payOwed) => sum + allWagesFor.call(payOwed), 0);
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