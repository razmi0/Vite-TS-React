import { useState } from "react";

interface Props {
    handle: () => void;
    arr_items: Array<Partial<Props>>;
}


function ListGroup({  handle , arr_items } : Props) {
  

  

  // HOOK
  const [selectedIndex, setSelectedIndex] = useState(0);
  const stateStyle = () : string => {
    return selectedIndex === 0 ? "list-group-item active" : "list-group-item";
  };




  return (
    <>
      <h1 className="mt-3 mb-3">List Group</h1>
      <ul className="list-group">{}
        <li className={ stateStyle } onClick={handle}></li>
      </ul>
    </>
  );
}

export default ListGroup;
