import { useEffect, useState } from "react";
import { useUploadMediaMutation } from "../../features/media/mediaService";
import Spinner from "../Spinner";

const ImageUploader = ({ value, onChange }) => {
  const [preview, setPreview] = useState(value || "");
  const [file, setFile] = useState(null);
  const [upload, resp] = useUploadMediaMutation();

  useEffect(() => {
    if (resp.isSuccess) {
      const url = resp?.data?.result?.url;
      if (url) {
        setPreview(url);
        onChange(url);
      }
    }
  }, [resp.isSuccess]);

  const onFile = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    await upload({ file: f, type: 'IMAGE' });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
      <div>
        <input type="file" accept="image/*" onChange={onFile} className="input-file" />
        {resp.isLoading && <div className="mt-2"><Spinner /></div>}
      </div>
      <div>
        {preview ? (
          <img src={preview} alt="preview" className="w-full max-w-xs rounded shadow" />
        ) : (
          <div className="w-full max-w-xs h-[160px] bg-gray-200 rounded" />
        )}
      </div>
    </div>
  );
};

export default ImageUploader;


