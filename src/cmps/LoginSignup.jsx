import { useState, useEffect } from "react"
import { userService } from "../services/user.service"
import { ImgUploader } from "./ImgUploader"
import { BarndedBtn } from "./barnded-btn"
import UploadButtonComponent from "./NewImgUploader"

export function LoginSignup({ onLoginm, onSignup, onToggleLogin }) {
  const [isSignup, setIsSignup] = useState(false)
  const [users, setUsers] = useState([])
  const [imgUrl, setImgUrl] = useState("")

  useEffect(() => {
    // loadUsers()
  }, [])

  function handleUploadComplete(img_Url) {
    const currectUrl = RegExp(/http/).test(img_Url)
    if (!currectUrl) return
    setImgUrl(img_Url)
    console.log("imgUrl", imgUrl)
  }

  async function loadUsers() {
    const users = await userService.getUsers()
    setUsers(users)
  }

  function clearState() {
    setCredentials({ username: "", password: "", fullname: "", imgUrl: "" })
    setIsSignup(false)
  }

  function handleChange(ev) {
    const field = ev.target.name
    const value = ev.target.value
    setCredentials({ ...credentials, [field]: value })
  }

  function onLogin(ev = null) {
    if (ev) {
      ev.preventDefault()
    }

    if (!credentials.username) return
    props.onLogin(credentials)
    clearState()
  }

  function onSignup(ev = null) {
    if (ev) ev.preventDefault()
    if (!credentials.username || !credentials.password || !credentials.fullname)
      return
    props.onSignup(credentials)
    clearState()
  }

  function toggleSignup() {
    setIsSignup(!isSignup)
  }

  function onUploaded(imgUrl) {
    setCredentials({ ...credentials, imgUrl })
  }

  return (
    <div className="modal-backdrop">
      <div className="login-modal">
        <div className="login-modal-header">
          <span className="close-btn" onClick={() => onToggleLogin(false)}>
            &times;
          </span>
          <div>{isSignup ? "Sign Up" : "Log in"}</div>
        </div>
        <form onSubmit={isSignup ? onSignup : onLogin} className="login-form">
          {isSignup && (
            <label htmlFor="fullname">
              <span className="red-dot">*</span> Full Name:
            </label>
          )}
          {isSignup && (
            <input
              type="text"
              name="fullname"
              className="input input-fullname"
              // value={credentials.fullname}
              onChange={handleChange}
              required
            />
          )}
          <label htmlFor="username">
            <span className="red-dot">*</span> Username:
          </label>
          <input
            type="text"
            name="username"
            className="input input-username"
            onChange={handleChange}
            required
          />
          <label htmlFor="password">
            <span className="red-dot">*</span> Password:
          </label>
          <input
            type="password"
            name="password"
            className="input input-password"
            onChange={handleChange}
            required
          />
          {/* {isSignup && <ImgUploader onUploaded={onUploaded} />} */}
          {imgUrl && isSignup && (
            <div>
              <div className="img-container flex align-center">
                <h1>
                  <span className="red-dot">*</span>
                  Avatar:{" "}
                </h1>
                <img
                  src={imgUrl}
                  className="uploaded-img"
                  style={{ marginInlineStart: ".5rem" }}
                />
              </div>

              <div>
                <span className="change-img-btn" onClick={() => setImgUrl("")}>
                  Change
                </span>
              </div>
            </div>
          )}

          {!imgUrl && isSignup && (
            <UploadButtonComponent onComplete={handleUploadComplete} />
          )}

          <button className="btn btn-primary">
            <BarndedBtn txt={isSignup ? "Sign Up" : "Login"} />
          </button>
        </form>

          <div className="divider-container">
            <div className="divider-line"></div>
            <div className="divider-text">or</div>
            <div className="divider-line"></div>
          </div>
          <div className="footer-btn flex align-center justify-center">
          <button className="btn">Demo Login (As Guest)</button>
          <button className="btn btn-secondary" onClick={toggleSignup}>
            {isSignup ? "Login" : "Sign Up"}
          </button>
          </div>
      </div>
    </div>
  )
}
