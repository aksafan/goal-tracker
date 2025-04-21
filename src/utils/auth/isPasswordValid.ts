export const isPasswordValid = (
  password: string,
  passwordConfirmation: string
): boolean => {
  return (
    typeof password === "string" &&
    password === passwordConfirmation &&
    password.length > 8
  );
};
