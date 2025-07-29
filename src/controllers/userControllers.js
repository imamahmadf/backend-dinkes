const { user, profile, userRole, sequelize, role } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { blacklistedTokens } = require("../lib/auth");

module.exports = {
  register: async (req, res) => {
    const transaction = await sequelize.transaction();
    console.log(req.body);
    try {
      const { nama, namaPengguna, password, role, unitKerjaId } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const existingUser = await user.findOne({ where: { namaPengguna } });
      if (existingUser) {
        return res.status(400).json({ message: "Email sudah digunakan" });
      }

      const newUser = await user.create(
        {
          nama,
          namaPengguna,
          password: hashedPassword,
        },
        { transaction }
      );

      const newProfile = await profile.create(
        {
          nama,
          userId: newUser.id,
          unitKerjaId,
        },
        { transaction }
      );

      const newUserRole = await userRole.create(
        {
          userId: newUser.id,
          roleId: role,
        },
        { transaction }
      );

      await transaction.commit();
      res.status(201).json({ message: "Registrasi berhasil" });
    } catch (err) {
      await transaction.rollback();
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { namaPengguna, password } = req.body;
      const resultUser = await user.findOne({
        where: { namaPengguna },
        include: [
          { model: userRole, include: [{ model: role, attributes: ["nama"] }] },
          {
            model: profile,
            attributes: ["id", "nama", "profilePic"],
          },
        ],
      });

      if (!resultUser) {
        return res.status(401).json({ message: "Email atau password salah" });
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        resultUser.password
      );
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Email atau password salah" });
      }

      const token = jwt.sign(
        { id: resultUser.id, role: resultUser.role },
        process.env.JWT_SECRET || "SECRET_KEY",
        { expiresIn: "12h" }
      );

      res.json({
        token,
        user: resultUser.profiles,
        role: resultUser.userRoles,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },

  logout: async (req, res) => {
    try {
      const token = req.header("Authorization")?.split(" ")[1];
      if (!token) {
        return res.status(400).json({ message: "No token provided" });
      }

      // Tambahkan token ke blacklist
      blacklistedTokens.add(token);

      res.json({ message: "Logout berhasil" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Contoh endpoint yang dilindungi
  getProfile: async (req, res) => {
    const userId = req.params.id;
    try {
      const result = await profile.findOne({
        attributes: ["id", "nama"],
        where: { userId },
        include: [
          {
            model: user,
            attributes: ["id", "namaPengguna"],
            include: [
              {
                model: userRole,
                attributes: ["id"],
                include: [{ model: role, attributes: ["nama"] }],
              },
            ],
          },
        ],
      });
      return res
        .status(200)
        .json({ result, message: "Data profile berhasil diambil" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  // Contoh endpoint khusus admin
  adminDashboard: async (req, res) => {
    try {
      res.json({ message: "Ini adalah dashboard admin" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getRole: async (req, res) => {
    try {
      const result = await role.findAll({ attributes: ["id", "nama"] });

      return res.status(200).json({ result });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },

  getAllUser: async (req, res) => {
    try {
      const result = await user.findAll({
        attributes: ["id", "nama", "namaPengguna"],
        include: [
          {
            model: userRole,
            include: [{ model: role, attributes: ["id", "nama"] }],
          },
          {
            model: profile,
            attributes: ["id", "nama"],
          },
        ],
      });

      return res.status(200).json({ result });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },
  addRole: async (req, res) => {
    console.log(req.query, "CEK TAMBA USER ROLE");

    try {
      const { userId, roleId } = req.query;

      const result = await userRole.create({
        userId,
        roleId,
      });

      return res.status(200).json({
        result,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },
  deleteRole: async (req, res) => {
    // console.log(req.query);
    try {
      const { userId, id } = req.query;

      const result = await userRole.destroy({
        where: { userId, id },
      });

      return res.status(200).json({
        result,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },
};
