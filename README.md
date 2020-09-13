Clone the repository:
=====================

git clone `repo URL`

git remote add `repo URL`

To check the existing branches:
-------------------------------

git branch

To create new branch:
---------------------
git checkout -b `name of branch`

To checkout to new branch from master:
--------------------------------------
git checkout `name of branch`

To update local:

1. Make sure that you don't have changes to your branch.
    a. If there are changes,
        i. git stash
2. git checkout dev

3. git pull

4. git checkout :name of branch:

5. git rebase origin dev

6. If there are changes and are stashed: git stash pop

7. If there are new updates in the package.json: npm start


To run react:
-------------

1. Go to app folder: cd app

2. npm start


To run create new table:
------------------------

1. Create a new migration file: `npm run migration create <name of migration file>`

2. Update the migration file on what you want to do: create, update, drop table

3. To run migration `npm run migration up`



