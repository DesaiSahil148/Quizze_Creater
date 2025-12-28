def calculate_score(questions, answers):
    score = 0
    for q in questions:
        if answers.get(str(q.id)) == q.correct_option:
            score += 1
    return score
