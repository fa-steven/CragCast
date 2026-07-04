# Setting up CragCast as a Claude Project

There are two mechanisms, and they do different jobs. Use one or both.

## Path A — Claude Code (works directly on your local files)
This is the one that reads and edits the actual codebase on your machine. Claude Code auto-loads `CLAUDE.md` at the start of every session and applies it across all conversations in that directory.

1. Install Claude Code (Node.js required): `npm install -g @anthropic-ai/claude-code`
   Docs: https://docs.claude.com/en/docs/claude-code/overview
2. Put this whole folder under version control if it isn't already (`git init`) — `CLAUDE.md` is shared via git and Claude Code derives the project from the repo.
3. From the repo root, run `claude`. It reads `CLAUDE.md` automatically; the `docs/` files are there for it to open when relevant.
4. Work naturally: "add a crag to Vantage," "lengthen the seepage decay for Index only," "add a dew-point term to the drying rate." It edits `index.html` in place.

`CLAUDE.md` is intentionally short (a behavioral contract + architecture index). Deep detail lives in `docs/` so it only loads when needed. To make a rule permanent mid-session, prefix a line with `#` and Claude Code offers to save it.

Reference: Claude Code memory — https://code.claude.com/docs/en/memory

## Path B — a Claude.ai Project (chat workspace, no local file access)
Best for planning, domain Q&A, and generating code to paste back — grounded in the app's knowledge, without touching your disk.

1. Go to https://claude.ai/projects → **+ New Project**. Name it "CragCast," add a one-line description.
2. **Set project instructions:** paste the contents of `PROJECT_INSTRUCTIONS.md`. These apply to every chat in the project.
3. **Add to project knowledge** (the drop-box): upload `index.html`, `docs/conditions-model.md`, and `docs/crag-guide.md`. Claude indexes them and references them automatically. Note: context isn't shared between chats *unless* it's in the knowledge base — that's why the code and docs go there, not just into one conversation.

Projects and project instructions are richest on paid plans (Pro/Max/Team/Enterprise), which also enable RAG so the knowledge base scales past the context window.
Reference: What are projects — https://support.claude.com/en/articles/9517075 · Create & manage — https://support.claude.com/en/articles/9519177

## Which to use
- Editing the app, running it, shipping changes → **Path A (Claude Code).**
- Thinking through the model, asking crag/conditions questions, drafting features to paste in → **Path B (Project).**
- Both, pointed at the same repo/docs, is the sweet spot: iterate in the Project, implement with Claude Code.

## Keeping it current
When the model or crag data changes, update `docs/conditions-model.md` and `docs/crag-guide.md` in the repo (Path A picks them up automatically), and re-upload them to the Project knowledge base (Path B doesn't auto-sync from disk).
