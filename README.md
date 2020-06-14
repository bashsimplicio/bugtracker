=====================
Clone the repository:
=====================

git clone <repo URL>

git remote add <repo URL>

To check the existing branches:
-------------------------------

git branch

To create new branch:
---------------------
git checkout -b <name of branch>

To checkout to new branch from master:
--------------------------------------
git checkout <name of branch>

To update local:

1. Make sure that you don't have changes to your branch.
    a. If there are changes,
        i. git stash
2. git checkout dev

3. git pull

4. git checkout <name of branch>

5. git rebase origin dev

6. If there are changes and were stashed: git stash pop

7. If there are new updates in the package.json: npm start


To run react:

1. Go to app folder: cd app

2. npm start
