const DATA = {
    links: [
        {
            name: "太初-个人工作记录表",
            url: "https://www.kdocs.cn/l/cgZbB6x234xj",
        },
        {
            name: "太初-账户密码管理",
            url: "https://www.kdocs.cn/l/cfBM4b13LmPS",
        },
    ],

    communities: [
        { name: "稀土掘金", url: "https://juejin.cn/" },
        { name: "LinuxDo", url: "https://linux.do/" },
        { name: "V2EX", url: "https://www.v2ex.com//" },
    ],

    // 导航数据。所有提示词原文在 prompts.js 中，按 contentId 关联。
    prompts: [
        {
            category: "理解与对齐",
            items: [{ title: "角色设定 + 任务对齐", contentId: "role-align" }],
        },
        {
            category: "审视与批判",
            items: [
                { title: "代码深度审视与重构建议", contentId: "code-review" },
            ],
        },
        {
            category: "针对 olympus 项目",
            items: [{ title: "Java 后端开发规范", contentId: "olympus" }],
        },
        {
            category: "总结历史对话",
            items: [{ title: "梳理对话工程", contentId: "summary-dialogue" }],
        },
        {
            category: "找 bug 模式",
            items: [{ title: "苏格拉底式调试引导", contentId: "find-bug" }],
        },
        {
            category: "明确任务",
            items: [{ title: "混沌期任务拆解", contentId: "clarify-task" }],
        },
        {
            category: "功能校验模式",
            items: [{ title: "断点验证逻辑", contentId: "verify-feature" }],
        },
        {
            category: "复盘",
            items: [{ title: "架构师视角复盘", contentId: "retrospective" }],
        },
        {
            category: "复现代码",
            items: [
                {
                    title: "手敲复现 staged changes",
                    contentId: "reproduce-code",
                },
            ],
        },
    ],
};
