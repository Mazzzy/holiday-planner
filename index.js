const { PublicHolidays } = require('./static/holidays');
const { HolidayPlanner } = require('./src/HolidayPlanner');

const input = {
    startDate: '1.7.2020', 
    endDate: '29.7.2020'
}

let holidayList = [...PublicHolidays['2020'],...PublicHolidays['2021']];
const holidayPlanner = new HolidayPlanner({holidayList, dateFormat: 'DD.MM.YYYY', maxDuration: 50});
console.log(holidayPlanner);