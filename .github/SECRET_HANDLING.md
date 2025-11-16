## Secret Handling for test-todolist

Follow these steps before pushing to GitHub to ensure secrets are not leaked.

1. Replace secrets in tracked files
   - We keep `appsettings.example.json` in the repository. Do not commit any real secrets.
   - Update your local `appsettings.Development.json` and `appsettings.json` with real values (these files are now ignored).

2. Remove secrets from git history (if already committed)
   - If you already committed secrets, rotate the credentials immediately in Azure.
   - Then remove them from history using the BFG or git filter-branch. Example with BFG:
     ```bash
     # Install BFG and run:
     bfg --replace-text replacements.txt
     # where replacements.txt contains lines like:
     # YourSecurePassword123!==[REDACTED_PASSWORD]
     git reflog expire --expire=now --all
     git gc --prune=now --aggressive
     git push --force
     ```

3. Use GitHub Secrets for CI/CD
   - Store connection strings and passwords in GitHub Actions secrets or other secure vaults.
   - Reference them in workflows; do not write them to files in the repo.

4. Rotate credentials
   - When in doubt, rotate the database password in Azure and update local config.

5. Validate before push
   - Run `git status` to ensure no secrets are staged:
     ```bash
     git status --porcelain | grep -E "appsettings|environment" || true
     ```

If you'd like, I can:
- Help create a migration script to rotate the DB password in Azure
- Help run the BFG commands to scrub history (you will need to run them locally)
- Add a GitHub Action that validates no secrets are present before allowing merges
