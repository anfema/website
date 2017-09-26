const CachingWriter = require('broccoli-caching-writer');
const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const stringify = require('json-stable-stringify');

function _listFilesByDirectory(files) {
	return files.reduce((directories, entry) => {
		const { relativePath } = entry;

		directories[relativePath] = directories[relativePath] || [];

		directories[relativePath].push(entry);

		return directories;
	}, {});
}

function _writeFile(dir, fileName, content) {
	mkdirp.sync(dir);

	const filePath = path.join(dir, fileName);

	fs.writeFileSync(filePath, content, { encoding: 'utf8' });
}

class ContentReducer extends CachingWriter {
	constructor(inputNode, options) {
		if (!Array.isArray(inputNode)) {
			inputNode = [inputNode];
		}

		super(inputNode, {
			annotation: 'Content Reducer',
		});

		this.options = options;
	}

	build() {
		const outputPath = path.join(this.outputPath, this.options.outputPath);

		mkdirp.sync(outputPath);

		const directories = _listFilesByDirectory(this._readFiles());

		Object.keys(directories).forEach(relativePath => {
			const files = directories[relativePath];
			let index = { files: [] };

			files.forEach(file => {
				const fileName = `${file.fileName}.json`;
				const fileMeta = file.contents.meta;

				if (file.fileName !== 'index') {
					const meta = {
						file: fileName,
						sorting: file.sortingKey,
					};

					if (fileMeta) {
						meta.meta = fileMeta;
					}

					index.files.push(meta);

					_writeFile(
						path.join(outputPath, file.relativePath),
						fileName,
						stringify(file.contents)
					);
				} else {
					index = Object.assign({}, file.contents, index);
				}
			});

			_writeFile(path.join(outputPath, relativePath), 'index.json', stringify(index));
		});
	}

	_readFiles() {
		return this.listEntries().map(entry => {
			const { basePath, relativePath: relativePathWithFileName } = entry;
			const file = fs.readFileSync(path.join(basePath, relativePathWithFileName));
			const contents = yaml.load(file, 'utf8');
			const relativePath = path.dirname(relativePathWithFileName);
			const ext = path.extname(relativePathWithFileName);
			const basename = path.basename(relativePathWithFileName);
			const fileName = basename.substr(0, basename.length - ext.length);
			const matches = fileName.match(/(^\d*)(?:\.?)(.*)/);
			const strippedFileName = matches[2];

			let sortingKey = matches[1];

			if (sortingKey === '') {
				sortingKey = strippedFileName;
			}

			return {
				relativePath,
				sortingKey,
				fileName: strippedFileName,
				contents,
			};
		});
	}
}

module.exports = ContentReducer;