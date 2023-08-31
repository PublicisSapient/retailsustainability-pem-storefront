export const arraySlicer = (arr: string[], showAll: boolean): string[] => {
  if (showAll) return arr.slice(0, 4);
  else return arr;
};
export const stringFormatter = (str: string): string => {
  const formattedString = str.replace(/_/g, ' ');
  return formattedString.charAt(0).toUpperCase() + formattedString.slice(1);
};

export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
  };
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate;
};
export const formatPrice = (price: string): string => {
  if (price === '0' || price === '0.0') {
    return 'Free';
  }
  return `$${price}`;
};
export const toggleWordInArray = (array: string[], word: string): string[] => {
  const newArray = [...array];
  const index = newArray.indexOf(word);
  if (index !== -1) {
    newArray.splice(index, 1);
  } else {
    newArray.push(word);
  }
  return newArray;
};
