const DATA = {
    links: [
        {name: "太初-账户密码管理", url: "https://www.kdocs.cn/l/cfBM4b13LmPS"}
    ],

    communities: [
        {name: "稀土掘金", url: "https://juejin.cn/"},
        {name: "LinuxDo", url: "https://linux.do/"},
        {name: "V2EX", url: "https://www.v2ex.com//"}
    ],

    // 导航数据。所有提示词原文在 prompts.js 中，按 contentId 关联。
    prompts: [{
        category: "提示词框架", items: [
            {title: "提示词模板", contents: [
                    {label: "提示词模板01", contentId: "prompt-template01"},
                    {label: "提示词模板02", contentId: "prompt-template02"},
                    {label: "提示词模板03", contentId: "prompt-template03"},
                ]
            }
        ]},
        {
            category: "项目实现", 
            items: [{ title: "理解与对其", contentId: "project-understand-and-align" }]
        },
    ],
};
