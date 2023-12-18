export default function LoginComponent() {
    return (
        <>
        <div>
            <label>Username</label>
            <input type="text" placeholder="Enter Username"></input>

            <label>Password</label>
            <input type="password"></input>

            <button type="submit">Login</button>
        </div>
          {/* <div class="container">
            <label for="uname"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="uname" required>

            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" required>

            <button type="submit">Login</button>
            <label>
            <input type="checkbox" checked="checked" name="remember"> Remember me
            </label>
            </div> */}
        </>
    )
}
