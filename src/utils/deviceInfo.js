export function getDeviceInfo() {
  if (typeof navigator === 'undefined') {
    return { userAgent: '', platform: '', language: '', screen: '' };
  }
  return {
    userAgent: navigator.userAgent || '',
    platform: navigator.platform || '',
    language: navigator.language || '',
    screen:
      typeof window !== 'undefined' && window.screen
        ? `${window.screen.width}x${window.screen.height}`
        : '',
  };
}
