import load from "../assets/load.svg"
const Loadinpage = ({send="orbiter"}) => {
  return (
    <div className=' z-[1000] fixed select-none w-full h-screen left-0  top-0 bg-black text-white flex justify-center flex-col gap-3 items-center'>
        <img src={load} className=' animate-pulse w-8'/>
        <p className=" text-[1rem] inter font-semibold capitalize">{send}</p>
    </div>
  )
}

export default Loadinpage