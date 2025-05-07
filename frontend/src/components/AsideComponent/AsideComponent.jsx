
import { Link } from "react-router-dom";
import { BookOpenText, Home, MessageSquareDot, Newspaper, Swords } from "lucide-react";
import { FaRoad } from "react-icons/fa";
import routeConfig from "../../configs/routes";


 const AsideComponent = () => {
  return (
    <aside className=" md:block lg:block basis-1/12 bg-white min-h-full container px-4 py-4 lg:flex flex-col justify-between hidden">
        <ul className=" grid grid-cols-1 gap-2">
            <li >
                <Link className="rounded-2xl border px-1 py-4 bg-slate-200 text-black flex items-center justify-center flex-col " to={routeConfig.home}>
                    <Home />
                    <div className="text-xs mt-2 text-center" >Trang Chủ</div>
                </Link>
            </li>
            <li >
                <Link className="rounded-2xl border px-2 py-4 bg-slate-200 text-black flex items-center justify-center flex-col " to="/">
                    <FaRoad />
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
                    <Newspaper />
                    <div className="text-xs mt-2 text-center" >Bài Viết</div>
                </Link>
            </li>
            
        </ul>
        <div className="flex items-center justify-center">
            <Link><MessageSquareDot /></Link>
        </div>
    </aside>
  )
}
export default AsideComponent;