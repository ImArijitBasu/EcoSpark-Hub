export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return formatDate(dateString);
}

export function truncate(text: string, length: number = 100): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'DRAFT':
      return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    case 'UNDER_REVIEW':
      return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    case 'APPROVED':
      return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    case 'REJECTED':
      return 'bg-red-500/20 text-red-300 border-red-500/30';
    default:
      return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  }
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case 'DRAFT': return 'Draft';
    case 'UNDER_REVIEW': return 'Under Review';
    case 'APPROVED': return 'Approved';
    case 'REJECTED': return 'Rejected';
    default: return status;
  }
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
