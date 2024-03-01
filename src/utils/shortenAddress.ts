export default function shortenAddress(address?: string): string {
  if (!address) {
    return '';
  }
  const prefixLength = 6;
  const suffixLength = 4;

  if (address.length <= prefixLength + suffixLength) {
    return address;
  }

  const prefix = address.slice(0, prefixLength);
  const suffix = address.slice(-suffixLength);

  return `${prefix}...${suffix}`;
}
