# 导航

个人办公效率导航页。纯静态，无构建、无依赖。

## 运行

双击 `index.html` 即可。

## 部署到 GitHub Pages

仓库根目录放这 5 个文件 → Settings → Pages → Source 选 `main` 分支根目录。

## 数据维护

两个文件分工：

- `data.js` — 轻量元信息（链接、社区、提示词的分类 / title / contentId）
- `prompts.js` — 提示词原文（以 contentId 为 key 的字符串表）

### 新增链接 / 社区

在 `data.js` 的 `links` 或 `communities` 数组追加 `{ name, url }`。

### 新增提示词

1. 在 `prompts.js` 的 `PROMPT_CONTENTS` 追加一条 `'your-id': \`原文\`,`
2. 在 `data.js` 对应分类的 `items` 追加 `{ title: "标题", contentId: "your-id" }`
3. 若要新增整个分类，在 `DATA.prompts` 追加 `{ category, items: [] }`

### 原文转义（仅此两种情况）

| 原文 | 写成 |
|---|---|
| `` ` `` | `` \` `` |
| `${` | `\${` |

其它字符（双引号、反斜杠、换行等）直接写即可。
