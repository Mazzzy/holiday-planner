const moment = require('moment');

class HolidayPlanner{
    constructor({holidayList, dateFormat, maxDuration}){
        this.holidayList = holidayList;
        this.dateFormat = dateFormat || 'DD.MM.YYYY';
        this.maxDuration = maxDuration || 50;
        this.#validateAndHolidayList();
    }

    getHolidayList(){
        return {
            holidayList: this.holidayList,
            validHolidayList: this.validHolidayList,
            dateFormat: this.dateFormat,
            maxDuration: this.maxDuration,
        }
    }

    getHolidayDays({startDate, endDate}){
        startDate = this.#parseDate(startDate);
        endDate = this.#parseDate(endDate);
        if(endDate.isBefore(startDate)){
            return {
                success: false,
                message: 'End Date cannot be before start date.',
            }
        }
        if(!startDate.isValid() || !endDate.isValid()){
            return {
                success: false,
                message: `Invalid Date Format. Please provide a valid date. Accepted Format: ${ this.dateFormat }`,
            }
        }
        if(!this.#validateIfDatesBelongToSameHolidayPeriod(startDate, endDate) && this.#validateDateRange(startDate, endDate)){
            const holidays = this.#getHolidayList(startDate, endDate);
            return {
                success: true,
                message: holidays.length,
                holidays,
            }
        } else {
            return {
                success: false,
                message: 'The Date range is not valid.',
            }
        }
    }

    #getHolidayList(startDate, endDate){
        let holidays = []
        for (var m = startDate; m.diff(endDate, 'days') <= 0; m.add(1, 'days')) {
            if((!this.#momentInArray(m)) && m.day()!=0){
                holidays.push(m.format(this.dateFormat));
            }
        }
        return holidays;
    }

    #momentInArray(queryDate){
        return Boolean(this.validHolidayList.filter(function(date){
           return date.isSame(queryDate);
        }).length);
    }

    #validateAndHolidayList(){
        let modifiedHolidayList = [];
        for (let index = 0; index < this.holidayList.length; index++) {
            const element = this.#parseDate(this.holidayList[index]);
            if(!element.isValid()){
                throw new Error(`Invalid Date Format. Please provide a valid date. Accepted Format: ${ this.dateFormat }`)
            }
            if(element.day()!=0){
                modifiedHolidayList.push(element);
            }
        }
        this.validHolidayList = modifiedHolidayList;
    }

    #parseDate(date){
        return moment(date,this.dateFormat);
    }

    #validateDateRange(startDate, endDate){
        return this.#validateDurationRange(startDate, endDate)
    }

    #validateDurationRange(startDate, endDate){
        const noOfDays = endDate.diff(startDate,'days') + 1;
        return  !(noOfDays>=this.maxDuration);
    }

    #validateIfDatesBelongToSameHolidayPeriod(startDate, endDate){
        const lastDayOfHolidayPeriod = moment({ y    :endDate.year(), M     :2, d   :31});
        return  lastDayOfHolidayPeriod.isBetween(startDate, endDate);
    }
    
}

module.exports = {
    HolidayPlanner
};