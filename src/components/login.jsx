import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [phone, setPhone] = useState("");

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

  const handleLogin = async () => {
    console.log("Logging in user: ", phone);
    if (!phone) return setError("Please enter your phone number");

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      phone: phone,
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
      return;
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
            type="tel"
            placeholder="Enter your phone number"
            className="px-4 py-3 rounded-xl shadow-xl text-black bg-white"
            onChange={handleNumberChange}
            value={phone}
          />
          <button
            className="rounded-xl bg-teal-600 px-4 py-3 shadow-xl hover:bg-teal-400"
            onClick={handleLogin}
          >
            Login
          </button>
        </>
      )}
    </div>
  );
}
