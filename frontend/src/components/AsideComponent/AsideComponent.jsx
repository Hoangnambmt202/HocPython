import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn, faHouse, faNewspaper, faRoad } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { BookOpenText, Swords } from "lucide-react";

 const AsideComponent = () => {
  return (
    <aside className=" md:block lg:block basis-1/12 bg-white min-h-full container px-4 py-4 flex flex-col justify-between">
        <ul className=" grid grid-cols-1 gap-2">
            <li >
                <Link className="rounded-2xl border px-1 py-4 bg-slate-200 text-black flex items-center justify-center flex-col " to="/">
                    <FontAwesomeIcon icon={faHouse} />
                    <div className="text-xs mt-2 text-center" >Trang Chủ</div>
                </Link>
            </li>
            <li >
                <Link className="rounded-2xl border px-2 py-4 bg-slate-200 text-black flex items-center justify-center flex-col " to="/">
                    <FontAwesomeIcon icon={faRoad} />
                    <div className="text-xs mt-2 text-center" >Lộ Trình</div>
                </Link>
            </li>
            <li >
                <Link className="rounded-2xl border px-2 py-4 bg-slate-200 text-black flex items-center justify-center flex-col " to="/">
                    <BookOpenText />
                    <div className="text-xs mt-2 text-center" >Luyện Tập</div>
                </Link>
            </li>
            <li >
                <Link className="rounded-2xl border px-2 py-4 bg-slate-200 text-black flex items-center justify-center flex-col " to="/">
                    <Swords />
                    <div className="text-xs mt-2 text-center" >Thi Đấu</div>
                </Link>
            </li>
            <li >
                <Link className="rounded-2xl border px-2 py-4 bg-slate-200 text-black flex items-center justify-center flex-col " to="/">
                    <FontAwesomeIcon icon={faNewspaper} />
                    <div className="text-xs mt-2 text-center" >Bài Viết</div>
                </Link>
            </li>
            
        </ul>
        <div className="flex items-center justify-center">
            <Link><FontAwesomeIcon icon={faBullhorn} /></Link>
        </div>
    </aside>
  )
}
export default AsideComponent;