const fs = require('fs');
const path = require('path');

exports.delImg = (filePath) => {
  if (filePath !== 'profile/default.svg') {
    filePath = path.join(__dirname, '../../uploads/', filePath);

    fs.unlink(filePath, (err) => {
      if (err) throw err;
    });
  }
};

exports.cloneImg = async (filePath) => {
  try {
    if (!filePath) return null;

    const { v4: uuidv4 } = await import('uuid');

    const uploadsDir = path.join(__dirname, '../../uploads/');
    const src = path.join(uploadsDir, filePath);

    // Check if file exists
    if (!fs.existsSync(src)) {
      console.warn(`⚠️ cloneImg: Source file not found: ${src}`);
      return null;
    }

    const dir = path.dirname(filePath);
    const ext = path.extname(filePath);
    const baseName = path.basename(filePath, ext);

    // Generate new name only
    const newFileName = `${baseName}-${uuidv4()}${ext}`;
    const dest = path.join(uploadsDir, dir, newFileName);

    // Clone the file
    await fs.promises.copyFile(src, dest);

    console.log(`✅ cloneImg: Cloned ${filePath} → ${dir}/${newFileName}`);

    // Return just the new filename (not path)
    return newFileName;
  } catch (error) {
    console.error(`❌ cloneImg error: ${error.message}`);
    return null;
  }
};
