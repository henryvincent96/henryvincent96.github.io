const timeTitle = document.getElementById("time-title")

const getMinuteAsWord = (currentMinute) => {
  const minuteWords = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "quarter",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
    "twenty",
    "twenty-one",
    "twenty-two",
    "twenty-three",
    "twenty-four",
    "twenty-five",
    "twenty-six",
    "twenty-seven",
    "twenty-eight",
    "twenty-nine",
    "half"
  ]

  const minuteNumber = (currentMinute <= 30) ? currentMinute : 60 - currentMinute
  
  return minuteWords[minuteNumber]
}

const getHourAsWord = (currentHour) => {
  const hourWords = [
    "twelve",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve"
  ]

  const hourNumber = (currentHour <= 12) ? currentHour : currentHour - 12
  
  return hourWords[hourNumber]
}

const getPhoneticTime = (currentTime) => {
  const currentMinute = currentTime.getMinutes()

  const isAfterHalfPast = (currentMinute > 30)

  const currentHour = isAfterHalfPast ? currentTime.getHours() + 1 : currentTime.getHours()

  const hour = getHourAsWord(currentHour)
  const minute = getMinuteAsWord(currentMinute)

  if (currentMinute === 0) {
    return hour + " o'clock"
  }

  const pastOrTo = isAfterHalfPast ? "to" : "past"

  return minute + " " + pastOrTo + " " + hour
}

const updateTime = () => {
  const currentTime = new Date()
  let phoneticTime = "It's " + getPhoneticTime(currentTime)

  timeTitle.innerText = phoneticTime
}

updateTime()

let prevMinutes = 60

setInterval(() => {
  let currentMinutes = new Date().getMinutes()

  if (currentMinutes !== prevMinutes) {
    updateTime()
    prevMinutes = currentMinutes
  }
}, 500)
