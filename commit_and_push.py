import os
import subprocess

def main():
    # 스테이징된 변경 사항 커밋
    commit_message = "--allow-empty-message --no-edit"
    commit_command = f'git commit {commit_message}'

    try:
        # 변경 사항 커밋
        subprocess.run(commit_command, check=True, shell=True)
        print("Changes committed successfully.")

        # 변경 사항 푸시
        push_command = 'git push origin main'
        subprocess.run(push_command, check=True, shell=True)
        print("Changes pushed to remote repository successfully.")

    except subprocess.CalledProcessError as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()
