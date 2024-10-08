This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Generate token to install private npm package

https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

On terminal Sign out:
`npm logout`

Logged in with your token:
`npm login --registry=https://npm.pkg.github.com`

## Tech Stack

- ReactJs Boostrap: https://react-bootstrap.github.io/

- Next.js: https://nextjs.org/

- Storybook: https://storybook.js.org/

## Creative design link:

### Enable formatting on Save:

- Please enable formatting on save in Visual Studio Code:
- Code => Preference => Settings
- Or for Mac: Command + ,
- Or for Windows: Ctrl + ,

- Text Editor => Formatting => Format On save (Check the checkbox)
- If works fine otherwise:

- Install Extension => Prettier-Code formatter in settings.json
  "editor.defaultFormatter": "esbenp.prettier-vscode",

### Spaces in Visual Studio Code should be 4

- Click on Spaces:2 => Indent using spaces => select 4

### Disable ssl if yarn install on project gets fail:

- yarn config set "strict-ssl" false
- npm config set "strict-ssl" false

### Enable Linting (if not prompting the errors)

chmod ug+x .husky/_
chmod ug+x .git/hooks/_

### To fix build issue while using npm package

https://stackoverflow.com/questions/38224232/how-to-consume-npm-modules-from-typescript

1. Create a folder named "typings".
2. In typings folder, create a file name module-name.d.ts. It contains: declare module "module-name";

3. In tsconfig.json, refer to the folder

"typeRoots": [
"./typings",
"../node_modules/@types"
]

### SCSS Linting

- https://marketplace.visualstudio.com/items?itemName=adamwalzer.scss-lint
- http://csslint.net/

### Build Issue

Code which are causing build issues are below the line
`//BuildIssue`

## Pull Request Process

### Adding a pull request

- You should open a pull request whenever you want to commit your feature or bugfix branch to Develop. For example, when you have completed a user story or have finished functionality that is worth sharing with the team.
- Branch name should starts with feature, bugfix or enhancement with azure ticket number and specific change you are doing in PR. e.g. feature/26395-welcome-page-hero-banner.
- Make sure to add Azure Ticket number or specific change in PR title/commits.
- When making pull requests you should create a request without any reviewers, then double-check every file in the 'diff' tab to ensure your pull request only contains what you expect it to contain.
- After reviewing your pull request, add build / UI screenshots (if applicable) and add them to the PR description so the reviewers have some context when reviewing your code.
- You should then include all web developers as reviewers (Core reviewers + Team Members).
- Add PR link and ask for review on project channel (Teams).

You should only merge the PR when at least two from your team has approved it, as well as at least one of the core team and you have resolved or responded to any issues raised by the reviewers. If you are modifying components that have previously been worked on by other developers, take reasonable steps to ensure those developers have time to review and approve your changes.

Always send a reminder before you merge your changes so everyone has a chance to review and approve your request. This is especially useful for when people are on holiday so they can keep track of what has been happening in their absence.

### Reviewing a request

When reviewing a request, if you do not understand a section, comment to that effect. If you do approve the request, ensure that you note which sections you are approving, and which you are not (if you are unclear of what certain files do).

### Resolving a comment/feedback on PR

- All comments in the PR must be answered / resolved.
- Discuss one to one instead of long conversation in PR.

### Merging

Before merging you should:

- Pull latest from develop to your branch (Rebase) test on the local branch.
- Run code linting (yarn lint)
- Run Build (yarn build)

### General Guidelines

- PR has to be small and incremental.
- It will be helpful for other team members to review your PR if you attach UI and build screenshots.
- PR must be approved by at least 2 reviewers including 1 core reviewer before it gets merged.
- All comments in the PR must be answered.
- PR should not generate TODO’s, you need to clean that up then and there. No one will get time to clean up later.
- PR can generate new azure tickets, but that should only be done for new tasks coming out of this PR
- PR comments from reviewers must be written helpfully and respectfully. Its constructive criticism not blame.
- PR cannot be merged for reasons like "I was forced to merge", there can be exceptional cases but only for smaller PR (those should be reviewed quickly)
