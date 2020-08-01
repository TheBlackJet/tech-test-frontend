export const appendZeroToOneDigitTime = (time = 0) => {
    return String(time).padStart(2, "0");
}