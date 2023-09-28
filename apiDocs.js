/**
 * @swagger
 * /api/user/create:
 *   post:
 *     summary:  Register a new user
 *     description: Register a new user with the provided information.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               names:
 *                 type: string
 *                 description: The user's full name.
 *               phone:
 *                 type: string
 *                 description: The user's phone number.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *     responses:
 *       201:
 *         description: User registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *       400:
 *         description: Bad request
 *       409:
 *         description: Conflict - User already exists
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all registered users.
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Successful retrieval of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login a user
 *     description: Log in a registered user.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Access token for the logged-in user.
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */


/**
 * @swagger
 * /api/user/verify/{phone}:
 *   patch:
 *     summary: Verify OTP.
 *     description: Verify a one-time password (OTP) provided by the user.
 *     tags:
 *       - User
 *     parameters:
 *       - name: phone
 *         in: path
 *         required: true
 *         description: The Phone of the user attempting to verify the OTP.
 *         schema:
 *           type: string
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 otp:
 *                   type: string
 *     responses:
 *       200:
 *         description: OTP verification successful 
 *       400:
 *         description: Bad request
 */


/**
 * @swagger
 * /api/user/resend/{phone}:
 *   patch:
 *     summary: Resend OTP to User
 *     description: Resend a one-time password (OTP) to a user's registered phone number.
 *     tags:
 *       - User
 *     parameters:
 *       - name: phone
 *         in: path
 *         description: The Phone of the user to whom the OTP should be sent.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OTP resend successful. 
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/user/delete/{user_id}:
 *   delete:
 *     summary: Delete User
 *     description: Delete a user account by user ID.
 *     tags:
 *       - User
 *     parameters:
 *       - name: user_id
 *         in: path
 *         description: he ID of the user to be deleted.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 */