import { Schema, model } from "../dependencies/dependencies";

const Model = new Schema(
  {
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    salt: { type: String, require: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const userModel = model("user", Model);
