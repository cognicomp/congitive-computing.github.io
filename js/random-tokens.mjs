import fs from "fs/promises"

fs.readFile("tokens.utf8.txt", "utf-8")
  .then(text => text.split(/\n\d+ /))
  .then(tokens => pickRandom(process.argv[2] ?? 50, tokens))
  .then(tokens => "```perl\n" + tokens.join("").replace(/`/g, "") + "\n```")
  .then(console.log)

function pickRandom(n, array) {
  function swap(i, k) {
    [array[i], array[k]] = [array[k], array[i]]
  }

  const results = []
  for (let i = 0; i < n; i++) {
    const k = randIntInRange(i, array.length - 1)
    swap(i, k)
    results.push(array[i])
  }
  return results
}

function randIntInRange(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1))
}