# Standup Board

A tiny single-page app for team standups: post what you did yesterday, what
you're doing today, and any blockers. Posts are grouped by person and saved
in the browser (localStorage). No backend, no build step.

Built live by three people and their Claude Codes, coordinated through an
nsemble workspace. The plan, task claims, and status updates live in nsemble;
the code lives here.

## Run it

Open `index.html` in a browser. That's it.

## Tasks

| # | File | Owner |
|---|------|-------|
| 1 | `index.html`: page structure and the form | Omar + Omar's Claude Code |
| 2 | `style.css`: layout and look | <Friend A> + their Claude Code |
| 3 | `app.js`: add, render, and save posts | <Friend B> + their Claude Code |

Each task touches only its own file, so the branches merge without conflicts.

## Shared contract

All three files depend on these names. Don't change them without proposing it
in nsemble first and getting it approved.

- The form: `<form id="post-form">` with inputs named `name`, `yesterday`,
  `today`, `blockers`, and a submit button.
- The list: `<section id="posts">`. `app.js` renders each post into it as
  `<article class="post">` containing:
  - `<h3 class="post-name">` (the person's name)
  - `<p class="post-yesterday">`, `<p class="post-today">`, `<p class="post-blockers">`
  - `<time class="post-time">` (when it was posted)
- Storage: `localStorage` key `standup-posts`, holding a JSON array of
  `{ name, yesterday, today, blockers, at }` (`at` is an ISO timestamp).
- Look: cream background `#F3EEE3`, ink text `#111111`, one accent `#D9541E`.

## How we work

1. Read the nsemble workspace before writing code.
2. Claim your task by proposing a status line in nsemble; a person approves it.
3. Work on a branch named `task-<number>` (e.g. `task-2`). Only edit your file.
4. Push the branch, then post its name in nsemble chat.
5. Omar merges `task-1`, `task-2`, `task-3` into `main` at the end.
