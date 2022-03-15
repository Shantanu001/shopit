// create and send the token in cookie

const sendToken = (user, status, res) => {
  // create token
  const token = user.getJwtToken();

  // add option to cookie

  const option = {
    expires: new Date(Date.now() + 10000000),
    httpOnly: true,
  };
  console.log("i am here");
  res.status(200).cookie('token', token, option).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;
