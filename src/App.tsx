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
import React, { useEffect, useState } from "react";
import "./App.css";
import { ContentWrapper } from "./Components/ContentWrapper";
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";
import { Layout } from "./Components/Layout";
import { ScrollContent } from "./Components/ScrollContent";
import { Sider } from "./Components/Sider";
import { SiderItem } from "./Components/SiderItem";
import { Tab } from "./Components/Tab";
import { TabBar } from "./Components/TabBar";
import { logout, useAuth } from "./hooks/useAuth";

function App() {
  const [email, setEmail] = useState("");
  const [psw, setPsw] = useState("");
  const [open, setOpen] = useState(false);
  const { login, isError, isLoading, key, mutate } = useAuth(email, psw);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setInterval(() => {
      (async () => {
        await logout();
        await mutate(key);
      })();
    }, 3000);
  }, []);
  return (
    <div className="App">
      <Header>
        <div className={"logo"}>
          <img src="/logo_netease.png" alt={""} height={64} />
        </div>
        <Button variant="text" onClick={handleClickOpen}>
            登录
          </Button>
          <Button variant="text" onClick={handleClickOpen}>
            登录
          </Button>
          <Button variant="text" onClick={handleClickOpen}>
            登录
          </Button>
          <Button variant="text" onClick={handleClickOpen}>
            登录
          </Button>
      </Header>
      <Layout>
        <Sider>

          {["发现音乐", "私人FM"].map((title, i) => {
            if (i === 0)
              return <SiderItem key={title} text={title} activated></SiderItem>;
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
            {`err:${isError},loading:${isLoading},login:${login}`}
          </ScrollContent>
        </ContentWrapper>
      </Layout>

      <Footer>
        <span>footer</span>
      </Footer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
