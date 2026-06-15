# Git Walkthrough — getting your code online, one click at a time

This is for someone who has never used git or GitHub before. We'll go slowly and
in plain words. Read each step to the user (or paste it), and **wait for them to
confirm** before the next step. Going one step at a time is the difference
between a smooth first push and a frustrating debugging session.

First, a quick "what are we even doing?":

> "Right now your code lives only on your computer. We're going to put a backup
> copy online, in a private place only you can see. That backup is also where,
> later, collaborators or deployment tools will read from. The tool that does
> this is called **git**, and the online home is called a **repository** (or
> **repo** for short) — that's just a fancy word for 'your project's folder,
> online.'"

If the user is already fluent with git, you can compress this — but never assume
fluency. Ask: "How comfortable are you with git and GitHub already?" If they
hesitate, use the full walkthrough.

We'll use **GitHub** as the main example (it's the most popular and has free
private repos). GitLab and Bitbucket work almost identically — small variants are
at the end.

---

## Contents

- Step 1 — Create a GitHub account (skip if they already have one)
- Step 2 — Create a new private repository
- Step 3 — Copy the repository's web address (the URL)
- Step 4 — From the terminal, set up git and make your first save
- Step 5 — Connect your folder to the online home, and upload
- Step 6 — If it asks for a username and password
- Step 7 — Check it worked
- GitLab variant (small differences only)
- Bitbucket variant (small differences only)
- Auth troubleshooting (when the upload is refused)

---

## Step 1 — Create a GitHub account (skip if they already have one)

> "Do you already have a GitHub account? If yes, just sign in and we'll skip
> ahead. If not, here's how — it takes about two minutes."

1. Open your web browser (Chrome, Safari, Firefox — whichever you use).
2. Click the address bar at the very top, type this, and press Enter:
   `https://github.com/signup`
3. Type your email address. Click the **Continue** button.
4. Create a password (make it long — 15+ characters is ideal). Click **Continue**.
5. Pick a username. This shows up in your web addresses forever, so pick
   something you're happy with — your name or a steady handle works well. Click
   **Continue**.
6. It asks whether you want email updates — answer however you like, click
   **Continue**.
7. Solve the little puzzle it shows (this proves you're a real person). Click
   **Continue**.
8. GitHub emails you a code. Open your email, copy the code, and type it on the
   GitHub page.
9. It may ask a couple of setup questions ("how do you plan to use GitHub?").
   Answer however you like, or click **Skip personalization** to move on.

You should now be logged in, on the GitHub home page. Tell me when you're there.

---

## Step 2 — Create a new private repository

> "Now we make the online home for your code. We want it **private** (only you
> can see it) and **empty** (we'll fill it from your computer)."

1. In the **top-right corner** of GitHub, find the small **`+`** icon. Click it.
2. A little menu drops down. Click **New repository**.
3. You're now on the "Create a new repository" page. Fill it in:
   - **Repository name** — type the same name as your project folder on your
     computer (I'll tell you the exact name).
   - **Description** — optional, a short one line. You can leave it blank.
   - **Public / Private** — click **Private**. (Private is the safe default; you
     can always change it later.)
   - **Add a README file** — leave this box **UNCHECKED**. This is important: we
     already have files on your computer, and if you check this box the upload
     will clash and fail.
   - **Add .gitignore** — leave it as **None**. We already have one.
   - **Choose a license** — leave it as **None**. We already handled that.
4. Scroll down and click the green **Create repository** button.

You're now on a page for your new, empty repository. Tell me when you see it.

---

## Step 3 — Copy the repository's web address (the URL)

On that empty-repo page, GitHub shows some setup instructions. Look for the
section titled **"…or push an existing repository from the command line."**
Under it are a few lines; the first one starts with `git remote add origin` and
contains a web address ending in **`.git`**.

> "Find the section that says 'push an existing repository from the command
> line.' You'll see a web address ending in `.git`. Click the little copy icon
> next to it to copy it. Tell me when you've got it copied."

The address looks like:
`https://github.com/<your-username>/<repo-name>.git`

For a first-timer, use this **HTTPS** address (the one starting with `https://`).
There's also an SSH one starting with `git@` — ignore it for now; HTTPS is
easier to get working.

---

## Step 4 — From the terminal, set up git and make your first save

The **terminal** is a text window where you type commands. If Claude has shell
access, these can be run for the user; otherwise paste them one at a time and ask
what they see after each. Make sure you're **inside the project folder** first.

> "We'll run a few short commands. Each one does one small thing. Run them one at
> a time and tell me what you see after each."

```bash
git init          # turn this folder into a git project (one-time setup)
git add -A        # gather up all your files, ready to save
git status        # show what's about to be saved (a sanity check)
git commit -m "Initial commit"   # save a labeled snapshot of everything
```

In plain words: `git init` starts tracking the folder; `git add -A` selects all
your files; `git status` lets us double-check what's included before saving;
`git commit` takes a labeled snapshot (a "commit") of your code. The text in
quotes is just a short note describing the save.

---

## Step 5 — Connect your folder to the online home, and upload

Now we tell git where the online home is, name your main line of work "main," and
upload.

```bash
git remote add origin <paste-the-URL-you-copied>
git branch -M main
git push -u origin main
```

In plain words: `git remote add origin …` records the online address (git calls
the main online copy "origin"); `git branch -M main` names your main branch
"main" (the modern standard); `git push -u origin main` **uploads** your code.

---

## Step 6 — If it asks for a username and password

> **Reassure the user first:** *"This is normal and expected — not an error. GitHub
> just uses a safer key than a password for this. It takes two minutes and on most
> setups you'll never have to do it again."*

On the first upload, GitHub may ask you to sign in. **Important:** GitHub no
longer accepts your normal account password here — it wants a special key called
a **Personal Access Token** (a long random key that works like a password). Here's
how to make one (about two minutes):

1. In your browser go to: `https://github.com/settings/tokens`
2. Click **Generate new token**, then **Generate new token (classic)**.
3. **Note** — type a label like `My laptop`.
4. **Expiration** — pick a length (1 year is fine; or "No expiration").
5. **Select scopes** — check the box next to **`repo`** (the first big group).
   This lets the token upload code.
6. Scroll down and click the green **Generate token** button.
7. GitHub shows a long string starting with `ghp_`. **Copy it right now** — it's
   shown only once.
8. Back in the terminal, when it asks for the **password**, paste this token and
   press Enter. (It won't show on screen as you paste — that's normal.)

> **Treat this token like a password.** It's a real secret — don't paste it into a
> chat, a commit, or a file. On a Mac it's saved securely in Keychain so you won't
> be asked again; on Windows/Linux I'll help you set up a credential helper so you
> aren't asked every time.

The upload should now succeed. On a Mac the token is saved in Keychain so you
won't be asked again.

---

## Step 7 — Check it worked

> "Go back to your browser, to the repository page, and refresh it. Tell me what
> you see."

You should now see your files listed (README.md, CLAUDE.md, docs/, and so on).
If you still see the empty-repo placeholder, refresh once more — it sometimes
takes a moment. Done — your code is backed up online.

---

## GitLab variant (small differences only)

GitLab calls repos "projects" but the flow is the same.

1. **Account:** sign up at `https://gitlab.com/users/sign_up`, confirm your email.
2. **New repo:** top-left **+** icon → **New project/repository** → **Create
   blank project**. Name it the same as your folder. **Visibility: Private.**
   Leave **"Initialize repository with a README" UNCHECKED.** Click **Create
   project**.
3. **URL:** click the **Clone** button, copy the **HTTPS** URL (ends in `.git`).
4. **Connect + push:** exactly the same three commands as Step 5.
5. **Token (if asked):** `https://gitlab.com/-/profile/personal_access_tokens` →
   name it, set expiration, check the **`write_repository`** scope → **Create** →
   copy it → use it as the password.

## Bitbucket variant (small differences only)

1. **Account:** sign up at `https://bitbucket.org/account/signup/` (it uses an
   Atlassian account).
2. **New repo:** top-left **+** → **Repository**. Name it the same as your
   folder. **Access level: Private.** **Include a README: No.** **Default branch
   name: `main`.** Click **Create repository**.
3. **URL:** click **Clone**, copy the **HTTPS** URL.
4. **Connect + push:** the same three commands as Step 5.
5. **App password (if asked):** avatar → **Personal settings** → **App
   passwords** → **Create app password** → label it → check **Repositories:
   Write** → **Create** → copy it → use it as the password.

---

## Auth troubleshooting (when the upload is refused)

Authentication just means "proving it's really you." If `git push` is refused,
here are the common cases and fixes.

**`Authentication failed` / `403 Forbidden`** — the service rejected your
password because passwords aren't accepted for git anymore. **Fix:** create a
Personal Access Token (Step 6 / the GitLab/Bitbucket equivalents) and use *that*
as the password. This is by far the most common issue.

**`Permission denied (publickey)`** — you're using the SSH address (`git@…`) but
don't have an SSH key set up. **Fix for now:** switch to the easier HTTPS
address with `git remote set-url origin https://github.com/<user>/<repo>.git`,
then push again.

**`Repository not found`** — the online address is wrong, or your account can't
see that repo. **Fix:** run `git remote -v` and check the URL matches exactly
what's in your browser.

**`failed to push some refs … rejected`** — the online repo already has
something (usually because the README box got checked by mistake in Step 2).
**Fix:** `git pull --rebase origin main` then `git push -u origin main`.

### HTTPS token vs SSH key — which to use

- **HTTPS + Personal Access Token (recommended for beginners).** You paste a
  token once; on a Mac it's saved in Keychain and you're never asked again.
  Simplest to set up and to debug. Start here.
- **SSH key (for the more comfortable).** A one-time setup that lets you push
  with no password prompts ever. Generate a key with
  `ssh-keygen -t ed25519 -C "your-email@example.com"`, copy the public key from
  `~/.ssh/id_ed25519.pub`, and paste it into the service (GitHub:
  `https://github.com/settings/keys` → **New SSH key**). Then switch your remote
  to the `git@…` SSH address. Worth it later; not necessary for the first push.

Either way, once the push works, your code is safely backed up — and on the next
session the closing ritual gives you the exact commands to push again.
