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
        title: "续行符",
        command: "`",
        description: "反引号`是 PowerShell 的续行符，表示命令下一行继续",
      },
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
        title: "【通用】查看所有对话窗口",
        command: "/resume",
        description: "列出历史会话，选择后恢复对话。"
      },
      {
        title: "【通用】查看当前对话历史记录",
        command: "esc + esc",
        description: "双击 Esc 查看当前会话的历史对话记录，可回退到某条消息。"
      },
      {
        title: "【通用】查看模型配置与额度",
        command: "/status",
        description: "查看当前模型配置和模型使用额度情况。"
      },
      {
        title: "【claude code】复制ai的响应内容",
        command: "/copy [n]",
        description: "将最后一个助手响应复制到剪贴板。传递数字 N 以复制第 N 个最新响应：/copy 2 复制倒数第二个。"
      },
      {
        title: "【codex】复制ai的响应内容",
        command: "/copy",
        description: "只能复制**最新一条** Codex 的回复到剪贴板"
      },
      {
        title: "【claude code】当前对话导出为纯文本",
        command: "/export",
        description: "可以选择复制到粘贴板或保存为txt文件"
      },
    ]
  }
];
