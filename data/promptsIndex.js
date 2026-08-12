window.PROMPT_GROUPS = [
  {
    id: "engineering",
    title: "Engineering / 工程构建",
    items: [
      {
        title: "分析项目需求",
        contentId: "project-analyze-requirements"
      },
      {
        title: "明确任务",
        contentId: "project-clarify-task"
      },
      {
        title: "理解与对齐",
        contentId: "project-understand-and-align"
      },
      {
        title: "审视与重构",
        contentId: "project-review-and-refactor"
      },
      {
        title: "plan完成后的审查",
        contentId: "project-review-after-plan-completion"
      },
      {
        title: "优化代码",
        contentId: "project-optimize-code"
      },
      {
        title: "功能校验",
        contentId: "project-function-verification"
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
    id: "meta",
    title: "Meta / 提示词工程",
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
    id: "docs",
    title: "Docs / 文档处理",
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
      },
      {
        title: "文档批判性分析与事实审查",
        contentId: "document-critical-analysis"
      }
    ]
  },
  {
    id: "teaching",
    title: "Teaching / 技术教学",
    items: [
      {
        title: "软件工具快速上手",
        contentId: "software-tool-quick-start"
      }
    ]
  },
  {
    id: "visual",
    title: "Visual / 视觉生成",
    items: [
      {
        title: "提取图片风格",
        contentId: "extract-image-style"
      }
    ]
  },
  {
    id: "emotional",
    title: "Emotional / 情感对话",
    items: [
      {
        title: "表述优化",
        contentId: "expression-optimization"
      },
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
  },
  {
    id: "codex",
    title: "Codex / 任务协同",
    items: [
      {
        title: "整理交接消息并发送父任务",
        contentId: "codex-handoff-send-parent"
      },
      {
        title: "整理交接消息并输出",
        contentId: "codex-handoff-output-copy"
      },
      {
        title: "同步父任务最新状态",
        contentId: "codex-sync-parent-status"
      },
      {
        title:"让主任务分析确认任务是否可以执行",
        contentId: "codex-confirm-task-can-execute"  
      }
    ]
  }
];
