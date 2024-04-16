export function formatDegreesAsDMS(degrees : number, showSign : boolean = true) {
    // Absolute value is used for calculations to ensure proper minute and second extraction
    const absoluteDegrees = Math.abs(degrees);

    // Get the integer part of the degree
    const degreeInt = Math.floor(absoluteDegrees);

    // Get the fractional part of the original degree to calculate minutes
    const minutesDecimal = (absoluteDegrees - degreeInt) * 60;
    const minutesInt = Math.floor(minutesDecimal);

    // Get the fractional part of the minute calculation to calculate seconds
    const seconds = (minutesDecimal - minutesInt) * 60;

    // Prepare the sign part of the output
    const sign = degrees < 0 ? "-" : "+";

    // Construct the string with °, ', and " symbols
    return `${showSign || sign === "-" ? sign : ''}${degreeInt}° ${minutesInt}' ${seconds.toFixed(1)}"`;
}