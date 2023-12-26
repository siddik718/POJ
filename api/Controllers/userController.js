import USER from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { jwtDecode } from "jwt-decode";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // check if user exist.
    const userExist = await USER.findOne({ email });
    // check if password match.
    if (userExist && (await bcrypt.compare(password, userExist.password))) {
      return res.status(200).json({
        id: userExist._id,
        username: userExist.username,
        email: userExist.email,
        token: generateToken(userExist._id),
      });
    } else {
      return res.status(400).json({
        message: "No User Found",
      });
    }
  } catch (err) {
    return res.status(500).json("Internal Server Error");
  }
};
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // check if user already exist.
    const alreadyExist = await USER.findOne({ email });
    if (alreadyExist) {
      return res.status(400).json({
        message: "User Already Exist",
      });
    }
    // if a new user then create the hash password.
    const hashPassword = await bcrypt.hash(password, 10);
    // create an instance of USER.
    const user = new USER({
      username,
      email,
      password: hashPassword,
    });
    // saving the user to database.
    const response = await user.save();
    // send the data as json.
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const generateToken = (id) => {
  const KEY = process.env.JWTKEY;
  const token = jwt.sign({ id }, KEY, { expiresIn: "30d" });
  return token;
};

export const googleController = async (req, res) => {
  const token = req.body.credentialResponse.credential;
  const decodedToken = jwtDecode(token);
  const email = decodedToken.email;
  const username = decodedToken.name;
  const password = decodedToken.sub;

  try {
    // check if user already exist in database.
    const userExist = await USER.findOne({ email });
    if (userExist) {
      return res.status(200).json({
        id: userExist._id,
        username: userExist.username,
        email: userExist.email,
        token: generateToken(userExist._id),
      });
    } else {
      // if a new user then create the hash password.
      const hashPassword = await bcrypt.hash(password, 10);
      // create an instance of USER.
      const user = new USER({
        username,
        email,
        password : hashPassword,
      });
      // saving the user to database.
      const response = await user.save();
      // send the data as json.
      return res.status(201).json({
        id: response._id,
        username: response.username,
        email: response.email,
        token: generateToken(response._id),
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// get all the user statistis around the site.
import BLOG from "../Models/blogModel.js";
import SUBMISSIONS from "../Models/submissionModel.js";

export const statistics = async (req, res) => {
  const { username } = req.params;
  try {
    const blogs = await BLOG.find({ username });
    const submissions = await SUBMISSIONS.find({ username });
    // find status statistics
    const AC = submissions.filter((submission) => {
      return submission.status === "Accepted";
    });
    const WA = submissions.filter((submission) => {
      return submission.status === "Wrong Answer";
    });
    const TLE = submissions.filter((submission) => {
      return submission.status === "Time Limit Exceeded";
    });
    const CE = submissions.filter((submission) => {
      return submission.status === "Compilation Error";
    });
    const RE = submissions.filter((submission) => {
      return (
        submission.status !== "Compilation Error" &&
        submission.status !== "Accepted" &&
        submission.status !== "Wrong Answer" &&
        submission.status !== "Time Limit Exceeded"
      );
    });
    // find language statistics
    const CPP = submissions.filter((submission) => {
      return submission.language === "CPP17";
    });
    const PYTHON = submissions.filter((submission) => {
      return submission.language === "PYTHON3";
    });
    const JAVA = submissions.filter((submission) => {
      return submission.language === "JAVA8";
    });
    // find Difficulty statistics
    const EASY = submissions.filter((submission) => {
      return submission.difficulty === "easy";
    });
    const EASY_MEDIUM = submissions.filter((submission) => {
      return submission.difficulty === "easymedium";
    });
    const HARD_MEDIUM = submissions.filter((submission) => {
      return submission.difficulty === "hardMedium";
    });
    const MEDIUM = submissions.filter((submission) => {
      return submission.difficulty === "medium";
    });
    const HARD = submissions.filter((submission) => {
      return submission.difficulty === "hard";
    });
    // Send the statistics.
    return res.status(200).json({
      blogs: blogs.length,
      submissions: submissions.length,
      AC: AC.length,
      WA: WA.length,
      TLE: TLE.length,
      CE: CE.length,
      RE: RE.length,
      CPP: CPP.length,
      PYTHON: PYTHON.length,
      JAVA: JAVA.length,
      EASY: EASY.length,
      EASY_MEDIUM: EASY_MEDIUM.length,
      HARD_MEDIUM: HARD_MEDIUM.length,
      MEDIUM: MEDIUM.length,
      HARD: HARD.length,
    });
  } catch (err) {
    return res.status(400).json({
      message: "User Not Found",
    });
  }
};
