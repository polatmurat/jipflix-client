const ImagePreview = ({url, heading}) => {
  return (
    <div>
        {url && <div>
            <h1 className="my-2 text-base capitalize">{heading}</h1>
            <div className="w-full max-h-[190px] h-full rounded-md mt-3 overflow-hidden">
                <img src={url} alt="image" className="w-full h-full object-cover" />
            </div>
            </div>}
    </div>
  )
}

export default ImagePreview