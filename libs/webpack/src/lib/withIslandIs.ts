import treat from 'next-treat'

export const withIslandIs = () => (nextConfig = {}) => {
  const withTreat = treat()
  return withTreat(nextConfig)
}
