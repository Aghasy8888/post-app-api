const userSchema = require("../schemas/user.schema");
const tokenSchema = require("../schemas/token.schema");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const errorConfig = require("../../config/error.config");
const authConfig = require("../../config/auth.config");
const ObjectId = require("mongoose").Types.ObjectId;

class UserController {
  create = async (req, res, next) => {
    try {
      const data = req.body;
      const userExists = await userSchema.findOne({ email: data.email });
      if (userExists) {
        throw errorConfig.userExists;
      }

      const pass = await this.generatePassHash(data.password);

      const newUser = {
        email: data.email,
        password: pass,
        name: data.name,
        surname: data.surname,
      };

      const user = await new userSchema(newUser).save();
      res.json({ _id: user._id });
    } catch (error) {
      next(error);
    }
  };

  updatePassword = async (req, res, next) => {
    try {
      const data = req.body;
      const user = await userSchema.findById(res.locals.userId);

      const match = await bcrypt.compare(
        authConfig.pass.prefix + data.oldPassword,
        user.password
      );

      if (!match) {
        throw errorConfig.emailOrPasswordNotFound;
      }

      const newPassword = await this.generatePassHash(data.newPassword);
      user.password = newPassword;

      await user.save();
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  };

  signIn = async (req, res, next) => {
    try {
      const data = req.body;
      const user = await userSchema.findOne({ email: data.email });
      if (!user) {
        throw errorConfig.emailOrPasswordNotFound;
      }

      const match = await bcrypt.compare(
        authConfig.pass.prefix + data.password,
        user.password
      );
      if (!match) {
        throw errorConfig.emailOrPasswordNotFound;
      }

      const token = await this.generateJWT({ userId: user._id });
      const tokenModel = new tokenSchema({
        owner: user._id,
        refreshToken: token.refreshToken,
        jwt: token.jwt,
      });

      await tokenModel.save();
      res.json(token);
    } catch (error) {
      next(error);
    }
  };

  signOut = (req, res, next) => {
    tokenSchema
      .remove({ jwt: req.body.jwt })
      .then((result) => {
        if (!result.deletedCount) throw errorConfig.defaultError;
        res.json({ success: true });
      })
      .catch((err) => next(err));
  };

  getInfo = (req, res, next) => {
    return userSchema
      .findById(ObjectId(res.locals.userId))
      .select("_id name surname")
      .then((data) => res.json(data))
      .catch((err) => next(err));
  };

  update = (req, res, next) => {
    const data = req.body;
    
    return userSchema
      .findById(res.locals.userId)
      .then(async (user) => {
        if (!user) throw errorConfig.userNotFound;
        if (data.name) user.name = data.name;
        if (data.surname) user.surname = data.surname;
        return user.save();
      })
      .then((data) => {
        data = JSON.parse(JSON.stringify(data));
        delete data.email;
        delete data.password;
        res.json(data);
      })
      .catch((err) => next(err));
  };

  /**
   * Update jwt
   * @param  {Object} req - request object
   * @param  {Object} res - response data and methods
   * @param  {Function} next - pass request to next endpoint
   **/
  updateToken = async (req, res, next) => {
    try {
      const id = req.params.id;
      let token = await tokenSchema.findOne({
        owner: id,
        refreshToken: req.body.refreshToken,
      });

      if (!token) {
        throw errorConfig.wrongRefreshToken;
      }

      //check the expiration of the refresh token
      if (
        new Date().getTime() - new Date(token.updated_at).getTime() >=
        authConfig.refreshToken.exp
      ) {
        throw errorConfig.invalidRefreshToken;
      }

      const newTokenPair = await this.generateJWT({ userId: id });
      token = Object.assign(token, newTokenPair);

      await token.save();
      res.json(newTokenPair);
      
    } catch (err) {
      next(err);
    }
  };

  /**
   * @param password
   * @returns {*}
   */
  generatePassHash = (password) =>
    bcrypt.hash(authConfig.pass.prefix + password, authConfig.pass.salt_rounds);

  generateToken = (length = 12) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(length, (err, buffer) => {
        if (err) return reject(err);
        return resolve(buffer.toString("hex"));
      });
    });
  };

  generateJWT = (payload) => {
    return Promise.try(() =>
      jwt.sign({ ...payload, timestamp: Date.now() }, authConfig.jwt.secret, {
        expiresIn: authConfig.jwt.exp,
      })
    ).then(async (jwt) => {
      const refreshToken = await this.generateToken(
        authConfig.refreshToken.size
      );
      return { jwt, refreshToken };
    });
  };
}

module.exports = new UserController();
