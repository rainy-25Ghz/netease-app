import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useLocation, useRouteMatch } from 'react-router';
import { Tab } from './Tab';
import { TabBar } from './TabBar';

interface Props {
    
}
const tabMap=[
    {
        title: "个性推荐",
        path: "personalrecommend",
    },
    {
        title: "歌单",
        path: "lists",
    },
    {
        title: "最新音乐",
        path: "newsongs",
    },
]
export const RecommendTabs = (props: Props) => {
    const [tab, setTab] = useState<number>(0);
    const match=useRouteMatch(tabMap.map(({path})=>`/findmusic/${path}`));
    useLayoutEffect(() => {
       for (let index = 0; index < tabMap.length; index++) {
           const {path} = tabMap[index];
           if(match?.path.indexOf(path)!==-1){
               setTab(index);
               break;
           }
       }
    }, [match])
    return (
        <TabBar>
        {tabMap.map(
            (
                { title, path },
                index,
                arr
            ) => (
                <Tab
                    key={title}
                    title={title}
                    activated={
                        title ===
                        arr[tab].title
                    }
                    path={path}
                    onClick={() => {
                        setTab(index);
                    }}
                />
            )
        )}
    </TabBar>
    )
}
