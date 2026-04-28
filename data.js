const DATA = {
    // 论坛
    forum: [
        {name: "稀土掘金", url: "https://juejin.cn/"},
        {name: "LinuxDo", url: "https://linux.do/"},
        {name: "V2EX", url: "https://www.v2ex.com//"}
    ],

    // 教程
    tutorial:[
        {name:"犬小哈",url:"https://www.quanxiaoha.com/"},
        {name:"kelen",url:"https://kelen.cc/"},
        {name:"77il",url:"https://www.77il.cn/"}
    ],

    // 提示词库
    prompts: [
        {
            category: "提示词框架", 
            items: [
                {title: "提示词模板", contents: [
                        {label: "提示词模板01", contentId: "prompt-template01"},
                        {label: "提示词模板02", contentId: "prompt-template02"},
                        {label: "提示词模板03", contentId: "prompt-template03"},
                    ]
                }
        ]},
        {
            category: "项目实现", 
            items: [{ title: "理解与对其", contentId: "project-understand-and-align" }],
            items:[{title:"审视与重构",contentId:"project-review-and-refactor"}],

        },
        {
            category: "文档优化",
            items: [{ title: "梳理对话+提炼结论", contents: [
                {label:"梳理对话",contentId:""}] }]
        }
    ],
};
