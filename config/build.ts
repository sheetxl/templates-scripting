import fs from "fs/promises";
import path from "path";

interface TemplateMetadata {
  summary: string;
  name?: string; // Optional name, can be null if not specified
  icon: "formula" | "macro" | "autostart";
}

interface TemplateEntry {
  path: string;
  metadata: TemplateMetadata;
}

async function extractMetadataFromJSDoc(filePath: string): Promise<TemplateMetadata | null> {
  const content = await fs.readFile(filePath, "utf-8");
  
  // Extract JSDoc comment block
  const jsdocMatch = content.match(/\/\*\*([\s\S]*?)\*\//);
  if (!jsdocMatch) return null;
  
  const jsdocContent = jsdocMatch[1];
  
  // Extract @hidden
  const hiddenMatch = jsdocContent.match(/@hidden\s+(.+)/);
  if (hiddenMatch) {
    // If @hidden is present, skip this template
    return null;
  }
  // Extract @summary
  const summaryMatch = jsdocContent.match(/@summary\s+(.+)/);
  const summary = summaryMatch?.[1]?.trim() || "No description available";

  const nameMatch = jsdocContent.match(/@name\s+(.+)/);
  const name = nameMatch?.[1]?.trim() || null;

  // Extract @icon
  const iconMatch = jsdocContent.match(/@icon\s+(formula|macro|autostart)/);
  let icon: "formula" | "macro" | "autostart" = "formula"; // default
  
  if (iconMatch) {
    icon = iconMatch[1] as "formula" | "macro" | "autostart";
  } else {
    // Fallback to auto-detection if @icon not specified
    if (content.includes("export default")) {
      icon = "autostart";
    } else if (content.includes("SheetXL.")) {
      icon = "macro";
    } else {
      icon = "formula"; // default if no other patterns match
    }
  }

  const meta: TemplateMetadata = {
    summary,
    icon
  };
  if (name) {
    meta.name = name; // Include name if specified
  }
  return meta;
}

async function build() {
  const templatesDir = path.resolve("templates");
  const distDir = path.resolve("dist");
  const distTemplatesDir = path.join(distDir, "templates");
  const entries: TemplateEntry[] = [];

  // Ensure dist directories exist
  await fs.mkdir(distDir, { recursive: true });
  await fs.mkdir(distTemplatesDir, { recursive: true });

  // Recursively find all .ts files in templates directory
  async function findTemplateFiles(dir: string, relativePath: string = ""): Promise<void> {
    const files = await fs.readdir(dir, { withFileTypes: true });
    
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      const relativeFilePath = relativePath ? path.join(relativePath, file.name) : file.name;
      
      if (file.isDirectory()) {
        // Recursively process subdirectories
        await findTemplateFiles(fullPath, relativeFilePath);
      } else if (file.name.endsWith(".ts")) {
        // Process TypeScript files
        const metadata = await extractMetadataFromJSDoc(fullPath);
        
        if (metadata) {
          entries.push({
            path: `templates/${relativeFilePath.replace(/\\/g, "/")}`, // Ensure forward slashes and include templates prefix
            metadata
          });

          // Copy the .ts file to dist/templates/ maintaining directory structure
          const distFilePath = path.join(distTemplatesDir, relativeFilePath);
          await fs.mkdir(path.dirname(distFilePath), { recursive: true });
          await fs.copyFile(fullPath, distFilePath);
        }
      }
    }
  }

  await findTemplateFiles(templatesDir);
  // Sort entries by summary for consistent ordering
  entries.sort((a, b) => a.metadata.summary.localeCompare(b.metadata.summary));

  
  // Write manifest.json to dist folder (for npm package consumption)
  await fs.writeFile(
    path.join(distDir, "manifest.json"), 
    JSON.stringify(entries, null, 2)
  );

  console.log(`Built manifest with ${entries.length} templates`);
  console.log(`- dist/manifest.json (npm package main file)`);
  console.log(`- dist/templates/*.ts (template source files for npm)`);
}

build().catch(console.error);