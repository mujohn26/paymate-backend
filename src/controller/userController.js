import UserServices from "../services/user.services";
import EncryptPassword from "../helpers/encrypt.helper";
import GenerateOTP from "../helpers/otp.helper";
import comparePassword from "../helpers/decryptor.helper";
import TokenHelper from "../helpers/token.helper";
class UserController {

  static async verifyOTP(req, res) {
    try {
      const { otp } = req.body;
      const { phone } = req.params;
      const user = await UserServices.getUserByphone(phone);
      if (!user) {
        res.status(404).json({
          error: `User with phone ${phone} not found`,
        });
        return;
      }
      const otpCreatedAt = user.updatedAt;
      if (GenerateOTP.isOTPExpired(otpCreatedAt)) {
        res.status(400).json({
          error: `The OTP has expired. Please request a new OTP.`,
        });
        return;
      }
      if (otp === user.verificationCode.toString()) {
        user.isVerified = true;
        await user.save();
        return res.status(200).json({
          message: `OTP verification successful for user ${user.names}`,
        });
      } else {
        return res.status(400).json({
          error: `Incorrect OTP entered`,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "Internal server error",
      });
    }
  }
  // resend otp 
  static async resendOTP(req, res) {
    try {
      const { phone } = req.params; 
      const user = await UserServices.getUserByphone(phone);

      if (!user) {
        res.status(404).json({
          error: `User with phone ${phone} not found`,
        });
        return;
      }

      const newOTP = Math.floor(1000 + Math.random() * 9000);
      user.verificationCode = newOTP;

      await user.save();
      GenerateOTP.sendOTP(user.phone, newOTP);
      res.status(200).json({
        message: `New OTP sent successfully to user ${user.names}`,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "Internal server error",
      });
    }
  }
  static async registerUser(req, res) {
    try {
      const newUser = UserController.getRequestBodyData(req);
      const existingUser = await UserServices.getUserByphone(newUser.phone);

      if (!existingUser) {

        const otp = Math.floor(1000 + Math.random() * 9000);
        newUser.verificationCode = otp;

        const result = await UserServices.createUser(newUser);

        if (result) {


          GenerateOTP.sendOTP(newUser.phone, otp);

          res.status(201).json({
            message: `User ${newUser.lastName} created successfully`,
            data: result,
          });
        } else {
          res.status(400).json({
            error: `Error in creating a new User`,
          });
        }
      } else {
        res.status(409).json({
          error: `User ${newUser.lastName} already exists`,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "Internal server error",
      });
    }
  }

  // user login 
  static async userLogin(req, res) {
    try {
      const loginInfo = {
        phone: req.body.phone,
        password: req.body.password,
      };
      // console.log("=-=--=-=--=", loginInfo);

      const existUser = await UserServices.getUserByphone(
        loginInfo.phone
      );
      if (existUser !== null) {
        let decryptPasswordAndCompare = comparePassword(
          loginInfo.password,
          existUser.dataValues.password
        );
        if (decryptPasswordAndCompare) {
          const payload = {
            names: existUser.dataValues.names,
            phone: existUser.dataValues.phone,
          };
          const token = await TokenHelper.generateToken(payload);
          res.status(200).json({
            message: `User ${existUser.names} logged in successfully`,
            token,
          });
        } else {
          res.status(400).json({
            error: `Invalid telephone number or password. Please try again`,
          });
        }
      } else {
        res.status(404).json({
          error: `User with this telephone does not exist`,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "Internal server error",
      });
    }
  }
  static getRequestBodyData(req) {
    return {
      names: req.body.names,
      password: EncryptPassword(req.body.password),
      phone: req.body.phone,
    };
  }
  static async getAllUsers(req, res) {
    try {
      const allUser = await UserServices.getAllUsers();
      const countUsers = allUser.length;
      res.status(200).json({
        status: "success",
        count: countUsers,
        data: allUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "Internal server error",
      });
    }
  }
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await UserServices.deleteUser(id);
      res.status(200).json({
        message: "User deleted successfully",
        data: user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "Internal server error",
      });
    }
  }
}

export default UserController;
