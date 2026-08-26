export function getSurveyParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    dealer: params.get('dealer') || 'Toyota',
    id: params.get('id') || '',
    expires: params.get('expires') || '',
  };
}

// expires is expected as YYYY-MM-DD; link is valid through the end of that day
export function isLinkExpired(expires) {
  if (!expires) return false;
  const expiryDate = new Date(`${expires}T23:59:59`);
  if (Number.isNaN(expiryDate.getTime())) return false;
  return Date.now() > expiryDate.getTime();
}
