import UserServices from "../services/user.services";
import GenerateOTP from "../helpers/otp.helper";
class UserController {

  static async verifyOTP(req, res) {
    try {
      const { otp } = req.body; // Assuming the OTP entered by the user is sent in the request body
      const { phone } = req.params; // Assuming the phone number is part of the request parameters

      // Retrieve the user by phone number
      const user = await UserServices.getUserByphone(phone);

      if (!user) {
        res.status(404).json({
          error: `User with phone ${phone} not found`,
        });
        return;
      }

      const otpCreatedAt = user.createdAt; // Assuming you have a field to store the OTP creation timestamp

      if (GenerateOTP.isOTPExpired(otpCreatedAt)) {
        res.status(400).json({
          error: `The OTP has expired. Please request a new OTP.`,
        });
        return;
      }
      // Check if the entered OTP matches the verificationCode
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
  static async registerUser(req, res) {
    try {
      const newUser = UserController.getRequestBodyData(req);
      const existingUser = await UserServices.getUserByphone(newUser.phone); // Assuming UserServices.getUserByPhone is asynchronous

      if (!existingUser) {
        // Generate a random 4-digit OTP
        const otp = Math.floor(1000 + Math.random() * 9000);
        newUser.verificationCode = otp;

        const result = await UserServices.createUser(newUser);

        if (result) {

          // Send the OTP to the user's phone
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

  static getRequestBodyData(req) {
    return {
      names: req.body.names,
      password: req.body.password,
      phone: req.body.phone,
      // verificationCode: req.doby.verificationCode
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
