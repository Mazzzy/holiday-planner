const { HolidayPlanner } = require('../src/HolidayPlanner');
const moment = require('moment');
let { expect } = require('chai');

describe("Holiday Planner Tests", async () => {
    it("Check if Object is iniitalized Correctly", async () => {
        const holidayPlanner = new HolidayPlanner({ holidayList: ['1.1.2021'], dateFormat: 'DD.MM.YYYY', maxDuration: 51 });
        const holidayObj = holidayPlanner.getHolidayList();
        expect(holidayObj.validHolidayList[0].isSame(moment('1.1.2021','DD.MM.YYYY'))).to.be.equal(true);
        expect(holidayObj.dateFormat).to.be.equal('DD.MM.YYYY');
        expect(holidayObj.maxDuration).to.be.equal(51);
        expect(holidayObj.holidayList).to.have.members(['1.1.2021']);
    });

    it("If End Date is Before Start Date, then return success False", async () => {
        const holidayPlanner = new HolidayPlanner({ holidayList: ['1.1.2021'], dateFormat: 'DD.MM.YYYY', maxDuration: 51 });
        const holidays = holidayPlanner.getHolidayDays({
            startDate: '2.1.2021', 
            endDate: '1.1.2021'
        });
        expect(holidays.success).to.be.equal(false);
    });

    it("If Start Date is not Valid , then return success False", async () => {
        const holidayPlanner = new HolidayPlanner({ holidayList: ['1.1.2021'], dateFormat: 'DD.MM.YYYY', maxDuration: 51 });
        const holidays = holidayPlanner.getHolidayDays({
            startDate: '2.19.2021', 
            endDate: '10.1.2021'
        });
        expect(holidays.success).to.be.equal(false);
    });

    it("If End Date is not Valid , then return success False", async () => {
        const holidayPlanner = new HolidayPlanner({ holidayList: ['1.1.2021'], dateFormat: 'DD.MM.YYYY', maxDuration: 51 });
        const holidays = holidayPlanner.getHolidayDays({
            startDate: '2.1.2021', 
            endDate: '10.19.2021'
        });
        expect(holidays.success).to.be.equal(false);
    });

    it("If Holiday range is not in same Holiday Range, then return success False", async () => {
        const holidayPlanner = new HolidayPlanner({ holidayList: ['1.1.2021'], dateFormat: 'DD.MM.YYYY', maxDuration: 51 });
        const holidays = holidayPlanner.getHolidayDays({
            startDate: '1.3.2021', 
            endDate: '1.4.2021'
        });
        expect(holidays.success).to.be.equal(false);
    });

    it("If duration is greater than the max Duration, then return success False", async () => {
        const holidayPlanner = new HolidayPlanner({ holidayList: ['1.1.2021'], dateFormat: 'DD.MM.YYYY', maxDuration: 50 });
        const holidays = holidayPlanner.getHolidayDays({
            startDate: '1.12.2020', 
            endDate: '2.3.2021'
        });
        expect(holidays.success).to.be.equal(false);
    });

    it("If All the conditions are satisfied, it should return the number of days", async () => {
        const holidayPlanner = new HolidayPlanner({ holidayList: ['1.1.2021', '6.1.2021'], dateFormat: 'DD.MM.YYYY', maxDuration: 50 });
        const holidays = holidayPlanner.getHolidayDays({
            startDate: '1.1.2021', 
            endDate: '7.1.2021'
        });
        expect(holidays.success).to.be.equal(true);
        expect(holidays.message).to.be.equal(4);
    });

    it("If Both Start date and End Date are Sundays (To consider 2 sundays in lowest date range possible)", async () => {
        const holidayPlanner = new HolidayPlanner({ holidayList: ['1.1.2021', '6.1.2021'], dateFormat: 'DD.MM.YYYY', maxDuration: 50 });
        const holidays = holidayPlanner.getHolidayDays({
            startDate: '3.1.2021', 
            endDate: '10.1.2021'
        });
        expect(holidays.success).to.be.equal(true);
        expect(holidays.message).to.be.equal(5);
    });

    it("If Invalid dates is provided in holiday list", async () => {
        expect( () => {
            new HolidayPlanner({
                 holidayList: ['32.1.2021'], 
                 dateFormat: 'DD.MM.YYYY', 
                 maxDuration: 50 
            })
        }).to.throw();
    });
});