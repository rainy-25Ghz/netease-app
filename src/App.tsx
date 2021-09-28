import React, { createContext, useEffect, useRef, useState } from "react";
import "./App.css";
import { ContentWrapper } from "./Components/ContentWrapper";
import { Footer } from "./Components/Footer";
import { Header, HeaderContent } from "./Components/Header";
import { Layout } from "./Components/Layout";
import { ScrollContent } from "./Components/ScrollContent";
import { Sider } from "./Components/Sider";
import { SiderLink } from "./Components/SiderLink";
import { Tab } from "./Components/Tab";
import { TabBar } from "./Components/TabBar";
import { checkCookie, login, LoginStatusContext, logout } from "./hooks/useAuth";
import {
	Link,
	Route,
	BrowserRouter as Router,
	Switch,
	Redirect,
	useHistory,
} from "react-router-dom";
import { red } from "@mui/material/colors";
import { styled } from "@mui/system";
import { Button, createTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, ThemeProvider } from "@mui/material";
import { LoginOutlined, LogoutOutlined } from "@mui/icons-material";


const StyledButton = styled(Button)`
	color: white;
`;
const theme = createTheme({
	palette: {
		primary: red,
	},
});


function App() {
	const phone = useRef("");
	const psw = useRef("");
	const [open, setOpen] = useState(false);
	const [errTextField, setErrTextField] = useState(false);
	const [loginStatus, setLoginStatus] = useState(checkCookie());
	
  const handleClickOpen = () => {
		setOpen(true);
	};

	const handleLogin = () => {
		login(phone.current, psw.current).then((res) => {
			if (res.code === 200) {
        
				setOpen(false);
				setLoginStatus(true);
				setErrTextField(false);
			} else {
				setErrTextField(true);
			}
		});
	};

	const handleLogout = () => {
		logout().then((res) => {
      console.log(res);
			if (res.code === 200) { 
				setLoginStatus(false);
			}
		});
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handlePhoneChange: React.ChangeEventHandler<
		HTMLInputElement | HTMLTextAreaElement
	> = (e) => {
		phone.current = e.target.value;
	};

	const handlePswChange: React.ChangeEventHandler<
		HTMLInputElement | HTMLTextAreaElement
	> = (e) => {
		psw.current = e.target.value;
	};

	return (
		<LoginStatusContext.Provider value={loginStatus}>
			<ThemeProvider theme={theme}>
				<Router>
					<div className="App">
						<Header>
							<HeaderContent>
								<div className={"logo"}>
									<img
										src="/logo_netease.png"
										alt={""}
										height={64}
									/>
								</div>
								{!loginStatus ? (
									<StyledButton onClick={handleClickOpen} startIcon={<LoginOutlined/>}>
										登录
									</StyledButton>
								) : (
                  // <Avatar alt="" src="/static/images/avatar/1.jpg" />
									<StyledButton onClick={handleLogout} startIcon={<LogoutOutlined/>}>
										登出
									</StyledButton>
								)}
							</HeaderContent>
						</Header>
						<Layout>
							<Sider>
								<SiderLink
									activated
									path="/findmusic"
									text="发现音乐"
								/>
								<SiderLink path="/personalFM" text="私人FM" />
							</Sider>
							<div style={{ flexBasis: "256px" }}></div>
							<ContentWrapper>
								<TabBar>
									{["个性推荐", "歌单", "最新音乐"].map(
										(title) => (
											<Tab
												key={title}
												title={title}
												activated={title === "歌单"}
											/>
										)
									)}
								</TabBar>
								<ScrollContent>
									{`login:${loginStatus}`}<br/>
									<Switch>
										<Route path="/findmusic">
											<div>faxian</div>
										</Route>
										<Route path="/personalFM">
											<div>FM</div>
										</Route>
										<Redirect
											to={{
												pathname: "/findmusic",
												state: { from: "/" },
											}}
										></Redirect>
									</Switch>
								</ScrollContent>
							</ContentWrapper>
						</Layout>

						<Footer>
							<span>footer</span>
						</Footer>
						<Dialog open={open} onClose={handleClose}>
							<DialogTitle>登录</DialogTitle>
							<DialogContent>
								<DialogContentText>
									请输入网易云音乐的手机号与密码
								</DialogContentText>
								<TextField
									autoFocus
									margin="dense"
									id="name"
									label="手机号"
									type="phone"
									fullWidth
									variant="standard"
									onChange={handlePhoneChange}
								/>
								<TextField
									error={errTextField}
									autoFocus
									margin="dense"
									id="name"
									label="密码"
									type="password"
									fullWidth
									variant="standard"
									onChange={handlePswChange}
									helperText={errTextField ? "登录失败" : ""}
								/>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleLogin}>提交</Button>
								<Button onClick={handleClose}>取消</Button>
							</DialogActions>
						</Dialog>
					</div>
				</Router>
			</ThemeProvider>
		</LoginStatusContext.Provider>
	);
}

export default App;
