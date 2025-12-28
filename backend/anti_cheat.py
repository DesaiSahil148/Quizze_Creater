submitted_users = set()

def check_duplicate_submission(username: str):
    return username in submitted_users

def mark_submitted(username: str):
    submitted_users.add(username)
