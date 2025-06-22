import fs from "fs/promises";
import path from "path";

interface TemplateMetadata {
  summary: string;
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
  
  // Extract @summary
  const summaryMatch = jsdocContent.match(/@summary\s+(.+)/);
  const summary = summaryMatch?.[1]?.trim() || "No description available";
  
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
  
  return {
    summary,
    icon
  };
}

async function build() {
  const templatesDir = path.resolve("templates");
  const distDir = path.resolve("dist");
  const distTemplatesDir = path.join(distDir, "templates");
  const files = await fs.readdir(templatesDir);
  const entries: TemplateEntry[] = [];

  // Ensure dist directories exist
  await fs.mkdir(distDir, { recursive: true });
  await fs.mkdir(distTemplatesDir, { recursive: true });

  for (const file of files) {
    if (!file.endsWith(".ts")) continue;
    
    const filePath = path.join(templatesDir, file);
    const metadata = await extractMetadataFromJSDoc(filePath);
    
    if (metadata) {
      entries.push({
        path: file,
        metadata
      });

      // Copy the .ts file to dist/templates/ for npm publishing
      const distFilePath = path.join(distTemplatesDir, file);
      await fs.copyFile(filePath, distFilePath);
    }
  }
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