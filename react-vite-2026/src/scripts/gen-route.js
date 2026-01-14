// scripts/gen-route.js
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const folder = process.argv[2]        // admin
const rawFile = process.argv[3]       // user.router

if (!folder || !rawFile) {
  console.error('❌ Usage: gen:route <folder> <file>')
  process.exit(1)
}

// ===== PARSE FILE =====
const parts = rawFile.split('.')
const name = parts[0]                 // user
const suffix = parts.slice(1).join('.') // router

const routePath = `/${folder}/${name}`

// ===== PATHS =====
const routesDir = path.resolve('src/routes')
const pagesDir = path.resolve('src/pages')

const routeFolderDir = path.join(routesDir, folder)
const pageFolderDir = path.join(pagesDir, folder, name)

// ===== CREATE ROUTE FILE =====
fs.mkdirSync(routeFolderDir, { recursive: true })

const routeFilePath = path.join(
  routeFolderDir,
  `${name}.${suffix}.tsx`
)

const componentName =
  pascalCase(name) + pascalCase(suffix)

const pageComponentImport = `@/pages/${folder}/${name}`

const routeContent = `import { createFileRoute } from '@tanstack/react-router'
import ${componentName} from '${pageComponentImport}'

export const Route = createFileRoute('${routePath}')({
  component: ${componentName},
})
`

fs.writeFileSync(routeFilePath, routeContent)

// ===== CREATE PAGE FOLDER =====
fs.mkdirSync(pageFolderDir, { recursive: true })

// index.tsx
fs.writeFileSync(
  path.join(pageFolderDir, 'index.tsx'),
  `export default function ${componentName}() {
  return <div>${routePath}</div>
}
`
)

// hook example
fs.writeFileSync(
  path.join(pageFolderDir, `${name}.hook.ts`),
  `export function use${pascalCase(name)}() {
  return {}
}
`
)

// ===== GENERATE ROUTE TREE =====
console.log('🔄 Generating routeTree.gen.ts...')
execSync('npx tanstack-router generate', { stdio: 'inherit' })

console.log(`✅ Route + page created for ${routePath}`)

// ===== UTILS =====
function pascalCase(str) {
  return str
    .split(/[-_.]/)
    .filter(Boolean)
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')
}