const SizeList = ({list, deleteSize}) => {


  return list.length > 0 && <>
  <h3 className="right-heading mt-3">Sizes List</h3>
  <div className="flex flex-wrap -mx-2">
    {list.map((size => (
      <div key={size.name} className="size" onClick={() => deleteSize(size.name)}>{size.name}</div>
      )))}
  </div>
  </>    
}

export default SizeList