include ApplicationHelper

def complete_challenges(subscription, challenge_indices)
  subscription.reset

  points = 0
  challenges = subscription.lesson.challenges

  challenge_indices.each do |challenge_idx|
    challenge = challenges[challenge_idx]
    subscription.current_challenge_id=(challenge.id)
    points += subscription.complete_challenge
  end

  return points
end