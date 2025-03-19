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
    "a quarter",
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
  const roundedMinute = Math.round(currentMinute/5)*5

  const isAfterHalfPast = (roundedMinute > 30)

  const currentHour = isAfterHalfPast ? currentTime.getHours() + 1 : currentTime.getHours()

  const hour = getHourAsWord(currentHour)
  const minute = getMinuteAsWord(roundedMinute)

  if (roundedMinute === 0) {
    return hour + " o'clock"
  }

  const pastOrTo = isAfterHalfPast ? "to" : "past"

  let roundingWord = ""
  if (currentMinute > roundedMinute) {
    roundingWord = "just gone "
  } else if (roundedMinute > currentMinute) {
    roundingWord = "nearly "
  }

  return roundingWord + minute + " " + pastOrTo + " " + hour
}

const updateTime = () => {
  const currentTime = new Date()
  let phoneticTime = "It's " + getPhoneticTime(currentTime)

  timeTitle.innerText = phoneticTime
}

const playChime = () => {
  try {
    document.getElementById("chime-sound").play()
  } catch (exception) {
    console.error("I tried to chime but your browser wouldn't let me 😢", exception);
  }
}

updateTime()

let prevMinutes = 60

setInterval(() => {
  let currentMinutes = new Date().getMinutes()

  if (currentMinutes !== prevMinutes) {
    updateTime()

    if (currentMinutes === 0) {
      playChime()
    }

    prevMinutes = currentMinutes
  }
})

