# 🔄 PANDUAN GIT SYNC - REMOTE & LOKAL
## Sinkronisasi Repository GitHub dengan Local Machine

**Bahasa**: Indonesia  
**Tanggal**: 11 Maret 2026  
**Repository**: https://github.com/albaman93-creator/Alat-rekonsiliasi-getinge.git

---

## 📋 DAFTAR ISI

1. [Setup Awal (First Time)](#setup-awal-first-time)
2. [Daily Workflow](#daily-workflow)
3. [Git Commands Lengkap](#git-commands-lengkap)
4. [Pull & Merge Strategies](#pull--merge-strategies)
5. [Conflict Resolution](#conflict-resolution)
6. [Push & Pull](#push--pull)
7. [Branch Management](#branch-management)
8. [Undoing Changes](#undoing-changes)
9. [Advanced Git](#advanced-git)
10. [Troubleshooting](#troubleshooting)

---

## 🚀 SETUP AWAL (First Time)

### Option A: Fresh Clone (Recommended untuk Start Baru)

```powershell
# Buka Command Prompt / PowerShell
# Navigate ke folder yang ingin project

cd Documents\Projects

# Clone repository dari GitHub
git clone https://github.com/albaman93-creator/Alat-rekonsiliasi-getinge.git

# Masuk ke folder project
cd Alat-rekonsiliasi-getinge

# Cek status
git status
```

**Output yang diharapkan:**
```
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

---

### Option B: Existing Project - Add Remote

Jika sudah ada proyek lokal dan ingin connect ke GitHub:

```powershell
cd "c:\Users\admin\Documents\project codingan\HTML\data mentah"

# Setup remote URL
git remote add origin https://github.com/albaman93-creator/Alat-rekonsiliasi-getinge.git

# Verify remote
git remote -v
# Output:
# origin  https://github.com/albaman93-creator/Alat-rekonsiliasi-getinge.git (fetch)
# origin  https://github.com/albaman93-creator/Alat-rekonsiliasi-getinge.git (push)

# Fetch semua data dari GitHub
git fetch origin

# Merge remote ke local
git merge origin/main

# Atau pull sekaligus (fetch + merge)
git pull origin main
```

---

### Option C: Jika Repo Sudah Ada di Local (Alternate Remote)

```powershell
# Cek remote yang sudah ada
git remote -v

# Jika belum ada, tambah
git remote add origin https://github.com/albaman93-creator/Alat-rekonsiliasi-getinge.git

# Jika sudah ada tapi URL berbeda, update
git remote set-url origin https://github.com/albaman93-creator/Alat-rekonsiliasi-getinge.git

# Verify
git remote -v
```

---

## 📅 DAILY WORKFLOW

### Pagi - Sebelum Mulai Kerja

```powershell
# 1. Go to project folder
cd "c:\Users\admin\Documents\project codingan\HTML\data mentah"

# 2. Check current branch
git branch
# Output: * main (asterisk = current branch)

# 3. Fetch latest dari GitHub (tidak modify local)
git fetch origin
# Output: From https://github.com/albaman93-creator/Alat-rekonsiliasi-getinge
#         (no changes) atau (summary of new commits)

# 4. Check if local di behind remote
git status
# Output: On branch main
#         Your branch is up to date with 'origin/main'

# JIKA di behind:
# 5a. Pull latest changes
git pull origin main
# atau
git pull --rebase origin main  (lebih clean history)

# JIKA conflict ada:
# 5b. Fix conflicts (lihat section CONFLICT RESOLUTION)
# 6b. Complete merge/rebase
git rebase --continue
# atau
git merge --continue
```

---

### Siang - Saat Develop

```powershell
# 1. Check status sebelum mulai
git status

# Output contoh:
# On branch main
# Changes not staged for commit:
#   modified:   index.html
#   modified:   server.js
#   untracked:  DOKUMENTASI.md

# 2. Stage file yang mau di-commit
git add index.html server.js
# atau add semua
git add .
# atau add interaktif
git add -p

# 3. Check apa yang di-stage
git diff --staged

# 4. Commit dengan message
git commit -m "Tambah fitur X, fix bug Y"

# MESSAGE FORMAT REKOMENDASI:
# ✨ [type]: [description]
# Contoh:
# ✨ feat: Tambah mode Google Lens
# 🐛 fix: Perbaiki OCR di mobile
# 📚 docs: Update dokumentasi
# 🎨 style: Format CSS
# ♻️ refactor: Refactor parseOcrText
# ✅ test: Tambah unit test
# 🚀 perf: Optimize OCR performance
```

---

### Sore - Push ke GitHub

```powershell
# 1. Cek branch
git branch
# * main

# 2. Pull latest dulu (case ada changes di GitHub)
git pull origin main

# 3. Push ke remote
git push origin main

# Output sukses:
# Enumerating objects: 5, done.
# Counting objects: 100% (5/5), done.
# Delta compression using up to 8 threads
# Compressing objects: 100% (3/3), done.
# Writing objects: 100% (3/3), 350 bytes
# To https://github.com/albaman93-creator/Alat-rekonsiliasi-getinge.git
#    abc1234..def5678  main -> main
```

---

## 🔧 GIT COMMANDS LENGKAP

### SETUP & CONFIG

```powershell
# Configure user identity (first time only)
git config --global user.name "Nama Anda"
git config --global user.email "email@contoh.com"

# Verify config
git config --global --list

# Configure untuk repo saja (no --global)
git config user.name "Nama Lokal"
git config user.email "email-lokal@contoh.com"

# Set default branch
git config --global init.defaultBranch main

# Set rebase default
git config --global pull.rebase true

# Disable auto-CRLF (untuk Windows consistency)
git config --global core.autocrlf false
```

---

### CLONE & REMOTE

```powershell
# Clone repository
git clone https://github.com/username/repo.git

# Clone ke folder specific
git clone https://github.com/username/repo.git my-folder-name

# Clone dengan branch specific
git clone -b dev https://github.com/username/repo.git

# View remote
git remote -v

# Add remote
git remote add origin https://github.com/username/repo.git
git remote add upstream https://github.com/original/repo.git

# Remove remote
git remote remove origin

# Rename remote
git remote rename origin upstream

# Change remote URL
git remote set-url origin https://github.com/new-url/repo.git

# View remote details
git remote show origin

# Fetch dari remote tertentu
git fetch origin
git fetch upstream
git fetch --all  (semua remote)

# Prune deleted remote branches
git fetch --prune
```

---

### STATUS & DIFF

```powershell
# Status file
git status

# Status singkat
git status -s
# Output: M  file1.txt (modified)
#         A  file2.txt (added)
#        ?? file3.txt (untracked)

# Differences (unstaged changes)
git diff

# Differences (staged changes)
git diff --staged
# atau alias
git diff --cached

# Diff antara commits
git diff HEAD~1 HEAD
git diff commit1 commit2

# Diff dengan file specific
git diff -- file.txt

# Diff antara branch
git diff main develop

# Show detailed diff
git diff --stat
```

---

### STAGING & COMMITTING

```powershell
# Stage file
git add file.txt

# Stage multiple files
git add file1.txt file2.txt file3.txt

# Stage semua
git add .
git add -A

# Stage interactive (pilih hunks)
git add -p

# Stage hanya tracked files
git add -u

# Unstage file
git restore --staged file.txt
# atau (old command)
git reset HEAD file.txt

# Commit
git commit -m "Commit message"

# Commit dengan long message
git commit -m "Title" -m "Description yang lebih detail"

# Commit dengan author specific
git commit --author="Name <email@example.com>" -m "Message"

# Amend last commit (edit message atau tambah file)
git commit --amend
git commit --amend --no-edit  (keep message, add file)
git commit --amend -m "New message"

# View commit history
git log

# Log one-line
git log --oneline

# Log dengan author specific
git log --author="Name"

# Log dalam date range
git log --since="2 weeks ago"
git log --until="3 days ago"

# Log dengan file specific
git log -- file.txt

# Log dengan graph (visual)
git log --graph --oneline --all

# Detailed commit info
git show commit-hash
git show HEAD
git show HEAD~1
```

---

### BRANCHES

```powershell
# List local branches
git branch

# List remote branches
git branch -r

# List all branches (local + remote)
git branch -a

# Create branch
git branch feature-name

# Create dan switch ke branch baru
git checkout -b feature-name
# atau (newer syntax)
git switch -c feature-name

# Switch branch
git checkout branch-name
# atau
git switch branch-name

# Delete branch (local)
git branch -d feature-name
git branch -D feature-name  (force delete)

# Delete branch (remote)
git push origin --delete feature-name
git push origin :feature-name  (old syntax)

# Rename branch (local)
git branch -m old-name new-name

# Rename branch (remote)
git branch -m old-name new-name
git push origin :old-name new-name

# Set tracking branch
git branch -u origin/main  (set current to track origin/main)
git branch -u origin/develop  (current track develop)

# Show tracking
git branch -vv
```

---

### PULL & MERGE

```powershell
# Pull (fetch + merge)
git pull origin main

# Pull dengan rebase (cleaner history)
git pull --rebase origin main

# Pull specific branch
git pull origin feature-branch

# Pull all remotes
git pull --all

# Merge branch
git merge feature-branch

# Merge dengan custom message
git merge feature-branch -m "Merge feature-branch into main"

# Merge specific commit
git merge abc1234

# Dry-run merge (lihat apa yang akan merge tanpa apply)
git merge --no-commit --no-ff feature-branch
# Kemudian bisa batalkan
git merge --abort

# Show what changed in merge
git diff HEAD MERGE_HEAD
```

---

### PUSH

```powershell
# Push ke remote
git push origin main

# Push dengan set upstream
git push -u origin feature-branch
# (setelah ini, cukup "git push" tanpa specify origin/branch)

# Push all branches
git push origin --all

# Push specific branch
git push origin develop

# Push tags
git push origin v1.0.0
git push origin --tags  (push semua tags)

# Force push (HATI-HATI!)
git push --force
git push --force-with-lease  (lebih aman)

# Push delete
git push origin --delete feature-branch
```

---

### REBASE

```powershell
# Rebase current branch onto main
git rebase main

# Rebase dengan interactive
git rebase -i HEAD~3  (squash last 3 commits)
git rebase -i origin/main

# Continue rebase
git rebase --continue

# Skip current commit in rebase
git rebase --skip

# Abort rebase
git rebase --abort

# Rebase continue dengan auto-resolve
git rebase --continue --no-edit

# Show what will happen
git rebase --dry-run main
```

---

### STASHING

```powershell
# Stash changes (temporary save)
git stash

# Stash dengan message
git stash save "WIP: Feature X"

# List stashes
git stash list

# Apply latest stash
git stash apply

# Apply specific stash
git stash apply stash@{0}
git stash apply stash@{1}

# Pop stash (apply + remove)
git stash pop
git stash pop stash@{0}

# Delete stash
git stash drop
git stash drop stash@{0}

# Delete all stashes
git stash clear

# Show stash content
git stash show
git stash show stash@{0}

# Create branch from stash
git stash branch new-branch
```

---

### UNDOING CHANGES

```powershell
# Discard unstaged changes di file
git restore file.txt
# atau (old)
git checkout -- file.txt

# Discard all unstaged changes
git restore .
# atau
git checkout -- .

# Discard staged (unstage)
git restore --staged file.txt

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Undo specific commit (buat new commit yang revert)
git revert commit-hash

# View commit before undo
git show HEAD~1

# Interactive reset
git reset -p HEAD
```

---

### TAGGING

```powershell
# Create tag
git tag v1.0.0

# Create annotated tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# List tags
git tag
git tag -l

# Show tag info
git show v1.0.0

# Tag specific commit
git tag v1.0.0 abc1234

# Delete local tag
git tag -d v1.0.0

# Delete remote tag
git push origin --delete v1.0.0
git push origin :v1.0.0

# Push tag
git push origin v1.0.0
git push origin --tags
```

---

### CLEANING

```powershell
# Remove untracked files (dry-run)
git clean -n

# Remove untracked files (force)
git clean -f

# Remove untracked files & directories
git clean -fd

# Remove untracked & ignored files
git clean -fdX

# Garbage collect
git gc

# Reflog (see all changes)
git reflog

# Recover deleted commit
git reflog
git reset --hard commit-hash (dari reflog)
```

---

## 🔄 PULL & MERGE STRATEGIES

### Strategy 1: Simple Pull

```powershell
# Fetch latest, then merge
git pull origin main

# Alias: git fetch origin && git merge origin/main
```

**Kapan**: Saat tidak ada conflict atau changes lokal yang berat.

---

### Strategy 2: Rebase Pull (Recommended)

```powershell
# Pull dengan rebase (no merge commit)
git pull --rebase origin main

# Setup default untuk semua pull
git config --global pull.rebase true

# Kemudian cukup
git pull origin main
```

**Keuntungan**: 
- Lebih clean history
- Linear timeline
- Easier to read commit log

**Kapan**: Hampir selalu untuk feature branches.

---

### Strategy 3: Fetch & Merge Separate

```powershell
# Fetch saja (no merge)
git fetch origin

# Review changes
git diff HEAD origin/main

# Decide merge or rebase
git merge origin/main
# atau
git rebase origin/main
```

**Keuntungan**: Full control sebelum merge.

---

### Strategy 4: Force with Lease (Safe Force)

```powershell
# Jika perlu overwrite remote (HATI-HATI!)
git push --force-with-lease origin main

# vs (dangerous)
git push --force origin main  # Don't use!
```

---

## ⚠️ CONFLICT RESOLUTION

### Deteksi Conflict

```powershell
# Saat pull/merge, akan lihat:
# git merge main
# Auto-merging file.txt
# CONFLICT (content): Merge conflict in file.txt
# Automatic merge failed; fix conflicts and then commit the result.

# Check status
git status
# Output: both modified: file.txt
```

---

### Fix Manual (Edit File)

File akan contain conflict markers:

```
<<<<<<< HEAD
Your local version
=======
Remote version  
>>>>>>> origin/main
```

**Edit file dan hapus markers**, pilih versi yang benar:

```
// Hanya simpan yang benar, hapus yang tidak perlu
```

---

### Using Tools

```powershell
# Setup merge tool (Visual Studio Code)
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd "code --wait \$MERGED"

# Use merge tool
git mergetool

# Setup diff tool
git config --global diff.tool vscode
git config --global difftool.vscode.cmd "code --wait --diff \$LOCAL \$REMOTE"

# Use diff tool
git difftool

# Resolve: keep local
git checkout --ours file.txt
git add file.txt

# Resolve: keep remote
git checkout --theirs file.txt
git add file.txt
```

---

### Complete Merge

```powershell
# Setelah fix semua conflicts:
git add .
git commit -m "Resolve merge conflict"

# Atau untuk rebase:
git rebase --continue
```

---

### Abort Merge

```powershell
# Batalkan merge/rebase
git merge --abort
git rebase --abort
```

---

## 📤 PUSH & PULL LENGKAP

### Sync Cycle Harian

```powershell
# ========== PAGI ==========
# 1. Update local dari remote
cd "c:\Users\admin\Documents\project codingan\HTML\data mentah"
git fetch origin
git status

# 2. Jika di behind, pull
git pull --rebase origin main

# ========== SIANG (DEVELOP) ==========
# 3. Edit files, test
# ... edit index.html, server.js, dll ...

# 4. Lihat changes
git status
git diff

# 5. Stage & commit
git add index.html server.js
git commit -m "✨ feat: Tambah fitur X"

# ========== SORE ==========
# 6. Pull again (untuk case ada push dari user lain)
git pull --rebase origin main

# 7. Push ke remote
git push origin main

# 8. Verify
git log --oneline -3
git status
```

---

### Workflow dengan Multiple Branches

```powershell
# Create feature branch
git checkout -b feature/google-lens

# Make changes
# ...edit files...

# Commit
git add .
git commit -m "✨ feat: Implement Google Lens integration"

# Push feature branch
git push -u origin feature/google-lens

# Create Pull Request di GitHub
# ... wait for review & merge ...

# Back to main
git checkout main
git pull origin main

# Delete feature branch (local)
git branch -d feature/google-lens

# Delete feature branch (remote)
git push origin --delete feature/google-lens
```

---

## 🌿 BRANCH MANAGEMENT

### Main Branch Protection

```powershell
# NEVER commits directly to main locally, use feature branch:

# ❌ DON'T DO THIS
git checkout main
git add .
git commit -m "Quick fix"
git push origin main  # Risky!

# ✅ DO THIS INSTEAD
git checkout -b bugfix/quick-fix
git add .
git commit -m "🐛 fix: Quick fix"
git push -u origin bugfix/quick-fix
# Create PR, get review, merge to main
```

---

### Branch from Remote

```powershell
# Track remote branch locally
git checkout --track origin/develop
# atau
git checkout develop  (auto-track if exist di remote)

# Create local from remote branch
git checkout -b local-dev origin/develop

# List tracking branch status
git branch -vv
```

---

## ↩️ UNDOING CHANGES

### Undo Staged

```powershell
# Unstage file
git restore --staged file.txt

# Unstage all
git restore --staged .
```

---

### Undo Unstaged

```powershell
# Discard changes dalam file
git restore file.txt

# Discard all changes
git restore .
```

---

### Undo Committed

```powershell
# Undo last commit (keep changes in working dir)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Undo specific commit (dengan new commit yang revert)
git revert abc1234
git push origin main
```

---

### Undo Push (Dangerous!)

```powershell
# Jika accidentally push wrong commit
# Option 1: Revert dengan new commit
git revert abc1234
git push origin main

# Option 2: Force push (ONLY IF NO ONE ELSE PULLED)
git reset --hard origin/main~1
git push --force-with-lease origin main
```

---

## 🚀 ADVANCED GIT

### Cherry-pick

```powershell
# Ambil specific commit dari branch lain
git cherry-pick abc1234

# Multiple commits
git cherry-pick abc1234 def5678 ghi9012
```

---

### Squash Commits

```powershell
# Merge 3 commits terakhir menjadi satu
git rebase -i HEAD~3

# Di editor, ubah 'pick' menjadi 'squash' untuk commits yang mau digabung
# Simpan, sesuaikan commit message

# Push dengan force (jika sudah push sebelumnya)
git push --force-with-lease origin feature-branch
```

---

### Hook Pre-commit

Automatisasi sebelum commit:

```bash
# Create .git/hooks/pre-commit (Linux/Mac)
#!/bin/bash
npm run lint
npm run test
exit $?

# Windows: .git\hooks\pre-commit.bat
```

---

### Bisect (Find Bad Commit)

```powershell
# Start bisect
git bisect start

# Mark current as bad
git bisect bad

# Find a known good commit
git log --oneline
git bisect good abc1234

# Git auto test commits, you say "bad" or "good"
git bisect bad
# atau
git bisect good

# ... repeat ...

# Finish
git bisect reset
```

---

## 🐛 TROUBLESHOOTING

### Merge Conflict Won't Resolve

```powershell
# View conflict details
git diff HEAD MERGE_HEAD

# List conflicted files
git diff --name-only --diff-filter=U

# Take all from main
git checkout --ours -- .

# Take all from remote
git checkout --theirs -- .

# Then commit
git add .
git commit -m "Resolve conflict"
```

---

### Detached HEAD

```powershell
# Error: "detached HEAD"
git status
# HEAD detached at abc1234

# Fix: Go back to main
git checkout main

# atau create branch dari detached HEAD
git checkout -b new-branch
```

---

### Accidentally Committed to Main

```powershell
# Move last commit to new branch
git checkout -b new-branch
git checkout main
git reset --hard HEAD~1
```

---

### Lost Commits (Reflog)

```powershell
# Show all commits (bahkan yang didelete)
git reflog

# Recover
git checkout abc1234

# atau create branch
git checkout -b recovered abc1234
```

---

### Large File Committed

```powershell
# Remove file dari commit history
git filter-branch --tree-filter 'rm -f large-file.zip' HEAD

# Force push (DANGEROUS!)
git push --force-with-lease origin main
```

---

## 📊 TYPICAL WORKFLOW DIAGRAM

```
┌─────────────────────────────────────────────────────────┐
│ GitHub Repository (Remote: origin/main)                 │
└────────────────────┬────────────────────────────────────┘
                     │
           ┌─────────┼─────────┐
           │                   │
         fetch/pull          push
           │                   │
    ┌──────▼──────┐      ┌─────▼──────┐
    │Tracking     │      │Local       │
    │Branches:    │◄────►│Changes:    │
    │origin/main  │      │index.html  │
    │origin/dev   │      │server.js   │
    └─────┬───────┘      └─────┬──────┘
          │                     │
          │merge/rebase         │add/commit
          │                     │
          ▼                     ▼
    ┌───────────────────────────┐
    │Local Branches             │
    │• main (tracking)          │
    │• feature/google-lens      │
    │• bugfix/ocr-accuracy      │
    └────────────────────────────┘
```

---

## ✅ CHECKLIST DAILY

```
Pagi (Before Dev):
☐ git fetch origin
☐ git status (cek jika behind)
☐ git pull --rebase origin main (jika behind)

Siang (During Dev):
☐ git add .
☐ git commit -m "✨ descriptive message"
☐ Test code locally

Sore (Before Push):
☐ git pull --rebase origin main (case ada changes)
☐ git push origin main

Weekly:
☐ git branch -a (check branches)
☐ Delete merged branches (local & remote)
☐ Review git log (audit trail)
```

---

## 🎓 TIPS & BEST PRACTICES

| Tips | Reason |
|------|--------|
| **Commit often** | Easier to revert individual changes |
| **Write clear messages** | Future you akan appreciate |
| **Pull before push** | Avoid conflicts & overwrites |
| **Use branches** | Main branch stay stable |
| **Never force push** | Unless you know what you're doing |
| **Review before merge** | Prevent bad code in main |
| **Tag releases** | Track version history |
| **Stash if interrupted** | Save work-in-progress |

---

## 📞 REFERENCE CARD

```powershell
# MOST USED COMMANDS
git status                    # Check status
git add .                     # Stage all
git commit -m "msg"           # Commit
git push origin main          # Push to remote
git pull --rebase origin main # Pull with rebase (recommended)
git fetch origin              # Update tracking branches
git merge feature-branch      # Merge branch
git log --oneline             # View history
git branch -a                 # List all branches
git checkout -b new-branch    # Create & switch branch
git rebase -i HEAD~3          # Squash commits

# CONFLICT RESOLUTION
git merge --abort             # Cancel merge
git rebase --abort            # Cancel rebase
git checkout --ours file.txt  # Keep local
git checkout --theirs file.txt # Keep remote
git add . && git rebase --continue

# UNDO
git restore file.txt          # Discard changes
git restore --staged file.txt # Unstage
git reset --soft HEAD~1       # Undo commit (keep changes)
git reset --hard HEAD~1       # Undo commit (discard changes)
```

---

## 🔗 USEFUL LINKS

- **Official Git**: https://git-scm.com
- **GitHub Docs**: https://docs.github.com
- **Interactive Tutorial**: https://learngitbranching.js.org
- **Cheat Sheet**: https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet

---

**Document Version**: 1.0  
**Last Updated**: 11 Maret 2026

Semoga dokumentasi ini membantu! Untuk pertanyaan lebih lanjut, silakan refer ke official Git documentation atau GitHub help center.
