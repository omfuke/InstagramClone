import React, { useState } from "react";
import axios from "axios";
import queryString from "query-string";
import { Redirect } from "react-router";
function ResetPassword(props) {
  const [formData, setFormData] = useState({
    email: "",
    password1: "",
    password2: "",
  });

  const [redirect, setRedirect] = useState(false);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //   console.log(queryString.parse(props.location.search).token);
  const { email, password1, password2 } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const token = queryString.parse(props.location.search).token;
    const body = JSON.stringify({ email, password1, password2, token });
    const res = await axios.post("/api/auth/resetPass/", body, config);
    console.log(res.data.msg);
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className="register">
      <p>Email</p>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => onChange(e)}
        placeholder="email"
      ></input>
      <p>New Password</p>
      <input
        type="password"
        name="password1"
        value={password1}
        onChange={(e) => onChange(e)}
        placeholder="password"
      ></input>
      <p>Confirm Password</p>
      <input
        type="password"
        name="password2"
        value={password2}
        onChange={(e) => onChange(e)}
        placeholder="password"
      ></input>
      <div
        onClick={(e) => onSubmit(e)}
        style={{
          backgroundColor: "skyblue",
          textAlign: "center",
          width: "70%",
          margin: "1em auto",
          cursor: "pointer",
        }}
      >
        Set Password
      </div>
    </div>
  );
}

export default ResetPassword;
