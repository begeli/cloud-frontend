export default function pastXmonths(noOfMonths) {
    var monthName = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    var d = new Date();
    d.setDate(1);
    var expectedLength = noOfMonths;
    var monthsArray = new Array(expectedLength);
    var i;
    for (i=0; i<expectedLength; i++) {
        monthsArray[(monthsArray.length - i - 1) % expectedLength] = monthName[d.getMonth()] + ' ' + d.getFullYear()
        d.setMonth(d.getMonth() - 1);
    }
    return monthsArray;
}