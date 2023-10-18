const modifyDate = (milliSeconds) => {
    const timestampMilliseconds = milliSeconds;
    const timestampSeconds = timestampMilliseconds / 1000; // Convert milliseconds to seconds

    const date = new Date(timestampSeconds * 1000); // Multiply by 1000 to convert back to milliseconds

    // Format the date as a string in the desired format
    const formattedDate = date.toISOString().replace('T', ' ').replace('Z', '');

    return formattedDate;
}

module.exports = modifyDate