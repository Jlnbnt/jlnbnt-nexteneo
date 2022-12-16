const useRemainingTime = () => {
  const timeFormat = (num, singular) => {
    return num > 0 ? num + (num === 1 ? `${singular}, ` : `${singular}, `) : ''
  }
  const timeDiff = (end, start) => {
    const totalSeconds = (new Date(end) - new Date(start)) / 1000
    const seconds = Math.floor(totalSeconds % 60)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600)
    const days = Math.floor(totalSeconds / (3600 * 24))
    const secondsStr = timeFormat(seconds, 's')
    const minutesStr = timeFormat(minutes, 'm')
    const hoursStr = timeFormat(hours, 'h')
    const daysStr = timeFormat(days, 'j')
    return `${daysStr}${hoursStr}${minutesStr}${secondsStr}`.replace(
      /,\s*$/,
      ''
    )
  }
  return timeDiff
}

export default useRemainingTime
