import fs from "fs";
import path from "path";

const saveScreenCapturorFile = (chunk) => {

    const buffer = Buffer.from(chunk);

    const uploadFolder = path.join(
        process.cwd(),
        "uploads"
    );

    if (!fs.existsSync(uploadFolder)) {
        fs.mkdirSync(uploadFolder, { recursive: true });
    }

    const filePath = path.join(
        uploadFolder,
        `screen-${Date.now()}.png`
    );

    fs.writeFileSync(filePath, buffer);

    return filePath;
};

export default saveScreenCapturorFile;