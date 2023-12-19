import fs from "fs"

fs.writeFileSync("tokens.txt", fs.readFileSync("tokens", "utf8")
  .split("\n")
  .filter(Boolean)
  .map(line => line.split(" "))
  .map(([base64, id]) => ({id, utf8: Buffer.from(base64, "base64").toString("utf8")}))
  .map(token => `${token.id} ${token.utf8}`)
  .join("\n"), "utf8")
