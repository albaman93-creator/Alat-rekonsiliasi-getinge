# 🎯 GIT QUICK REFERENCE CARD
## Cheat Sheet - Sinkronisasi Remote & Lokal

---

## 📍 SETUP (First Time Only)

```powershell
# Clone fresh dari GitHub
git clone https://github.com/albaman93-creator/Alat-rekonsiliasi-getinge.git
cd Alat-rekonsiliasi-getinge

# OR Existing project - add remote
cd "your-project-folder"
git remote add origin https://github.com/albaman93-creator/Alat-rekonsiliasi-getinge.git
git fetch origin
git pull --rebase origin main

# Verify setup
git remote -v
git status
```

---

## 📅 DAILY ROUTINE (Copy-Paste Ready)

### 🌅 PAGI - Sebelum Mulai Kerja

```powershell
cd "c:\Users\admin\Documents\project codingan\HTML\data mentah"
git fetch origin
git status
git pull --rebase origin main
```

---

### 💻 SIANG - Saat Develop

```powershell
# Lihat apa yang berubah
git status
git diff

# Simpan changes
git add .
git commit -m "✨ feat: Describe your changes"

# Commit message format:
# ✨ feat:    Fitur baru
# 🐛 fix:     Bug fix
# 📚 docs:    Dokumentasi
# 🎨 style:   CSS/formatting
# ♻️ refactor: Refactor kode
# ✅ test:    Test/testing
# 🚀 perf:    Performance
```

---

### 🌙 SORE - Sebelum Push

```powershell
# Pull latest (case ada changes dari user lain)
git pull --rebase origin main

# Push ke GitHub
git push origin main

# Verify success
git log --oneline -1
```

---

## ✏️ BASIC COMMANDS

| Task | Command |
|------|---------|
| **Status** | `git status` |
| **Lihat changes** | `git diff` |
| **Stage all** | `git add .` |
| **Commit** | `git commit -m "msg"` |
| **Pull** | `git pull --rebase origin main` |
| **Push** | `git push origin main` |
| **History** | `git log --oneline` |
| **Current branch** | `git branch` |

---

## 🔀 BRANCH COMMANDS

```powershell
# Create feature branch
git checkout -b feature/nama-fitur

# Switch branch
git checkout main
git checkout feature/nama-fitur

# List branches
git branch -a

# Delete branch (local)
git branch -d feature/nama-fitur

# Delete branch (remote)
git push origin --delete feature/nama-fitur

# Push feature branch
git push -u origin feature/nama-fitur
```

---

## 🔄 SYNC WORKFLOWS

### 📥 Receive Updates Dari GitHub

```powershell
# Option 1: Fetch only (safe)
git fetch origin
git diff HEAD origin/main

# Option 2: Pull with rebase (recommended)
git pull --rebase origin main

# Option 3: Pull with merge
git pull origin main
```

---

### 📤 Send Changes ke GitHub

```powershell
# Step 1: Pull latest
git pull --rebase origin main

# Step 2: Push changes
git push origin main

# Check success
git status  # should show "Your branch is up to date"
```

---

## ⚠️ CONFLICT HANDLING

### Detect
```powershell
git status
# Output: both modified: file.txt
```

### Fix Manual
1. Open `file.txt`
2. Find markers: `<<<<<<< HEAD` ... `=======` ... `>>>>>>>`
3. Keep versi yang benar, hapus yang salah
4. Remove marker lines

### Resolve
```powershell
git add file.txt
git commit -m "Resolve merge conflict"
# atau jika rebase:
git rebase --continue
```

### Abort
```powershell
git merge --abort
git rebase --abort
```

---

## 🆘 UNDO COMMANDS

| Situation | Command |
|-----------|---------|
| **Discard changes di file** | `git restore file.txt` |
| **Discard semua changes** | `git restore .` |
| **Unstage file** | `git restore --staged file.txt` |
| **Undo last commit (keep changes)** | `git reset --soft HEAD~1` |
| **Undo last commit (delete changes)** | `git reset --hard HEAD~1` |
| **Undo pushed commit** | `git revert abc1234` |
| **Cancel merge** | `git merge --abort` |
| **Cancel rebase** | `git rebase --abort` |

---

## 🔧 ADVANCED TRICKS

### Stash (Temporary Save)
```powershell
# Save work in progress
git stash

# Get back
git stash pop

# List stashes
git stash list
```

### Cherry-pick (Ambil Commit Spesifik)
```powershell
# Ambil 1 commit dari branch lain
git cherry-pick abc1234
```

### Rebase Interactive (Squash Commits)
```powershell
# Merge last 3 commits
git rebase -i HEAD~3
# Change 'pick' to 'squash', save, adjust message
```

---

## 🎓 DO's & DON'Ts

| ✅ DO | ❌ DON'T |
|------|----------|
| Commit often | Commit once per day |
| Write clear messages | "fix" atau "update" |
| Pull before push | Push without pulling |
| Use branches | Commit directly to main |
| Review before merge | Merge without review |
| Test locally | Push broken code |
| Use `--rebase` | Use `--force` |
| Fetch regularly | Trust local cache |

---

## 🚨 EMERGENCY COMMANDS

### Lost Commits?
```powershell
# See all commits (even deleted)
git reflog

# Recover
git reset --hard abc1234
```

### Wrong Branch Commit?
```powershell
# Move last commit to feature branch
git checkout -b feature-branch
git checkout main
git reset --hard HEAD~1
```

### Oops, Staged Wrong File?
```powershell
git restore --staged file.txt
```

---

## 📊 CURRENT REPO INFO

```
Repository: https://github.com/albaman93-creator/Alat-rekonsiliasi-getinge.git
Main Branch: main
Pull Strategy: --rebase (recommended)
Commit Format: ✨ feat: ... | 🐛 fix: ...
```

---

## 🔗 GitHub Workflow

### For Feature Development
```powershell
# 1. Create branch
git checkout -b feature/google-lens

# 2. Make changes & commits
git add . && git commit -m "✨ feat: Implement Google Lens"

# 3. Push to GitHub
git push -u origin feature/google-lens

# 4. Open Pull Request on GitHub
#    (Wait for review & approval)

# 5. Merge to main (via GitHub)

# 6. Back to main locally
git checkout main
git pull origin main
git branch -d feature/google-lens
```

---

## 📱 Command Line Quick Tips

### Save Time with Aliases
```powershell
# Add to git config (first time)
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.lo "log --oneline"
git config --global alias.sync "pull --rebase"

# Then use:
git st      # instead of git status
git co dev  # instead of git checkout dev
git sync    # instead of git pull --rebase
```

---

## 📋 BEFORE EVERY PUSH CHECKLIST

```
☐ git status               (no untracked files?)
☐ git diff                 (review changes)
☐ git pull --rebase        (no behind?)
☐ Tests pass locally       (code working?)
☐ No console errors        (clean?)
☐ Commit message clear     (descriptive?)
☐ git push origin main     (push!)
☐ Verify on GitHub         (success?)
```

---

## 🆘 NEED HELP?

```powershell
# Built-in help
git help
git help config
git help commit

# GitHub help
https://docs.github.com/en/get-started

# Visualization
https://learngitbranching.js.org
```

---

**Print & Keep Handy!**  
Version 1.0 | Updated 11 Maret 2026
