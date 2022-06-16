const makeIput = (value = 0) => {
  return {
    get value() { return value },
    add(appendValue = 0) {
      value *= 10
      value += appendValue
      return this
    }
  }
}

const inp1 = makeIput(0)

inp1.add(0)
inp1.add(1)
inp1.add(2)

console.log(inp1.value) // 102