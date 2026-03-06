
export function calculateMedian(numbers: number[]): number {
  if (numbers.length === 0) {
    throw new Error("The array is empty");
  }

  // sort numbers from lowest to highest
  const sorted = numbers.sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  // if length is even return the avg the tow values that are nearest to the middle
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  } 
  // length is odd, return value in middle
  else {

    return sorted[middle];
  }
}