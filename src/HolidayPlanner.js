class HolidayPlanner{
    constructor({holidayList, dateFormat, maxDuration}){
        this.holidayList = holidayList;
        this.dateFormat = dateFormat || 'DD.MM.YYYY';
        this.maxDuration = maxDuration || 50;
    }
}

module.exports = {
    HolidayPlanner
};