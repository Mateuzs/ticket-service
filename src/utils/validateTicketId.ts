const validateTicketId = (ticketId: string): boolean => {
  const integerTestRegex = /^\d+$/;

  return integerTestRegex.test(ticketId);
};

export default validateTicketId;
