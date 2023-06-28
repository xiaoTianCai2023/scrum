function LoginWrap(props) {
    return (
        <div className="login_wrap">
            <header className="css-Jira"></header>
            <div className="login_box_wrap">{props.children} </div>
        </div>

    )
}

export default LoginWrap;