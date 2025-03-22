import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set functionsDir to a specific folder or project root
const functionsDir = path.resolve(__dirname, '../../functions'); // Adjust as necessary

export default {
  async execute(utils) {
    let result;

    switch (utils.inside) {
      case 'commandList': {
        // Ensure client.commands is a Map and map over its values
        const commandNames = utils.client?.commands?.map ? 
          [...utils.client.commands.values()].map(c => c.name) : [];
        result = commandNames.join(', ');
        break;
      }

      case 'commandCount': {
        // If client.commands is a Map, count its size
        const commandCount = utils.client?.commands?.size || 0;
        const appCommandCount = utils.client?.applicationcommands?.size || 0;
        result = commandCount + appCommandCount;
        break;
      }

      case 'functionsCount': {
        try {
          // Read the main directory to get subdirectories
          const subDirs = await fs.promises.readdir(functionsDir, { withFileTypes: true });

          // For each subdirectory, read the files within it
          result = await Promise.all(
            subDirs
              .filter(dir => dir.isDirectory()) // Ensure we only work with directories
              .map(async dir => {
                const subDirPath = path.join(functionsDir, dir.name);
                const files = await fs.promises.readdir(subDirPath, { withFileTypes: true });

                // Filter for files only (ignore directories)
                return files.filter(file => file.isFile()).length;
              })
          ).then(counts => counts.reduce((a, b) => a + b, 0)); // Total count of files in all subdirectories
        } catch (error) {
          console.error('Error counting files in functionsDir:', error);
          result = 0; // If there's an error, return 0
        }
        break;
      }

      case 'functionsList': {
        const getAllFiles = (dirPath) => {
          const entries = fs.readdirSync(dirPath, { withFileTypes: true });
          return entries.flatMap(entry => {
            const fullPath = path.join(dirPath, entry.name);
            return entry.isDirectory() ? getAllFiles(fullPath) : entry.name;
          });
        };

        const files = getAllFiles(functionsDir)
          .filter(file => file.endsWith('.js')); // Include only `.js` files
        result = [...new Set(files)].join(', ');
        break;
      }

      default: {
        throw new Error(`Invalid type: ${utils.inside}`);
      }
    }

    return {
      code: result,
    };
  },
};
