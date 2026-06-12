window.COMMAND_GROUPS = [
  {
    id: "linux",
    title: "Linux 命令",
    description: "服务器、网络、进程、文件排查常用命令。",
    items: [
      {
        title: "查看目录占用空间",
        command: "du -sh [目录]",
        description: "-s 只汇总不列子项，-h 人类可读单位; 目标路径为 [目标]/* 表示统计该目录下所有子目录",
      }
    ]
  },
  {
    id: "powershell",
    title: "PowerShell 命令",
    description: "Windows 文件、进程、网络和文本检索常用命令。",
    items: [
      {
        title: "查找匹配文本",
        command: "Select-String -Pattern \"关键字\" -Path [文件路径]",
        description: "在文件或管道输入中按模式查找匹配行，类似 grep；别名 sls。",
      }
    ]
  },
  {
    id: "ai-cli",
    title: "Claude Code / Codex CLI 命令",
    description: "AI 编程助手 CLI 的常用启动、检查和辅助命令。",
    items: [
      {
        title: "查看所有对话窗口",
        command: "/resume",
        description: "列出历史会话，选择后恢复对话。"
      },
      {
        title: "查看当前对话历史记录",
        command: "esc + esc",
        description: "双击 Esc 查看当前会话的历史对话记录，可回退到某条消息。"
      },
      {
        title: "查看模型配置与额度",
        command: "/status",
        description: "查看当前模型配置和模型使用额度情况。"
      }
    ]
  }
];
