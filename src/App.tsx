import React from "react";

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
const test_txt = `
安装
在 React 项目目录运行以下命令：

yarn add swr
或者用 npm:

npm install swr
快速开始
对于返回 JSON 数据的普通 RESTful APIs，首先需要创建一个 fetcher 函数，这个函数只是原生 fetch 的包装：

const fetcher = (...args) => fetch(...args).then((res) => res.json())
如果要使用 GraphQL API 或类似 Axios 的库，可以自己创建 fetcher 函数。 点击 这里 查看更多示例。

然后你可以 import useSWR 并开始在任何函数组件中使用它：

import useSWR from "swr";

function Profile() {
  const { data, error } = useSWR("/api/user/123", fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  // 渲染数据
  return <div>hello {data.name}!</div>
}
通常，一个请求有 3 种可能的状态：“loading”、“ready”或“error”。你可以使用 data 和 error 的值来确定当前的请求状态，并返回相应的 UI。

可复用组件
在构建 web 应用时，你可能需要在 UI 的很多地方重用数据。在 SWR 上创建可重用的数据 hooks 非常容易：

function useUser(id) {
 件中使用它：

function Avatar({ id }) {
  const { user, isLoading, isError } = useUser(id)

  if (isLoading) return <Spinner />
  if (isError) return <Error />
  return <img src={user.avatar} />
}
通过采用这种模式，你可以不必以命令的方式请求数据：开始请求、更新加载状态并返回最终结果。 相反，你的代码更具有声明性：你只需要指定组件使用什么数据即可。

示例
在一个真实的示例中，我们的网站显示一个导航条和内容，都取决于 user：

传统上，我们在顶级组件中使用 useEffect 请求一次数据，然后通过 props 将其传递给子组件（注意，我们现在不处理错误状态）：

// 页面组件

function Page() {
  const [user, setUser] = useState(null)

  // 请求数据
  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => setUser(data))
  }, [])

  // 全局加载状态
  if (!user) return <Spinner />

  return <div>
    <Navbar user={user} />
    <Content user={user} />
  </div>
}

// 子组件

function Navbar({ user }) {
  return <div>
    ...
    <Avatar user={user} />
  </div>
}

function Content({ user }) {
  return <h1>Welcome back, {user.name}</h1>
}

function Avatar({ user }) {
  return <img src={user.avatar} alt={user.name} />
}
通常，我们需要将所有的数据请求都保存在顶级组件中，并为树深处的每个组件添加 props。如果我们给页面添加更多的数据依赖，代码将变得更加难以维护。

虽然我们可以使用 Context 来避免传递 props，但仍然存在动态内容问题：页面内容中的组件可以是动态的，顶级组件可能不知道其子组件将需要什么数据。

SWR 完美地解决了这个问题。使用我们刚刚创建的 useUser hook，可以将代码重构为:

// 页面组件

function Page() {
  return <div>
    <Navbar />
    <Content />
  </div>
}

// 子组件

function Navbar() {
  return <div>
    ...
    <Avatar />
  </div>
}

function Content() {
  const { user, isLoading } = useUser()
  if (isLoading) return <Spinner />
  return <h1>Welcome back, {user.name}</h1>
}

function Avatar() {
  const { user, isLoading } = useUser()
  if (isLoading) return <Spinner />
  return <img src={user.avatar} alt={user.name} />
}
现在数据已 绑定 到需要该数据的组件上，并且所有组件都是相互 独立 的。所有的父组件都不需要关心关于数据或数据传递的任何信息。它们只是渲染。现在代码更简单，更易于维护了。

最棒的是，只会有 1 个请求 发送到 API，因为它们使用相同的 SWR key，因此请求会被自动 去除重复、缓存 和 共享。
`;
function App() {
  return (
    <div className="App">
      <Header></Header>
      <Layout>
        <Sider>
          {[
            "发现音乐",
            "私人FM",
            "发现音乐",
            "私人FM",
            "发现音乐",
            "私人FM",
            "发现音乐",
            "私人FM",
            "发现音乐",
            "私人FM",
            "发现音乐",
            "私人FM",
            "发现音乐",
            "私人FM",
            "发现音乐",
            "私人FM",
            "发现音乐",
            "私人FM",
            "发现音乐",
            "私人FM",
            "发现音乐",
            "私人FM",
            "发现音乐",
            "私人FM",
            "发现音乐",
            "私人FM",
            "发现音乐",
            "私人FM",
            "发现音乐",
            "私人FM",
            "发现音乐",
            "私人FM",
            "发现音乐",
            "私人FM",
            "发现音乐",
            "私人FM",
            "发现音乐",
            "私人FM",
            "发现音乐",
            "私人FM",
            "发现音乐",
            "私人FM",
            "发现音乐",
            "私人FM",
            "发现音乐",
            "私人FM",
            "发现音乐",
            "私人FM",
            "发现音乐",
            "私人FM",
            "发现音乐",
            "私人FM",
            "发现音乐",
            "私人FM",
            "发现音乐",
            "私人FM",
            "发现音乐",
            "私人FM",
            "发现音乐",
            "私人FM",
          ].map((title, i) => {
            if (i === 0) return <SiderItem text={title} activated></SiderItem>;
            else {
              return <SiderItem text={title}></SiderItem>;
            }
          })}
        </Sider>
        <div style={{ flexBasis: "256px" }}></div>
        <ContentWrapper>
          <TabBar>
            {['个性推荐',"歌单","最新音乐"].map((title)=><Tab key={title} title={title} activated={title==="歌单"}/>)}
          </TabBar>
          <ScrollContent>
            <p>{test_txt}</p>
            <p>{test_txt}</p>
            <p>{test_txt}</p>
            <p>{test_txt}</p>
            <p>{test_txt}</p>
            <p>{test_txt}</p>
          </ScrollContent>
        </ContentWrapper>
      </Layout>

      <Footer>
        <span>footer</span>
      </Footer>
    </div>
  );
}

export default App;
