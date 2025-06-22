import fs from "fs/promises";
import path from "path";

interface TemplateMetadata {
  title: string;
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
  
  // Extract title from @summary or function name
  let title = summary;
  
  // Try to extract function name as fallback
  const functionMatch = content.match(/export\s+(?:default\s+)?function\s+(\w+)/);
  const exportMatch = content.match(/export\s+(?:const|function)\s+(\w+)/);
  
  if (!summaryMatch && (functionMatch || exportMatch)) {
    title = (functionMatch?.[1] || exportMatch?.[1] || "Unknown").replace(/([A-Z])/g, " $1").trim();
    title = title.charAt(0).toUpperCase() + title.slice(1);
  }
  
  // Determine icon based on content patterns
  let icon: "formula" | "macro" | "autostart" = "formula";
  
  // Check for autostart (default export)
  if (content.includes("export default")) {
    icon = "autostart";
  }
  // Check for macro patterns (sheet manipulation, styling)
  else if (content.includes("sheet.") || content.includes("range.") || content.includes("Style") || content.includes("Color") || content.includes("Border")) {
    icon = "macro";
  }
  
  return {
    title,
    summary,
    icon
  };
}

async function build() {
  const templatesDir = path.resolve("templates");
  const distDir = path.resolve("dist");
  const files = await fs.readdir(templatesDir);
  const entries: TemplateEntry[] = [];

  // Ensure dist directory exists
  await fs.mkdir(distDir, { recursive: true });

  for (const file of files) {
    if (!file.endsWith(".ts")) continue;
    
    const filePath = path.join(templatesDir, file);
    const metadata = await extractMetadataFromJSDoc(filePath);
    
    if (metadata) {
      entries.push({
        path: file,
        metadata
      });
    }
  }

  // Sort entries by title for consistent ordering
  entries.sort((a, b) => a.metadata.title.localeCompare(b.metadata.title));

  // Write directory.json to templates folder (for development/reference)
  await fs.writeFile(
    path.join(templatesDir, "directory.json"), 
    JSON.stringify(entries, null, 2)
  );
  
  // Write manifest.json to dist folder (for npm package consumption)
  await fs.writeFile(
    path.join(distDir, "manifest.json"), 
    JSON.stringify(entries, null, 2)
  );
  
  console.log(`Built manifest with ${entries.length} templates`);
  console.log(`- templates/directory.json (development reference)`);
  console.log(`- dist/manifest.json (npm package main file)`);
}

build().catch(console.error);