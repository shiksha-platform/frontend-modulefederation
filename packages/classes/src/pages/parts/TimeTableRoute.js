export const TimeTableRoute = () => {
    const { t } = useTranslation();
    const [dayView, setDayView] = useState(false);
    const [datePage, setDatePage] = useState(0);
    const [weekdays, setWeekdays] = useState([]);
  
    useEffect(() => {
      if (dayView) {
        setWeekdays([moment()]);
      } else {
        setWeekdays(weekDates());
      }
    }, [dayView]);
  
    return (
      <Stack space={1}>
        <Box bg="white" pt="30" pb={"25"}>
          Timetable here...
        </Box>
      </Stack>
    );
  };
  