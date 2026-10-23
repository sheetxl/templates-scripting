/**
 * Reads every template under `templates/` and writes the catalog `dist/` that unpkg serves.
 *
 *   templates/<name>.ts   a template; its metadata comes from the first JSDoc block:
 *                           @name     the title (default: the file name, title-cased; a formula's is upper-cased)
 *                           @summary  the line under the title (default: the first line of the description)
 *                           @icon     formula | macro | autostart (default: detected from the source)
 *                           @hidden   leave the template out, optionally with a reason
 *
 * Output:
 *
 *   dist/contents.json                         root listing of every file and folder
 *   dist/templates-scripting/contents.json     the catalog
 *   dist/templates-scripting/<name>.ts
 *
 *   dist/manifest.json, dist/templates/<name>.ts   the previous layout, for script editors released
 *                                                  before the catalog. Remove once those are retired.
 *
 * Any problem fails the build.
 */
import fs from "fs/promises";
import path from "path";

const PACKAGE = "templates-scripting";
const SCHEMA = 1;

type Icon = "formula" | "macro" | "autostart";
const ICONS: Icon[] = ["formula", "macro", "autostart"];

const SRC = path.resolve("templates");
const DIST = path.resolve("dist");
const OUT = path.join(DIST, PACKAGE);
const LEGACY_OUT = path.join(DIST, "templates");

interface Entry {
  path: string;
  title: string;
  summary: string;
  icon: Icon;
}

const problems: string[] = [];

const posix = (p: string) => p.split(path.sep).join("/");

/** "autoFillDown" becomes "Auto Fill Down"; a formula's name is upper-cased, as the function is called. */
function toTitle(base: string, icon: Icon): string {
  if (icon === "formula") return base.toUpperCase();
  return base
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** The catalog entry for a template, or `null` when it is `@hidden`. */
async function readTemplate(file: string, relPath: string): Promise<Entry | null> {
  const content = await fs.readFile(file, "utf-8");
  const jsdoc = content.match(/\/\*\*([\s\S]*?)\*\//)?.[1];
  if (!jsdoc) {
    problems.push(`templates/${relPath}: no JSDoc block; the first one describes the template`);
    return null;
  }
  if (/@hidden\b/.test(jsdoc)) return null;

  const tag = (name: string) => jsdoc.match(new RegExp(`@${name}[ \\t]+(.+)`))?.[1]?.trim() || undefined;
  const firstLine = jsdoc
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*\*?\s?/, "").trim())
    .find((line) => line.length > 0);
  const summary = tag("summary") ?? (firstLine && !firstLine.startsWith("@") ? firstLine : undefined);
  if (!summary) problems.push(`templates/${relPath}: no @summary and no description line`);

  let icon: Icon;
  const iconTag = tag("icon");
  if (iconTag !== undefined) {
    if (!ICONS.includes(iconTag as Icon)) problems.push(`templates/${relPath}: @icon must be one of ${ICONS.join(", ")}`);
    icon = iconTag as Icon;
  } else if (content.includes("export default")) {
    icon = "autostart";
  } else if (content.includes("SheetXL.")) {
    icon = "macro";
  } else {
    icon = "formula";
  }

  const base = path.basename(relPath, ".ts");
  return { path: relPath, title: tag("name") ?? toTitle(base, icon), summary: summary ?? "", icon };
}

async function findTemplates(dir: string, rel = ""): Promise<{ file: string; relPath: string }[]> {
  const found: { file: string; relPath: string }[] = [];
  for (const d of await fs.readdir(dir, { withFileTypes: true })) {
    if (d.name.startsWith(".")) continue;
    const file = path.join(dir, d.name);
    const relPath = rel ? `${rel}/${d.name}` : d.name;
    if (d.isDirectory()) found.push(...await findTemplates(file, relPath));
    else if (d.name.endsWith(".ts")) found.push({ file, relPath });
  }
  return found;
}

async function build(): Promise<void> {
  const entries: Entry[] = [];
  const sources = new Map<string, string>();
  for (const { file, relPath } of await findTemplates(SRC)) {
    const entry = await readTemplate(file, relPath);
    if (!entry) {
      console.log(`SKIP  ${relPath}`);
      continue;
    }
    console.log(`  ok  ${relPath}  ${entry.icon}  ${entry.title}`);
    entries.push(entry);
    sources.set(relPath, file);
  }

  if (problems.length) {
    console.error(`\n${problems.length} problem(s):`);
    for (const p of problems) console.error(`  - ${p}`);
  }
  if (entries.length === 0) problems.push("no templates found");
  if (problems.length) {
    console.error("\nBuild failed");
    process.exit(1);
  }

  entries.sort((a, b) => a.title.localeCompare(b.title));

  for (const { path: relPath } of entries) {
    for (const out of [OUT, LEGACY_OUT]) {
      const to = path.join(out, relPath);
      await fs.mkdir(path.dirname(to), { recursive: true });
      await fs.copyFile(sources.get(relPath)!, to);
    }
  }

  const catalog = { kind: "templates", package: PACKAGE, meta: { schema: SCHEMA }, entries };
  await fs.writeFile(path.join(OUT, "contents.json"), JSON.stringify(catalog, null, 2) + "\n");

  const legacy = entries.map(({ path: relPath, title, summary, icon }) => ({
    path: `templates/${relPath}`,
    metadata: { title, summary, icon },
  }));
  await fs.writeFile(path.join(DIST, "manifest.json"), JSON.stringify(legacy, null, 2) + "\n");

  // The root listing: every file and folder under dist/, except itself.
  const files: string[] = [];
  const folders: string[] = [];
  async function walk(dir: string): Promise<void> {
    for (const d of (await fs.readdir(dir, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
      const full = path.join(dir, d.name);
      const rel = posix(path.relative(DIST, full));
      if (d.isDirectory()) {
        folders.push(rel);
        await walk(full);
      } else if (rel !== "contents.json") {
        files.push(rel);
      }
    }
  }
  await walk(DIST);
  await fs.writeFile(
    path.join(DIST, "contents.json"),
    JSON.stringify({ entries: files.map((p) => ({ path: p })), folders }, null, 2) + "\n",
  );

  console.log(`\nBuilt ${entries.length} template(s)`);
  console.log(`- dist/contents.json (root listing, ${files.length} files)`);
  console.log(`- dist/${PACKAGE}/contents.json (catalog)`);
  console.log(`- dist/manifest.json (previous layout)`);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
