import os
import subprocess

def main():
    # ������¡�� ���� ���� Ŀ��
    commit_message = "--allow-empty-message --no-edit"
    commit_command = f'git commit {commit_message}'

    try:
        # ���� ���� Ŀ��
        subprocess.run(commit_command, check=True, shell=True)
        print("Changes committed successfully.")

        # ���� ���� Ǫ��
        push_command = 'git push origin main'
        subprocess.run(push_command, check=True, shell=True)
        print("Changes pushed to remote repository successfully.")

        # ����ȭ (��: git pull�� �ֽ� ���� ���� ��������)
        sync_command = 'git pull origin main'
        subprocess.run(sync_command, check=True, shell=True)
        print("Repository synchronized successfully.")

    except subprocess.CalledProcessError as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()
