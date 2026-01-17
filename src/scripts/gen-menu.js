import fs from "fs"
import path from "path"

const pagesDir = path.resolve("src/pages");
const outputDir = path.resolve("src/jsons");;
const outputFile = path.join(outputDir, "pages.json");

function scan(dir, basePath = "") {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(folder => {
      const folderPath = path.join(dir, folder.name);
      const currentPath = basePath
        ? `${basePath}/${folder.name}`
        : folder.name;

      const children = scan(folderPath, currentPath);

      const hasIndex = fs.existsSync(
        path.join(folderPath, "index.tsx")
      );

      return {
        name: folder.name,
        children: children.length > 0 ? children : null,
        ...(hasIndex && children.length === 0
          ? { link: `/${currentPath}` }
          : {})
      };
    });
}

// tạo folder options nếu chưa có
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const result = scan(pagesDir);

fs.writeFileSync(
  outputFile,
  JSON.stringify(result, null, 2),
  "utf-8"
);

console.log("✅ options/pages.json generated");