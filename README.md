# 个人工具导航

GitHub Pages 托管的个人效率工具门户。纯静态实现，无构建、无依赖。

## 运行

双击 `index.html` 即可。

## 页面结构

- `index.html`：首页，总入口。
- `prompts.html`：LLM 提示词库。
- `commands.html`：常用命令。
- `nav.html`：网页导航，包含论坛、教程、Docs、算法刷题、编程练习。

## 目录结构

```text
/
├─ index.html
├─ prompts.html
├─ commands.html
├─ nav.html
├─ css/
│  ├─ base.css
│  ├─ layout.css
│  └─ components.css
├─ js/
│  ├─ app.js
│  ├─ copy.js
│  ├─ renderCommands.js
│  ├─ renderPrompts.js
│  └─ renderLinks.js
├─ data/
│  ├─ commands.js
│  ├─ navLinks.js
│  └─ promptsIndex.js
└─ prompts/
   ├─ engineering/
   ├─ visual/
   └─ emotional/
```

## 数据维护

### 新增常用命令

在 `data/commands.js` 对应分组的 `items` 中追加：

```js
{
  title: "命令标题",
  command: "your command",
  description: "命令说明"
}
```

当前命令分组：

- Linux 命令
- PowerShell 命令
- Claude Code / Codex CLI 命令

### 新增导航链接

在 `data/navLinks.js` 对应分组的 `items` 中追加：

```js
{
  title: "站点名称",
  url: "https://example.com/",
  description: "站点说明"
}
```

### 新增提示词

1. 在 `prompts/` 对应分类文件中向 `PROMPT_CONTENTS` 追加一条内容。
2. 在 `data/promptsIndex.js` 对应分类的 `items` 中追加索引。

示例：

```js
// prompts/engineering/general.js
Object.assign(PROMPT_CONTENTS, {
  "your-id": `提示词原文`
});
```

```js
// data/promptsIndex.js
{
  title: "提示词标题",
  contentId: "your-id"
}
```

多段提示词使用：

```js
{
  title: "提示词组",
  contents: [
    { label: "版本 1", contentId: "id-1" },
    { label: "版本 2", contentId: "id-2" }
  ]
}
```

### 提示词原文转义

模板字符串中只需要特别处理两类字符：

| 原文 | 写成 |
|---|---|
| `` ` `` | `` \` `` |
| `${` | `\${` |

其它字符通常可以直接写。

## 部署到 GitHub Pages

仓库根目录保留静态文件后，在 GitHub 仓库 Settings -> Pages 中选择对应分支和根目录发布。
