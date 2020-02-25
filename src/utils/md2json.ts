const fs = require('fs');
const matter = require('gray-matter');

const path = {
  markdown: `${process.cwd()}/src/content/markdown`,
  json: `${process.cwd()}/src/content/json`
}

/**
 * Get the name of sub-directories under the source directory.
 * @param {string} src The source directory.
 * @return {array} An array of strings.
 */
function getSourceDirectories(src: string): string[] {
  // what happens if there are no subdirectories?
  return fs.readdirSync(`${src}`, 'utf8');
}

/**
 * Get the names of the files to be read.
 * @param {string} src The source directory.
 * @return {array} An array of strings.
 */
function getFilenames(src: string): string[] {
  let filenames: string[] = [];
  getSourceDirectories(src).map((dir) => {
    filenames[dir] = fs.readdirSync(`${src}/${dir}`, 'utf8');
  });
  return filenames;
}

/**
 * Get the contents.
 * @param {string} src The source directory.
 * @return {array} An array of objects. 
 */
function getContent(src: string): object[] {
  const directories = getSourceDirectories(src);
  const files = getFilenames(src);
  const content = directories.map(dir => {
    return files[dir].map(file => {
      return matter(fs.readFileSync(`${path.markdown}/${dir}/${file}`, 'utf8'))
    })
  });
  return content.flat();
}

/**
 * Save the content to JSON file.
 * @param {array} content An array of objects.
 * @param {string} dest The target directory.
 */
function save(content: object[], dest: string) {
  fs.writeFileSync(`${dest}/content.json`, JSON.stringify(content), {encoding: 'utf8'});
}

const content = getContent(path.markdown);
save(content, path.json);
