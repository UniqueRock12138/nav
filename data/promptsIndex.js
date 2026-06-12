window.PROMPT_GROUPS = [
  {
    id: "engineering",
    title: "Engineering / 工程构建",
    categories: [
      {
        id: "general",
        title: "1 general",
        items: [
          {
            title: "提示词模板",
            contents: [
              {
                label: "提示词模板01",
                contentId: "prompt-template01"
              },
              {
                label: "提示词模板02",
                contentId: "prompt-template02"
              },
              {
                label: "提示词模板03",
                contentId: "prompt-template03"
              }
            ]
          },
          {
            title: "个性回复/沟通限制",
            contentId: "prompt-personal-reply"
          },
          {
            title: "提示词优化器",
            contentId: "prompt-optimizer"
          }
        ]
      },
      {
        id: "project",
        title: "2 项目实现",
        items: [
          {
            title: "理解与对齐",
            contentId: "project-understand-and-align"
          },
          {
            title: "审视与重构",
            contentId: "project-review-and-refactor"
          },
          {
            title: "优化代码",
            contentId: "project-optimize-code"
          },
          {
            title: "分析项目需求",
            contentId: "project-analyze-requirements"
          },
          {
            title: "明确任务",
            contentId: "project-clarify-task"
          },
          {
            title: "功能校验",
            contentId: "project-function-verification"
          },
          {
            title: "plan完成后的审查",
            contentId: "project-review-after-plan-completion"
          },
          {
            title: "找bug",
            contentId: "project-find-bug"
          },
          {
            title: "实验-反馈-定位诊断",
            contentId: "project-diagnosis-experiment-feedback-location"
          },
          {
            title: "复盘优化",
            contentId: "project-review-and-optimize"
          }
        ]
      },
      {
        id: "docs",
        title: "3 文档处理",
        items: [
          {
            title: "文档整理",
            contentId: "document-filing"
          },
          {
            title: "文档合并",
            contentId: "document-mergence"
          },
          {
            title: "梳理对话+提炼结论",
            contents: [
              {
                label: "梳理对话",
                contentId: "Sort-out-the-dialogue"
              },
              {
                label: "提炼结论",
                contentId: "Extract-the-conclusion"
              }
            ]
          }
        ]
      },
      {
        id: "teaching",
        title: "4 技术教学",
        items: [
          {
            title: "软件工具快速上手",
            contentId: "software-tool-quick-start"
          }
        ]
      }
    ]
  },
  {
    id: "visual",
    title: "Visual / 视觉生成",
    categories: [
      {
        id: "image",
        title: "图片生成",
        items: [
          {
            title: "提取图片风格",
            contentId: "extract-image-style"
          }
        ]
      }
    ]
  },
  {
    id: "emotional",
    title: "Emotional / 情感对话",
    categories: [
      {
        id: "expression",
        title: "表达修改",
        items: [
          {
            title: "表述优化",
            contentId: "expression-optimization"
          }
        ]
      },
      {
        id: "dialogue",
        title: "深度对话",
        items: [
          {
            title: "判断内容类型",
            contentId: "classify-content-type"
          },
          {
            title: "观点/方法论类对话",
            contentId: "dialogue-opinion"
          },
          {
            title: "情绪/关系类对话",
            contentId: "dialogue-emotion"
          }
        ]
      }
    ]
  }
];
