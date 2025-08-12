const Colors = ({ colors, deleteColors }) => {
  return (
    <div>
      {colors.length > 0 && <h1 className="right-heading">Colors List</h1>}
      {colors.length > 0 && (
        <div className="flex flex-wrap">
          {colors.map((color) => (
            <div
              key={color.id}
              className="w-[30px] h-[30px] rounded-full cursor-pointer p-3 mr-1"
              style={{ background: color.color }}
              onClick={() => deleteColors(color)}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Colors;
