const startOfMonth = require('date-fns/start_of_month');
const format = require('date-fns/format');
const addDays = require('date-fns/add_days');
const addMonths = require('date-fns/add_months');
const differenceInDays = require('date-fns/difference_in_days');

const currentMonthFromFirstDay = format(startOfMonth(new Date()), 'YYYY-MM-DD');
const nextMonthFromFirstDay = format(addMonths(startOfMonth(new Date()), 1), 'YYYY-MM-DD');
const currentMonth = format(startOfMonth(new Date()), 'YYYY-MM');
const nextMonth = format(addMonths(startOfMonth(new Date()), 1), 'YYYY-MM');

const nextDay = format(addDays(new Date(), 1), 'YYYY-MM-DD');

const today = format(new Date(), 'YYYY-MM-DD');
const todayPlusTwo = format(addDays(new Date(), 2), 'YYYY-MM-DD');
const todayPlusTwoWeeks = format(addDays(new Date(), 14), 'YYYY-MM-DD');

const daysBeforeNextMonth = differenceInDays(nextMonthFromFirstDay, today);

const dates = {
	monthFromFirst: currentMonthFromFirstDay,
	nextMonthFromFirst: nextMonthFromFirstDay,
	tomorrow: nextDay,
	today: today,
	today2: todayPlusTwo,
	twoWeeksPlus: todayPlusTwoWeeks,
	month: currentMonth,
	nextMonth: nextMonth,
	daysBeforeNextMonth: daysBeforeNextMonth
}

module.exports = dates;