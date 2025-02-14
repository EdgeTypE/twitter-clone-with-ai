export function formatTimestamp(date: Date | string): string {
  const now = new Date();
  const timestamp = new Date(date);
  const seconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);

  if (seconds < 60) {
    return `${seconds}s`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}h`;
  }

  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `${days}d`;
  }

  if (days < 365) {
    return timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  return timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}