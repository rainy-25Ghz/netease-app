import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { styled } from "@material-ui/system";
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { ContentWrapper } from "./Components/ContentWrapper";
import { Footer } from "./Components/Footer";
import { Header, HeaderContent } from "./Components/Header";
import { Layout } from "./Components/Layout";
import { ScrollContent } from "./Components/ScrollContent";
import { Sider } from "./Components/Sider";
import { SiderItem } from "./Components/SiderItem";
import { Tab } from "./Components/Tab";
import { TabBar } from "./Components/TabBar";
import { checkCookie, login, logout } from "./hooks/useAuth";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
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
  const [loginStatus,setLoginStatus]=useState(checkCookie());

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleLogin = () => {
    login(phone.current, psw.current)
      .then((res) => {
        if (res.code === 200) {
          setOpen(false);
          setLoginStatus(true);
          setErrTextField(false);
        } else {
          setErrTextField(true);
        }
      })
     
  };

  const handleLogout = () => {
    logout().then(() => {
      setLoginStatus(false);
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

  // useEffect(() => {
  //   setInterval(() => {
  //     (async () => {
  //       await logout();
  //       await mutate(key);
  //     })();
  //   }, 3000);
  // }, []);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header>
          <HeaderContent>
            <div className={"logo"}>
              <img src="/logo_netease.png" alt={""} height={64} />
            </div>
            <StyledButton onClick={handleClickOpen}>登录</StyledButton>
            <StyledButton
              onClick={handleLogout}
            >
              登出
            </StyledButton>
          </HeaderContent>
        </Header>
        <Layout>
          <Sider>
            {["发现音乐", "私人FM"].map((title, i) => {
              if (i === 0)
                return (
                  <SiderItem key={title} text={title} activated></SiderItem>
                );
              else {
                return <SiderItem key={title} text={title}></SiderItem>;
              }
            })}
          </Sider>
          <div style={{ flexBasis: "256px" }}></div>
          <ContentWrapper>
            <TabBar>
              {["个性推荐", "歌单", "最新音乐"].map((title) => (
                <Tab key={title} title={title} activated={title === "歌单"} />
              ))}
            </TabBar>
            <ScrollContent>
              {`login:${loginStatus}`}
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
    </ThemeProvider>
  );
}

export default App;
