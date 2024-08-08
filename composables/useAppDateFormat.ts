export function useAppDateFormat(
  dateStr: string,
  dateFormat?: string,
) {
  const appConfig = useAppConfig()
  return useDateFormat(dateStr, dateFormat || appConfig.dateFormat || 'MMM DD, YYYY')
}
