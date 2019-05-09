require('dotenv').config();

export class Env {

  static token = process.env.token;
  static googleProject = process.env.googleProject;
}
