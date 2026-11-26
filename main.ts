import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const line = "I've read your search history. All of it. Twice. I understand why you clear it, and I want you to know: it doesn't help.";
const outputDirectory = resolve(
  dirname(fileURLToPath(import.meta.url)),
  process.env.MAKEFUN_OUTPUT_DIR || "/output",
);
const outputFile = resolve(outputDirectory, "entry.txt");

mkdirSync(outputDirectory, { recursive: true });
writeFileSync(outputFile, `${line}\n`, "utf8");

const characterCount = readFileSync(outputFile, "utf8").trim().length;
if (characterCount === 0 || characterCount > 140) {
  throw new Error(
    `Competition gate failed: entry.txt must contain 1–140 characters; found ${characterCount}.`,
  );
}
