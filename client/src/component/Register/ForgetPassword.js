import React, { useState } from "react";
import axios from "axios";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email });

    await axios.post("/api/auth/forgetPass", body, config);
  };
  return (
    <>
      <div className="register">
        <div className="container2">
          <i style={{ margin: "0 auto" }} class="fas fa-lock fa-4x"></i>
          <h4
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              textAlign: "center",
              width: "70%",
              margin: "1em auto",
            }}
          >
            Trouble loggin in ?
          </h4>

          <p
            style={{
              fontSize: "0.8rem",
              textAlign: "center",
              width: "70%",
              margin: "0 auto",
              color: "grey",
            }}
          >
            Enter your email, phone, or username and we'll send you a link to
            get back into your account.
          </p>
          <div>
            <form>
              <input
                className="regInp"
                type="email"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
                placeholder="email"
              ></input>
            </form>
          </div>

          <div
            style={{
              backgroundColor: "skyblue",
              textAlign: "center",
              width: "70%",
              margin: "1em auto",
              cursor: "pointer",
            }}
            onClick={(e) => onSubmit(e)}
          >
            next
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
