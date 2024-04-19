import { bcrypt } from "../dependencies/dependencies";
const saltRounds = 10;
export const passwordHashHelper = (body: {
  username: string;
  email: string;
  password: string;
  salt?: string;
}) => {
  let { username, email, password } = body;
  let salt = "";
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds).then((salt) => {
      bcrypt
        .hash(password, salt)
        .then((password) => {
          resolve({ username, email, password, salt });
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

export const checkPasswordHelper = (userPassword: string, userSalt: string) : Promise<any>=> {
  return new Promise((resolve, reject) => {
    bcrypt
      .hash(userPassword, userSalt)
      .then((password) => {
        resolve(password);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
