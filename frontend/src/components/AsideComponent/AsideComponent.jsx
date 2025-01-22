import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faNewspaper, faRoad } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

 const AsideComponent = () => {
  return (
    <aside className=" md:block lg:block basis-1/12 bg-white container px-4">
        <ul className="py-4 grid grid-cols-1 gap-2">
            <li >
                <Link className="rounded-2xl border px-1 py-4 bg-slate-200 text-black flex items-center justify-center flex-col " to="/">
                    <FontAwesomeIcon icon={faHouse} />
                    <div className="text-xs mt-2" >Trang Chủ</div>
                </Link>
            </li>
            <li >
                <Link className="rounded-2xl border px-2 py-4 bg-slate-200 text-black flex items-center justify-center flex-col " to="/">
                    <FontAwesomeIcon icon={faRoad} />
                    <div className="text-xs mt-2" >Lộ Trình</div>
                </Link>
            </li>
            <li >
                <Link className="rounded-2xl border px-2 py-4 bg-slate-200 text-black flex items-center justify-center flex-col " to="/">
                    <FontAwesomeIcon icon={faNewspaper} />
                    <div className="text-xs mt-2" >Bài Viết</div>
                </Link>
            </li>
            
        </ul>
    </aside>
  )
}
export default AsideComponent;