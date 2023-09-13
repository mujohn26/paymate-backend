import UserServices from "../services/user.services";
class UserController {
  
  static async registerUser(req, res) {
    try {
      const newUser = UserController.getRequestBodyData(req);
      const result = await UserServices.createUser(newUser);
      res.status(201).json({
        status: "User created successfully",
        user: result, 
      });
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
      email: req.body.email,
    };
  }
}

export default UserController;
