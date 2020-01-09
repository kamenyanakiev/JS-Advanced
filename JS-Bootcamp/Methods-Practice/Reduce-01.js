function reducePractice(array) {
    //Sum all numbers in an array
    let summed = array.reduce((total, currentValue) => {
        return total + currentValue;
    });
    console.log(summed);

    //Gets the highest value number from an array
    let maxValue = array.reduce ((max, currentValue) => {
        if (currentValue > max) {
            return currentValue;
        };
        return max;
        //or
        //return Math.max(max, currentValue);
    });
    console.log(maxValue);

    //Gets the lowest value number from an array
    let minValue = array.reduce ((min, currentValue) => {
        if (currentValue > min) {
            return min;
        };
        return min;
        //or
        //return Math.min(min, currentValue);
    });
    console.log(minValue);

    //Counts votes and returns the result as an object
    const votes = ['y', 'n', 'y', 'y', 'y', 'n', 'n', 'y'];
    const votesResult = votes.reduce((tally, currentVote) => {
        tally[currentVote] = (tally[currentVote] || 0) + 1;
        return tally;
    }, {});
    console.table(votesResult);

}

reducePractice([2, 3, 44, 9, 15]);