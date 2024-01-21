function useDate(timestamp) {
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString();

  return formattedDate;
}

export default useDate;
