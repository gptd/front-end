import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [verify, setVerify] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const handleNumberChange = (event) => {
    let { value } = event.target;

    // Check if value matches this regex pattern ^\+[1-9]\d{1,14}$
    if (!/^\+[1-9]\d{1,14}$/.test(value)) {
      setError("Please enter a valid phone number, e.g. +1234567890");
      setPhone(value);
      return;
    }

    setError(null);
    setPhone(value);
  };

  const handleRegister = async () => {
    console.log("Registering user: ", phone, password);
    if (!password || !phone)
      return setError("Please enter your phone number and password");

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      phone: phone,
      password: password,
    });

    setLoading(false);

    if (error) {
      console.log("Error code: ", error.code);
      console.log("Error message: ", error.message);
      return;
    }

    setVerify(true);
  };

  const handleVerify = async () => {
    console.log("Verifying code: ", verificationCode);
    if (!verificationCode)
      return setError("Please enter your verification code");

    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      phone: phone,
      token: verificationCode,
      type: "sms",
    });

    if (error) {
      console.log("Error code: ", error.code);
      console.log("Error message: ", error.message);
    }

    setLoading(false);
    navigate("/");
  };

  return (
    <div className="flex flex-col gap-4">
      {error && <p className="text-red-500">{error}</p>}

      {verify ? (
        <>
          <input
            id="verificationCode"
            type="text"
            placeholder="Enter your verification code"
            className="px-4 py-3 rounded-xl shadow-xl text-black bg-white"
            onChange={(event) => setVerificationCode(event.target.value)}
            value={verificationCode}
          />
          <button
            className="rounded-xl bg-teal-600 px-4 py-3 shadow-xl hover:bg-teal-400"
            onClick={handleVerify}
          >
            {loading ? "Loading..." : "Verify"}
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Phone Number"
            className="px-4 py-3 rounded-xl shadow-xl bg-white text-black"
            onChange={handleNumberChange}
            value={phone}
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="px-4 py-3 rounded-xl shadow-xl bg-white text-black"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
          <button
            className="rounded-xl bg-teal-600 px-4 py-3 shadow-xl hover:bg-teal-400"
            onClick={handleRegister}
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </>
      )}
    </div>
  );
}
