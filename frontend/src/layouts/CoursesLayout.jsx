import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AsideComponent from "../components/AsideComponent/AsideComponent"
import FooterComponent from "../components/FooterComponent/FooterComponent"
import HeaderComponent from "../components/HeaderComponent/HeaderComponent"
import { faAward, faCheck } from "@fortawesome/free-solid-svg-icons"
import YouTubePlayer from "../components/YoutubePlayer/YoutubePlayer"

const topList = [
    "Biết cách xây dựng giao diện web với HTML, CSS",
    "Biết cách đặt tên class CSS theo chuẩn BEM",
    "Làm chủ Flexbox khi dựng bố cục website",
    "Biết cách tự tạo động lực cho bản thân",
    "Học được cách làm UI chỉn chu, kỹ tính",
    "Biết cách phân tích giao diện website",
    "Biết cách làm giao diện web responsive",
    "Sở hữu 2 giao diện web khi học xong khóa học",
    "Biết cách tự tạo động lực cho bản thân",
    "Biết cách tự học những kiến thức mới",
    "Học được cách làm UI chỉn chu, kỹ tính",
    "Nhận chứng chỉ khóa học Python cơ bản"

]
const CoursesLayout = () => {
  return (
    <>
    <HeaderComponent/>

    <main className="flex bg-white">
        <AsideComponent/>
        <section className="flex-1 flex px-4 my-4" >
            <section className=" basis-2/3 px-4 ">
                <div>
                    <h2 className="text-3xl font-bold">Python Cơ bản</h2>
                    <p className="text-sm text-gray-500"> Khóa học lập trình Python cơ bản với các bài tập và lý thuyết dễ hiểu, học xong bạn có thể tự tin để tới với các chủ đề nâng cao hơn của Python.</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold">Bạn sẽ học được gì?</h3>
                    <div className="grid grid-row-5 grid-cols-2 gap-2">
                        {
                            topList.map((item, index)=>(
                                <>
                                <div key={index} ><span className="mr-1" ><FontAwesomeIcon icon={faCheck}/></span> <span className="text-sm" >{item}</span></div>
                                </>
                            ))
                        }
                    </div>
                </div>
                <div>
                    <h3 className="text-xl" >Nội dung khóa học</h3>
                    <p>14 chương | 59 bài giảng | Thời lượng : 20h </p>
                </div>
            </section>
            <section className="basis-1/3 flex flex-col">
                <div>
                    <YouTubePlayer url="https://youtu.be/NZj6LI5a9vc?si=3iO9KnNYfA53crWG"/>
                </div>
                <h3 className="text-xl font-thin text-red-500" >Miễn phí</h3>
                <button className="uppercase text-white bg-blue-500 rounded-full" >
                    Đăng ký học
                </button>
                <div>
                    <div>
                        <span><FontAwesomeIcon icon={faAward} /></span> 
                        <span>Trình độ cơ bản</span>
                    </div>
                    <div>
                        <span><FontAwesomeIcon icon={faAward} /></span> 
                        <span>Tổng số 60 bài học</span>
                    </div>
                    <div>
                        <span><FontAwesomeIcon icon={faAward} /></span> 
                        <span>Thời lượng 20h</span>
                    </div>
                    <div>
                        <span><FontAwesomeIcon icon={faAward} /></span> 
                        <span>Học mọi lúc mọi nơi</span>
                    </div>

                </div>

            
            </section>
           

            
        </section>

    </main>
    <FooterComponent/>
    </>
  )
}

export default CoursesLayout