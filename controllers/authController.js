const db = require("../config/db");
const bcrypt = require("bcrypt");

exports.login = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email=?";

  db.query(sql, [email], async (err, result) => {

    if (err) return res.status(500).json({message:"Server error"});

    if (result.length === 0)
      return res.status(401).json({message:"User not found"});

    const user = result[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.status(401).json({message:"Wrong password"});

    res.json({
      message:"Login success",
      user:{
        id:user.id,
        name:user.name,
        email:user.email
      }
    });

  });
};