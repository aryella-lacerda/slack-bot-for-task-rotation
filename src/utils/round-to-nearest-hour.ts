import dayjs from 'dayjs'

export const roundToNearestHour = () => {
  return dayjs().add(30, 'minutes').startOf('hour')
}
