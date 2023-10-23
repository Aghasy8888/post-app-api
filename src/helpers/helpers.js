module.exports = function findAverage(ratingsArray) {
    const sumOfRates = ratingsArray.reduce(
      (accumulator, rating) => accumulator + rating.rating,
      0
    );
    return sumOfRates / ratingsArray.length;
  }

  