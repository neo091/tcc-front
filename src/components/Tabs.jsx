import { useSelectedStore } from "@store/useSelectedStore";

const Tabs = ({ tabList }) => {

  const { selected, setSelected } = useSelectedStore()

  return (
    <header className="my-6 flex justify-between overflow-hidden rounded-md bg-slate-800 p-2 text-gray-500">

      {
        tabList?.map(tab => (
          <button key={tab.id} className={` p-2 block w-full ${selected === tab.selected && "bg-slate-700 text-white"} hover:text-white  rounded-md transition-all duration-300`} onClick={() => setSelected(tab.selected)}>{tab.title}</button>
        ))
      }
    </header>
  );
}

export default Tabs;
