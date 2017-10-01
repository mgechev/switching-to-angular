import { APP_BASE, APP_DEST, APP_ROOT, APP_SRC, APP_TITLE, SYSTEM_CONFIG, VERSION } from '../config';
import * as fs from 'fs';
import { join, sep } from 'path';
import * as jsonfile from 'jsonfile';

const CHAPTERS_MAP = {
  ch1: 'Chapter 1',
  ch2: 'Chapter 2',
  ch3: 'Chapter 3',
  ch4: 'Chapter 4',
  ch5: 'Chapter 5',
  ch6: 'Chapter 6',
  ch7: 'Chapter 7',
  ch8: 'Chapter 8',
  ch9: 'Chapter 9'
};

function listMetadataStrategy(data) {
  return `<li><a href="${data.file.replace(APP_SRC + sep, '')}">
    ${data.chapter}, ${data.meta.title}</a>
    ${!data.meta.presented ? '<i style="color: #ccc;">(Not presented in the book\'s content)</i>' : ''}
  </li>`;
}

function readMetadata(current, appRoot) {
  var result = [];
  fs.readdirSync(current).forEach(function (file) {
    if (file === 'meta.json') {
      file = join('.', sep, current, file);
      const currentChapterAbr = file.match(/(ch\d+)/)[0];
      const chapter = CHAPTERS_MAP[currentChapterAbr];
      result.push({
        chapter,
        file: current,
        meta: jsonfile.readFileSync(file)
      });
    } else if (fs.lstatSync(join(current, file)).isDirectory()) {
      result = result.concat(readMetadata(join(current, file), appRoot));
    }
  });
  return result;
}

function getMetadata(appRoot) {
  const metadata = readMetadata(appRoot, appRoot).sort((a, b) => {
    const chapterA = parseInt(a.chapter.match(/\d+/)[0]);
    const chapterB = parseInt(b.chapter.match(/\d+/)[0]);
    if (chapterA < chapterB) {
      return -1;
    } else if (chapterA > chapterB) {
      return 1;
    }
    if (a.meta.id < b.meta.id) {
      return -1;
    } else {
      return 1;
    }
  });
  const items = metadata.map(listMetadataStrategy);
  return '<ol class="examples-list">' + items.join('\n') + '</ol>';
}

// TODO: Add an interface to register more template locals.
export function templateLocals() {
  return {
    APP_BASE,
    APP_DEST,
    APP_ROOT,
    APP_TITLE,
    SYSTEM_CONFIG,
    VERSION,
    EXAMPLES_LIST: getMetadata(join(APP_SRC))
  };
}
