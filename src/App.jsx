import React, { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [textImage, setTextImage] = useState("");

  const handleChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const convertImgToText = async () => {
    const worker = await createWorker("eng");
    const ret = await worker.recognize(selectedImage);
    console.log(ret?.data.text);
    setTextImage(ret?.data?.text);
    await worker.terminate();
  };

  useEffect(() => {
    convertImgToText();
  }, [selectedImage]);

  return (
    <>
      <div>
        <label htmlFor="upload">Upload image</label>
        <input
          type="file"
          id="upload"
          accept="image/*"
          onChange={handleChange}
        />
      </div>
      <div>
        {selectedImage && (
          <div>
            <img
              style={{ width: "420px" }}
              src={URL.createObjectURL(selectedImage)}
              alt="Uploaded"
            />
          </div>
        )}
        {textImage && <div>{textImage}</div>}
      </div>
    </>
  );
}