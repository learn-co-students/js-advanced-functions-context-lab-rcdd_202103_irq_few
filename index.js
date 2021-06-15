let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })
    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!
    return payable
}
let createEmployeeRecord = function(record) {
    return {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}
let createEmployeeRecords = function(employeeRecordData){
return employeeRecordData.map(function(record){
return createEmployeeRecord(record)
    })
}
let createTimeInEvent = function(dateTimeInStamp){
let [date, hour] = dateTimeInStamp.split(' ');
this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date,
    })
    return this
}
let createTimeOutEvent = function(dateTimeOutStamp){
let [date, hour] = dateTimeOutStamp.split(' ');
this.timeOutEvents.push({
  type: "TimeOut",
  hour: parseInt(hour, 10),
  date: date,
  })
  return this
}
let hoursWorkedOnDate = function(dateRequested){
let inEvent = this.timeInEvents.find(function(e){
return e.date === dateRequested;
  })
let outEvent = this.timeOutEvents.find(function(e){
return e.date === dateRequested;
  })
    return (outEvent.hour - inEvent.hour) / 100;
}
let wagesEarnedOnDate = function(dateRequested){
let wage = hoursWorkedOnDate.call(this, dateRequested) * this.payPerHour
return parseFloat(wage.toString())
}
let findEmployeeByFirstName = function(employees, firstName){
return employees.find(function(record){
return record.firstName === firstName
  })
}
let calculatePayroll = function(employees){
return employees.reduce(function(memo, rec){
return memo + allWagesFor.call(rec)
  }, 0)
}
