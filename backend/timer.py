import time

quiz_start_time = None
quiz_duration = 0

def start_quiz(duration: int):
    global quiz_start_time, quiz_duration
    quiz_start_time = time.time()
    quiz_duration = duration

def get_remaining_time():
    if quiz_start_time is None:
        return 0
    elapsed = time.time() - quiz_start_time
    remaining = quiz_duration - elapsed
    return max(0, int(remaining))
