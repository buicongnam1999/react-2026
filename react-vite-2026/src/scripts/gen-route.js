import fs from "fs"
import path from "path"

const args = process.argv.slice(2)

if (args.length === 0) {
  console.error("❌ Usage:")
  console.error("1:  npm run router:gen post")
  console.error("2:  npm run router:gen admin post")
  console.error("3:  npm run router:gen admin/post post-new")
  process.exit(1)
}

const routesRoot = path.resolve("src/routes")
const pagesRoot = path.resolve("src/pages")

let pathParts = []
let name = ""
let isNestedPage = false

// CASE 1: post
if (args.length === 1) {
  name = args[0]
}

// CASE 2: admin post
if (args.length === 2 && !args[0].includes("/")) {
  pathParts = [args[0]]
  name = args[1]
}

// CASE 3: admin/post post-new
if (args.length === 2 && args[0].includes("/")) {
  pathParts = args[0].split("/")
  name = args[1]
  isNestedPage = true
}

/* ================= ROUTES ================= */

const routeDir = path.join(routesRoot, ...pathParts)
fs.mkdirSync(routeDir, { recursive: true })

const routeFileName = isNestedPage
  ? `${name}.route.tsx`
  : `${name}.route.tsx`

const routeFile = path.join(routeDir, routeFileName)

// path import page
const pageImportPath = isNestedPage
  ? `@/pages/${[...pathParts, name].join("/")}`
  : `@/pages/${[...pathParts, name].join("/")}`

const routeUrl = "/" + [...pathParts, name].join("/")

if (!fs.existsSync(routeFile)) {
  fs.writeFileSync(
    routeFile,
    `import { createFileRoute } from "@tanstack/react-router"
import Page from "${pageImportPath}"

export const Route = createFileRoute("${routeUrl}")({
  component: Page,
})
`
  )
}

/* ================= PAGES ================= */

let pageDir = ""
let pageFile = ""

if (isNestedPage) {
  pageDir = path.join(pagesRoot, ...pathParts)
  pageFile = path.join(pageDir, `${name}.tsx`)
} else {
  pageDir = path.join(pagesRoot, ...pathParts, name)
  pageFile = path.join(pageDir, "index.tsx")
}

fs.mkdirSync(pageDir, { recursive: true })

if (!fs.existsSync(pageFile)) {
  fs.writeFileSync(
    pageFile,
    `export default function ${toPascalCase(name)}Page() {
  return <div>${name} page</div>
}
`
  )
}

console.log("✅ Generated & linked:")
console.log(routeFile)
console.log(pageFile)

/* ================= UTILS ================= */

function toPascalCase(str) {
  return str
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("")
}
