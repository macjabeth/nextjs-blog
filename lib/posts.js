import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  // Get filenames under /posts
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    // Remove '.md' from the filename to get id
    const id = fileName.slice(0, -3);

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf-8");

    // Parse the post metadata
    const matterResult = matter(fileContents);

    // Return combined data with id
    return { id, ...matterResult.data };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => (a.date <= b.date ? 1 : -1));
}

export function getAllPostIds() {
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => ({
    params: {
      id: filename.slice(0, -3), // remove '.md' from the end
    },
  }));
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id
  return { id, contentHtml, ...matterResult.data };
}
