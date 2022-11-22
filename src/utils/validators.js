export const emailValidator = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const passwordValidator = (password) => {
  return String(password)
    .toLowerCase()
    .match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
};
