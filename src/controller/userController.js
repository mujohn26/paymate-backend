import UserServices from "../services/user.services";
class UserController {

  static async registerUser(req, res) {
    try {
      const newUser = UserController.getRequestBodyData(req);
      const existingUser = await UserServices.getUserByphone(newUser.phone); // Assuming UserServices.getUserByPhone is asynchronous

      if (!existingUser) {
        const result = await UserServices.createUser(newUser);

        if (result) {
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
      firstName: req.body.firstName,
      lastName: req.body.lastName,
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
