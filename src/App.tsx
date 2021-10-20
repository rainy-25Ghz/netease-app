import React, {
	useRef,
	useState,
} from "react";
import "./App.css";
import { ContentWrapper } from "./Components/ContentWrapper";
import { Footer } from "./Components/Footer";
import { Header, HeaderContent } from "./Components/Header";
import { Layout } from "./Components/Layout";
import { ScrollContent } from "./Components/ScrollContent";
import { Sider } from "./Components/Sider";
import {
	checkCookie,
	login,
	LoginStatusContext,
	logout,
} from "./hooks/useAuth";
import {
	Route,
	BrowserRouter as Router,
	Switch,
	Redirect,
} from "react-router-dom";
import { red } from "@mui/material/colors";
import { styled } from "@mui/system";
import {
	Avatar,
	Box,
	Button,
	createTheme,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	ThemeProvider,
	Typography,
} from "@mui/material";
import { LoginOutlined, LogoutOutlined } from "@mui/icons-material";
import useSWR from "swr";
import { useMount } from "./hooks/useMount";
import { Carousel } from "./Components/Carousel";
import { fetcher } from "./util/network";
import { StyledArrowLeft, StyledArrowRight } from "./Components/Arrow";
import { Title } from "./Components/Title";
import { RecommendList } from "./Components/RecommendList";
import { PrivateContent } from "./Components/PrivateContent";
import { NewSongsList } from "./Components/NewSongsList";
import { RecommendMv } from "./Components/RecommendMv";
import { RecommendTabs } from "./Components/RecommendTabs";
import { MusicLists } from "./Components/MusicLists";
import { LatestSongs } from "./Components/LatestSongs";
import { MusicContext } from "./util/context";
import { MusicPlayer } from "./Components/MusicPlayer";
import { Videos } from "./Components/Videos";
import { VideoPlayer } from "./Components/VideoPlayer";
import { MusicList } from "./Components/MusicList";

const StyledAvatar = styled(Avatar)`
	margin-right: 8px;
`;

const StyledNickName = styled(Typography)`
	color: white;
	width: 64px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

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
	const [uid, setUid] = useState<number | null>(null);
	const { data: user } = useSWR(
		() => `/user/detail?uid=${uid}`,
		fetcher
	);
	const [songIds, setSongIds] = useState<number[]>([]);
	const [artists, setArtists] = useState<string>("");
	const [duration, setDuration] = useState<string>("");
	const [name, setName] = useState<string>("");
	const [url, setUrl] = useState<string>("");
	const [currI, setCurrI] = useState(-1);

	useMount(() => {
		const cookie_ = window.localStorage.getItem("cookie");
		const uid_ = window.localStorage.getItem("uid");
		if (cookie_ && uid_) {
			document.cookie = cookie_;
			setLoginStatus(true);
			setOpen(false);
			setUid(parseInt(uid_));
		} else {
			setLoginStatus(false);
			setOpen(true);
		}
	});

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleLogin = () => {
		login(phone.current, psw.current).then((res) => {
			if (res.code === 200) {
				setOpen(false);
				setLoginStatus(true);
				setErrTextField(false);
				setUid(res?.account?.id);
				window.localStorage.setItem(
					"uid",
					JSON.stringify(res?.account?.id)
				);
				window.localStorage.setItem("cookie", document.cookie);
				// console.log(document.cookie);
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
				setUid(null);
				window.localStorage.removeItem("uid");
				window.localStorage.removeItem("cookie");
				// window.location.reload();
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

	const renderHeader = () => {
		return (
			<Header>
				<HeaderContent>
					<div className={"logo"}>
						<img src="/logo_netease.png" alt={""} height={64} />
					</div>
					{!loginStatus ? (
						<StyledButton
							onClick={handleClickOpen}
							startIcon={<LoginOutlined />}
						>
							登录
						</StyledButton>
					) : (
						<>
							<StyledAvatar
								alt=""
								src={user?.profile?.avatarUrl}
							/>
							<StyledNickName variant="body2">
								{user?.profile?.nickname}
							</StyledNickName>
							<StyledButton
								onClick={handleLogout}
								startIcon={<LogoutOutlined />}
							>
								登出
							</StyledButton>
						</>
					)}
				</HeaderContent>
			</Header>
		);
	};

	return (
		<LoginStatusContext.Provider value={{ loginStatus, uid }}>
			<ThemeProvider theme={theme}>
				<Router>
					<div className="App">
						{renderHeader()}
						<Layout>
							<Sider></Sider>
							<Box sx={{ flexBasis: "256px" }}></Box>
							<ContentWrapper>
								<Switch>
									<Route path="/findmusic">
										<RecommendTabs></RecommendTabs>
									</Route>
									<Route path="*">{null}</Route>
								</Switch>
								<ScrollContent>
									<MusicContext.Provider
										value={{
											name,
											url,
											artists,
											duration,
											setSongIds,
											songIds,
											currI,
											setArtists,
											setDuration,
											setUrl,
											setName,
											setCurrI,
										}}
									>
										<Switch>
											<Route path="/findmusic">
												<Switch>
													<Route path="/findmusic/personalrecommend">
														<Carousel
															{...{
																dots: false,
																infinite: true,
																slidesToShow: 1,
																slidesToScroll: 1,
																autoplay: true,
																autoplaySpeed: 2000,
																nextArrow: (
																	<StyledArrowRight />
																),
																prevArrow: (
																	<StyledArrowLeft />
																),
															}}
														/>
														<Title>推荐歌单</Title>
														<RecommendList />
														<Title>独家放送</Title>
														<PrivateContent />
														<Title>最新音乐</Title>
														<NewSongsList />
														<Title>推荐MV</Title>
														<RecommendMv />
													</Route>
													<Route path="/findmusic/lists">
														<MusicLists></MusicLists>
													</Route>
													<Route path="/findmusic/newsongs">
														<LatestSongs></LatestSongs>
													</Route>
													<Redirect
														to={{
															pathname:
																"/findmusic/personalrecommend",
														}}
													></Redirect>
												</Switch>
											</Route>
											<Route path="/videos">
												<Switch>
													<Route
														path="/videos/:vid"
														children={
															<VideoPlayer />
														}
													></Route>
													<Route path="/videos">
														<Videos></Videos>
													</Route>
												</Switch>
											</Route>
											<Route
												path="/list/:id"
												children={
													<MusicList></MusicList>
												}
											></Route>
											<Redirect
												to={{
													pathname:
														"/findmusic/personalrecommend",
													state: { from: "/" },
												}}
											></Redirect>
										</Switch>
									</MusicContext.Provider>
								</ScrollContent>
							</ContentWrapper>
						</Layout>

						<Footer>
							<MusicContext.Provider
								value={{
									name,
									url,
									artists,
									duration,
									setSongIds,
									songIds,
									setArtists,
									setDuration,
									setUrl,
									setName,
									currI,
									setCurrI,
								}}
							>
								<MusicPlayer></MusicPlayer>
							</MusicContext.Provider>
						</Footer>
						<Dialog open={open}>
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
