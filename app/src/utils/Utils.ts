export const InitialsGenerator = (
  firstName: string | undefined | null,
  lastName: string | undefined | null
) => {
  if (!firstName && !lastName) return "";

  // Ensure that 'firstName' and 'lastName' contain at least one character
  const firstInitial = firstName ? firstName.substring(0, 1).toUpperCase() : "";
  const secondInitial = lastName ? lastName.substring(0, 1).toUpperCase() : "";

  // Combine the first initials with a space in between
  return firstInitial + "" + secondInitial;
};
