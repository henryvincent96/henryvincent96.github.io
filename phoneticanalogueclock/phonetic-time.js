const timeTitle = document.getElementById("time-title")
const clockSecondHand = document.querySelector(".clock-hand-second")
const clockMinuteHand = document.querySelector(".clock-hand-minute")
const clockHourHand = document.querySelector(".clock-hand-hour")

new Audio("./silence.mp3").play()

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
  const roundedMinute = Math.round(currentMinute / 5) * 5

  const isAfterHalfPast = (roundedMinute > 30)

  const currentHour = isAfterHalfPast ? currentTime.getHours() + 1 : currentTime.getHours()

  const hour = getHourAsWord(currentHour)
  const minute = getMinuteAsWord(roundedMinute)

  if (currentMinute === 0) {
    return hour + " o'clock"
  } else if (roundedMinute === 60) {
    return "nearly " + hour + " o'clock"
  } else if (roundedMinute === 0) {
    return "just gone " + hour + " o'clock"
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

const updateTime = (currentTime) => {
  let phoneticTime = "It's " + getPhoneticTime(currentTime)
  timeTitle.innerText = phoneticTime
}

const updateClock = (currentTime) => {
  const currentSecond = currentTime.getSeconds()
  const secondPercentage = currentSecond / 60
  const secondDegrees = (secondPercentage * 360) - 180
  clockSecondHand.style.setProperty("transform", "rotate(" + secondDegrees + "deg)")

  const currentMinute = currentTime.getMinutes()
  const minutePercentage = currentMinute / 60
  const minuteDegrees = (minutePercentage * 360) - 180 + (6 * secondPercentage)
  clockMinuteHand.style.setProperty("transform", "rotate(" + minuteDegrees + "deg)")

  const currentHour = currentTime.getHours()
  const hourDegrees = ((currentHour / 12) * 360) - 180 + (30 * minutePercentage) + (0.1 * secondPercentage)
  clockHourHand.style.setProperty("transform", "rotate(" + hourDegrees + "deg)")
}

const playChime = () => {
  try {
    document.getElementById("chime-sound").play()
  } catch (exception) {
    console.error("I tried to chime but your browser wouldn't let me 😢", exception);
  }
}

updateTime(new Date())
updateClock(new Date())

let prevMinutes = 60

setInterval(() => {
  let currentDate = new Date()
  let currentMinutes = currentDate.getMinutes()

  updateClock(currentDate)

  if (currentMinutes !== prevMinutes) {
    updateTime(currentDate)

    if (currentMinutes === 0) {
      playChime()
    }

    prevMinutes = currentMinutes
  }
})

