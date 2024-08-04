const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../Models/User");
const api_config = require("../Config/jwtSecret");

const authenticationController = {
  async register(req, res) {
    const { email, password, role, firstName, lastName } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({ message: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        email,
        password: hashedPassword,
        role,
        firstName,
        lastName,
        username: email,
      });
      await user.save();

      res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ message: "Invalid credentials" });

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch)
        return res.status(400).json({ message: "Invalid credentials" });

      const accessToken = jwt.sign(
        { userId: user._id, role: user.role },
        api_config.jwtSecret.jwt_secret,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        { userId: user._id, role: user.role },
        api_config.jwtSecret.jwt_refresh_token
      );

      user.refreshTokens.push(refreshToken);
      await user.save();

      res.status(200).json({
        message: "Logged in successfully",
        accessToken,
        refreshToken,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async refreshToken(req, res) {
    const { refreshToken } = req.body;

    try {
      if (!refreshToken)
        return res.status(401).json({ message: "Refresh token is required" });

      const decoded = jwt.verify(
        refreshToken,
        api_config.jwtSecret.jwt_refresh_token
      );
      const user = await User.findById(decoded.userId);

      if (!user || !user.refreshTokens.includes(refreshToken))
        return res.status(403).json({ message: "Invalid refresh token" });

      const accessToken = jwt.sign(
        { userId: user._id },
        api_config.jwtSecret.jwt_secret,
        { expiresIn: "15m" }
      );

      res.json({ accessToken });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async logout(req, res) {
    const { refreshToken } = req.body;

    try {
      if (!refreshToken)
        return res.status(401).json({ message: "Refresh token is required" });

      const decoded = jwt.verify(
        refreshToken,
        api_config.jwtSecret.jwt_refresh_token
      );
      const user = await User.findById(decoded.userId);

      if (!user || !user.refreshTokens.includes(refreshToken))
        return res.status(403).json({ message: "Invalid refresh token" });

      user.refreshTokens = user.refreshTokens.filter(
        (token) => token !== refreshToken
      );
      await user.save();

      res.json({ message: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = authenticationController;
