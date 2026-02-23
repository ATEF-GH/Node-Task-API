export default function (req, res, next) {
  const { email, name, password } = req.body;

  const validEmail = (userEmail) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  };

  const validPassword = (userPassword) => {
    return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&!+=])(?=\S+$).{8,20}$/.test(
      userPassword,
    );
  };

  if (req.path === "/register") {
    if (![email, name, password].every(Boolean)) {
      return res
        .status(401)
        .json("Missing Credentials (All fields are required)");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email Format");
    } else if (!validPassword(password)) {
      return res
        .status(401)
        .json(
          "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a symbol.",
        );
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email");
    }
  }

  next();
}
