import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Get filenames under /posts
  const fileNames = fs.readdirSync(postsDirectory)

  const allPostsData = fileNames.map(fileName => {
    // Remove '.md' from the filename to get id
    const id = fileName.slice(0, -3)

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Parse the post metadata
    const matterResult = matter(fileContents)

    // Return combined data with id
    return {id, ...matterResult.data}
  })

  // Sort posts by date
  return allPostsData.sort((a, b) => a.date <= b.date ? 1 : -1)
}
