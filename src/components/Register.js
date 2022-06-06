import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./register.css";

const USER_REGEX = /^[a-zA-Z]\w{3,23}$/; //with first letter character total character must be 4 to 24.
const PWD_REGES = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Register() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [focusUser, setFocusUser] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [focusPwd, setFocusPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [focusMatch, setFocusMatch] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setValidName(USER_REGEX.test(user)); //the test method of regex test whether passing argument match or not gives result true if match otherwise false;
  }, [user]);
  useEffect(() => {
    setValidPwd(PWD_REGES.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  return (
    <section>
      <h2>User Registration</h2>
      <form>
        <label htmlFor="userName">
          User Name:
          <span className={validName ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validName || !user ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="text"
          id="userName"
          ref={userRef}
          required
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          aria-invalid={validName ? "false" : "true"}
          area-describedby="uidnote"
          onFocus={() => setFocusUser(true)}
          onBlur={() => setFocusUser(false)}
        />
        <p
          id="uidnote"
          className={
            focusUser && user && !validName ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters.
          <br />
          Letters, numbers, underscores, hyphens allowed.
        </p>
        <label htmlFor="password">
          Password:
          <span className={validPwd ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validPwd || !pwd ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="password"
          id="password"
          required
          onChange={(e) => setPwd(e.target.value)}
          area-invalid={validPwd ? "false" : "true"}
          area-describedby="pidnote"
          onFocus={() => setFocusPwd(true)}
          onBlur={() => setFocusPwd(false)}
        />
        <p
          id="pidnote"
          className={focusPwd && !validPwd ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number and a special
          character.
          <br />
          Allowed special characters:{" "}
          <span aria-label="exclamation mark">!</span>
          <span aria-label="at symblo">@</span>
          <span aria-label="hashtag">#</span>
          <span aria-label="dollar sign">$</span>
          <span aria-label="percent">%</span>
        </p>
        <label htmlFor="confirmPassword">
          Confirm Password:
          <span className={pwd && validMatch ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="password"
          id="confirmPassword"
          required
          onChange={(e) => setMatchPwd(e.target.value)}
          onFocus={() => setFocusMatch(true)}
          onBlur={() => setFocusMatch(false)}
        />
        <p
          id="confirmnote"
          className={focusMatch && !validMatch ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match the first password field.
        </p>
        <button disabled={!validName || !validPwd || !validMatch}>
          Sign Up
        </button>
      </form>
      <p>Already Registered?</p>
      <a href="#">Sign In</a>
    </section>
  );
}

export default Register;
