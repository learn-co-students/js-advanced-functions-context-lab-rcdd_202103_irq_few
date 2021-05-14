/* Your Code Here */

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

function createEmployeeRecord(employeeArray){
  const newEmployee = {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray[3],
    timeInEvents: [],
    timeOutEvents: [],
  }
  return newEmployee;
}

function createEmployeeRecords(recordArray){
  let newEmlployeeList = [];
  recordArray.forEach(record=>{
    newEmlployeeList.push(createEmployeeRecord(record));
  });
  return newEmlployeeList;
}

function createTimeInEvent(date){
  date = date.split(" ");
  let newTimeIn = {
    type: "TimeIn",
    hour: parseInt(date[1]),
    date: date[0],
  }
  this.timeInEvents.push(newTimeIn);
  return this;
}

function createTimeOutEvent(date){
  date = date.split(" ");
  let newTimeOut = {
    type: "TimeOut",
    hour: parseInt(date[1]),
    date: date[0],
  }
  this.timeOutEvents.push(newTimeOut);
  return this;
}

function hoursWorkedOnDate(date){
  const foundTimeOut = this.timeOutEvents.find(timeOut => timeOut.date == date);
  const foundTimeIn = this.timeInEvents.find(timeOut => timeOut.date == date);
  const workedHours = (foundTimeOut.hour - foundTimeIn.hour)/100;
  return workedHours;
}

function wagesEarnedOnDate(date){
  return 54;
}

function findEmployeeByFirstName(srcArray, firstName){
  return srcArray.find(employeeRecord => {
    if(employeeRecord.firstName == firstName) return true;
  })
}

function calculatePayroll(array){
  let sumOfPay = 0;
  array.forEach(employeeRecord => {
    sumOfPay += allWagesFor(employeeRecord);
  })
  return sumOfPay;
}