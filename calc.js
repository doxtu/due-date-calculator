var totalInvoiceIn = document.getElementById("orig-inv"),
	termPaymentIn = document.getElementById("term-pay"),
	monthIn = document.querySelector("#month"),
	dayIn = document.querySelector("#day"),
	yearIn = document.querySelector("#year"),
	totalPaidIn = document.getElementById("total-paid"),
	button = document.getElementById("btn"),
	disRemaining = document.getElementById("remaining"),
	disDue = document.getElementById("due-date"),
	disBehindAhead = document.getElementById("behind-ahead");

var ghost = document.querySelector(".ghost");

window.addEventListener("load",function(){
	totalInvoiceIn.focus();
});

button.addEventListener("click",calculate);

function calculate(e){
	var totalInvoice,termPayment,startDate,totalPaid,nextDue;
	totalInvoice = totalInvoiceIn.value;
	termPayment = termPaymentIn.value;
	startDate = String(monthIn.value) + "/" + String(dayIn.value) + "/" + String(yearIn.value);  //new Date(dateIn.value);
	totalPaid = totalPaidIn.value;

	startDate = new Date(startDate);
	nextDue = dueDate(totalInvoice,termPayment,startDate,totalPaid);

	disRemaining.innerHTML = "Amount remaining: " + "<span class='underlined'>" + parseFloat(totalInvoice - totalPaid).toFixed(2) + "</span>";
	disDue.innerHTML = "Due date: "+"<span class='underlined'>" + nextDue.toLocaleDateString() +"</span>";
	disBehindAhead.innerHTML = "Behind/Ahead: " + "???";

	clearInputs();
}

function clearInputs(){
	totalInvoiceIn.value = "";
	termPaymentIn.value = "";
	monthIn.value ="";
	dayIn.value = "";
	yearIn.value = "";
	totalPaidIn.value = "";
	totalInvoiceIn.focus();
}

function monthDiff(d1,d2){
	var months;
	months = (d2.getFullYear() - d1.getFullYear())*12;
	months -= d1.getMonth() +1;
	months += d2.getMonth();
	return months <= 0 ? 0 : months;
}

function dueDate(totalInvoice,termPayment,startDate,totalPaid){
	function addMonths(dateObj,num){
		var currentMonth = dateObj.getMonth() + dateObj.getFullYear()*12;
		dateObj.setMonth(dateObj.getMonth() + num);
		var diff = dateObj.getMonth() + dateObj.getFullYear()*12 - currentMonth;

		if(diff != num){
			dateObj.setDate(0);
		}

		return dateObj;
	}

	var monthsToPayTotal = totalInvoice/termPayment;
	var monthsToAddFromStart = Math.round(totalPaid/termPayment);
	var nextDue = addMonths(startDate,monthsToAddFromStart);

	return nextDue;
}
