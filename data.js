const DATA = {
    // 论坛
    forum: [
        { name: "稀土掘金", url: "https://juejin.cn/" },
        { name: "LinuxDo", url: "https://linux.do/" },
        { name: "V2EX", url: "https://www.v2ex.com//" },
    ],

    // 教程
    tutorial: [
        { name: "犬小哈", url: "https://www.quanxiaoha.com/" },
        { name: "kelen", url: "https://kelen.cc/" },
        { name: "77il", url: "https://www.77il.cn/" },
    ],

    // Docs
    docs: [{ name: "hugging-face/docs", url: "https://huggingface.co/docs" }],

    // 提示词库
    prompts: [
        {
            domain: "Engineering",
            label: "Engineering/工程构建",
            categories: [
                {
                    category: "1 general",
                    items: [
                        {
                            title: "提示词模板",
                            contents: [
                                {
                                    label: "提示词模板01",
                                    contentId: "prompt-template01",
                                },
                                {
                                    label: "提示词模板02",
                                    contentId: "prompt-template02",
                                },
                                {
                                    label: "提示词模板03",
                                    contentId: "prompt-template03",
                                },
                            ],
                        },
                        {
                            title: "个性回复/沟通限制",
                            contentId: "prompt-personal-reply",
                        },
                        {
                            title: "提示词优化器",
                            contentId: "prompt-optimizer",
                        },
                    ],
                },
                {
                    category: "2 项目实现",
                    items: [
                        {
                            title: "理解与对其",
                            contentId: "project-understand-and-align",
                        },
                        {
                            title: "审视与重构",
                            contentId: "project-review-and-refactor",
                        },
                        {
                            title: "优化代码",
                            contentId: "project-optimize-code",
                        },
                        {
                            title: "分析项目需求",
                            contentId: "project-analyze-requirements",
                        },
                    ],
                },
                {
                    category: "3 文档处理",
                    items: [
                        { title: "文档整理", contentId: "document-filing" },
                        { title: "文档合并", contentId: "document-mergence" },
                        {
                            title: "梳理对话+提炼结论",
                            contents: [{ label: "梳理对话", contentId: "" }],
                        },
                    ],
                },
                {
                    category: "4 技术教学",
                    items: [
                        {
                            title: "软件工具快速上手",
                            contentId: "software-tool-quick-start",
                        },
                    ],
                },
            ],
        },
        {
            domain: "Visual",
            label: "Visual/视觉生成",
            categories: [
                {
                    category: "图片生成",
                    items: [
                        {
                            title:"提取图片风格",
                            contentId: "extract-image-style",
                        }
                    ],
                }
            ],
        },
        {
            domain: "Emotional",
            label: "Emotional/情感对话",
            categories: [
                {
                    category: "表达修改",
                    items: [
                        {
                            title: "表述优化",
                            contentId: "expression-optimization",
                        },
                    ],
                },
            ],
        },
    ],
};
