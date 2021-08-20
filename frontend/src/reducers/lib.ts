export const checkIfAlreadyVoted = (pollID: string): boolean => {
  const votedIn = JSON.parse(localStorage.getItem('votedIn') || '[]')
  if (votedIn.includes(pollID)) {
    return true
  } else {
    return false
  }
}