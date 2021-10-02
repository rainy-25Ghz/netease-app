import React, { useState } from 'react'
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
