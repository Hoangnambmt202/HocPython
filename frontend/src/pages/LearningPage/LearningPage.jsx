import DOMPurify from 'dompurify';
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { Check, ChevronDown, ChevronLeft, ChevronRight, Menu, MoveRight } from "lucide-react";

import YouTubePlayer from "../../components/YoutubePlayer/YoutubePlayer";
import CodeEditor from "../../components/CodeEditorComponent/CodeEditorComponent";

import LessonService from "../../services/LessonService";
import CourseService from "../../services/CourseService";
import ProgressService from "../../services/ProgressService";
import { setCourseDetail } from "../../redux/slides/coursesSlices";
import { updateCourseProgress } from "../../redux/slides/progressSlice";
import { setContent, fetchContentStart } from "../../redux/slides/courseContentSlices";
import { updateLessonProgress, setLastLesson } from "../../redux/slides/progressSlice";

const LearningPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { content = [], loading, error } = useSelector(state => state.courseContent) || {};
  const [currentLesson, setCurrentLesson] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openChapters, setOpenChapters] = useState({});
  const courseDetail = useSelector((state) => state.course.courseDetail);
  const [userCode, setUserCode] = useState("");
  const [testResults, setTestResults] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobStatus, setJobStatus] = useState(null);
  const { lessonProgress } = useSelector(state => state.progress);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);

  // Load progress
  const loadProgress = async () => {
    try {
      setIsLoadingProgress(true);
      const progress = await ProgressService.getProgress(slug);
      
      // Reset progress state trước khi cập nhật mới
      dispatch({ type: 'progress/resetProgress' });
      
      // Cập nhật tiến độ vào Redux ngay lập tức
      if (progress.data && progress.data.lessonProgress) {
        Object.entries(progress.data.lessonProgress).forEach(([lessonId, data]) => {
          if (data && data.completed) {
            dispatch(updateLessonProgress({
              courseId: slug,
              lessonId,
              completed: true
            }));
          }
        });
      }
      return progress;
    } catch (error) {
      console.error("Error loading progress:", error);
    } finally {
      setIsLoadingProgress(false);
    }
  };
  
  // Load course content và progress ban đầu
  useEffect(() => {
    const fetchCourseAndProgress = async () => {
      try {
      dispatch(fetchContentStart());
      const res = await CourseService.getCourses(slug);
      dispatch(setContent(res.data.content));
        dispatch(setCourseDetail(res.data));

        // Load progress và last lesson
        await loadProgress();
      
        const lastLesson = await ProgressService.getLastLesson(slug);
      
        // Xử lý việc chọn bài học để hiển thị
        if (lastLesson && lastLesson.data && lastLesson.data.lessonId) {
          const chapter = res.data.content?.find(c => c._id === lastLesson.data.chapterId);
          if (chapter) {
            const lesson = chapter.lessons.find(l => l._id === lastLesson.data.lessonId);
            if (lesson) {
              setCurrentLesson({
                lesson,
                chapterId: lastLesson.data.chapterId
              });
              setOpenChapters(prev => ({
                ...prev,
                [lastLesson.data.chapterId]: true
              }));
              return;
            }
          }
        }

        // Nếu không có last lesson, hiển thị bài đầu tiên
      if (res.data.content && res.data.content.length > 0) {
        const firstChapter = res.data.content.find(chapter => 
          chapter.lessons && chapter.lessons.length > 0
        );
        
        if (firstChapter) {
          const sortedLessons = [...firstChapter.lessons].sort((a, b) => a.order - b.order);
          const firstLesson = sortedLessons.find(lesson => lesson.order === 0) || sortedLessons[0];
          
          if (firstLesson) {
            setCurrentLesson({
              lesson: firstLesson,
              chapterId: firstChapter._id
            });
            setOpenChapters(prev => ({
              ...prev,
              [firstChapter._id]: true
            }));
          }
        }
      }
      } catch (error) {
        console.error("Error loading course and progress:", error);
      }
    };

    fetchCourseAndProgress();
  }, [dispatch, slug]);

  // Thêm useEffect để reload progress mỗi khi component mount
  useEffect(() => {
    const reloadProgress = async () => {
      await loadProgress();
    };
    
    window.addEventListener('focus', reloadProgress);
    
    return () => {
      window.removeEventListener('focus', reloadProgress);
    };
  }, [slug]);

  useEffect(() => {
    const updateLastLesson = async () => {
      if (currentLesson) {
        try {
          
          await ProgressService.updateLastLesson(
            slug,
            currentLesson.lesson._id,
            currentLesson.chapterId
          );
          
          dispatch(setLastLesson({
            slug,
            lessonId: currentLesson.lesson._id,
            chapterId: currentLesson.chapterId
          }));
        } catch (error) {
          console.error("Error updating last lesson:", error);
        }
      }
    };

    updateLastLesson();
  }, [currentLesson, courseDetail, dispatch, slug]);

  const toggleChapter = (chapterId) => {
    setOpenChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  const handleSelectLesson = (lesson, chapterId) => {
    setCurrentLesson({
      lesson,
      chapterId
    });
  };

  // Navigate to previous lesson
  const goToPreviousLesson = () => {
    if (!content || !currentLesson) return;
    
    // Flatten all lessons with their chapter info
    const allLessons = [];
    content.forEach(chapter => {
      if (chapter.lessons && chapter.lessons.length > 0) {
        chapter.lessons.forEach(lesson => {
          allLessons.push({
            lesson,
            chapterId: chapter._id
          });
        });
      }
    });
    if (loading) return <p>Đang tải nội dung...</p>;
  if (error) return <p>Lỗi: {error}</p>;
   
    
    // Sort by chapter order and then by lesson order
    allLessons.sort((a, b) => {
      const chapterA = content.find(c => c._id === a.chapterId);
      const chapterB = content.find(c => c._id === b.chapterId);
      const chapterOrderA = chapterA ? chapterA.order || 0 : 0;
      const chapterOrderB = chapterB ? chapterB.order || 0 : 0;
      
      if (chapterOrderA !== chapterOrderB) {
        return chapterOrderA - chapterOrderB;
      }
      
      return a.lesson.order - b.lesson.order;
    });
    
    // Find current lesson index
    const currentIndex = allLessons.findIndex(
      item => item.lesson._id === currentLesson.lesson._id
    );
    
    // Go to previous if exists
    if (currentIndex > 0) {
      const prevLesson = allLessons[currentIndex - 1];
      setCurrentLesson(prevLesson);
      
      // Open the chapter containing this lesson
      setOpenChapters(prev => ({
        ...prev,
        [prevLesson.chapterId]: true
      }));
    }
  };

  // Navigate to next lesson
  const goToNextLesson = () => {
    if (!content || !currentLesson) return;
    
    // Flatten all lessons with their chapter info
    const allLessons = [];
    content.forEach(chapter => {
      if (chapter.lessons && chapter.lessons.length > 0) {
        chapter.lessons.forEach(lesson => {
          allLessons.push({
            lesson,
            chapterId: chapter._id
          });
        });
      }
    });
    
    // Sort by chapter order and then by lesson order
    allLessons.sort((a, b) => {
      const chapterA = content.find(c => c._id === a.chapterId);
      const chapterB = content.find(c => c._id === b.chapterId);
      const chapterOrderA = chapterA ? chapterA.order || 0 : 0;
      const chapterOrderB = chapterB ? chapterB.order || 0 : 0;
      
      if (chapterOrderA !== chapterOrderB) {
        return chapterOrderA - chapterOrderB;
      }
      
      return a.lesson.order - b.lesson.order;
    });
    
    // Find current lesson index
    const currentIndex = allLessons.findIndex(
      item => item.lesson._id === currentLesson.lesson._id
    );
    
    // Go to next if exists
    if (currentIndex < allLessons.length - 1) {
      const nextLesson = allLessons[currentIndex + 1];
      setCurrentLesson(nextLesson);
      
      // Open the chapter containing this lesson
      setOpenChapters(prev => ({
        ...prev,
        [nextLesson.chapterId]: true
      }));
    }
  };
  // Phần render chức năng chạy code
  const renderCodeExecution = () => {
    return (
      <div className="mt-4">
        <CodeEditor 
          value={userCode} 
          onChange={(value) => setUserCode(value)}
        />
        
        <div className="mt-2 flex flex-col gap-2">
          <button
            onClick={handleRunCode}
            disabled={isSubmitting}
            className={`px-4 py-2 rounded ${
              isSubmitting 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-green-500 hover:bg-green-600"
            } text-white`}
          >
            {isSubmitting ? "Đang chạy..." : "Chạy thử"}
          </button>
          
          {jobStatus && (
            <div className="text-sm text-gray-600">{jobStatus}</div>
          )}
          
          {testResults.length > 0 && (
            <div className="space-y-2 mt-4">
              <h3 className="font-bold">Kết quả kiểm tra:</h3>
              <div className={`p-4 rounded-lg mb-4 ${
                testResults.every(r => r.passed) 
                  ? "bg-green-100 border border-green-200" 
                  : "bg-red-100 border border-red-200"
              }`}>
                <div className="font-semibold flex items-center gap-2">
                  {testResults.every(r => r.passed) ? (
                    <>
                      <span className="text-green-600">✅ Bài làm đạt yêu cầu!</span>
                      <span className="text-sm text-green-600">
                        ({testResults.filter(r => r.passed).length}/{testResults.length} test cases đúng)
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-red-600">❌ Bài làm chưa đạt yêu cầu</span>
                      <span className="text-sm text-red-600">
                        ({testResults.filter(r => r.passed).length}/{testResults.length} test cases đúng)
                      </span>
                    </>
                  )}
                </div>
              </div>
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg mb-2 ${
                    result.passed ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="font-medium">Test case {index + 1}</div>
                    <div className={result.passed ? "text-green-600" : "text-red-600"}>
                      {result.passed 
                        ? "✅ Đạt yêu cầu" 
                        : "❌ Chưa đạt yêu cầu"}
                    </div>
                  </div>
                  <div className="text-sm mt-2 bg-white p-3 rounded border">
                    <div><span className="font-medium">Input:</span> {result.input || '(không có)'}</div>
                    <div><span className="font-medium">Expected output:</span> {result.expectedOutput}</div>
                    <div><span className="font-medium">Actual output:</span> {result.actualOutput || '(không có output)'}</div>
                    {result.error && (
                      <div className="text-red-600 mt-2">
                        <span className="font-medium">Lỗi:</span>
                        <pre className="mt-1 p-2 bg-red-50 rounded text-sm overflow-x-auto">
                          {result.error.split('\n').map((line, i) => (
                            <div key={i}>{line}</div>
                          ))}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  const handleVideoProgress = (progress) => {
    setVideoProgress(progress);
  };

  const handleVideoComplete = async (isCompleted) => {
    if (currentLesson && currentLesson.lesson.type === "video" && isCompleted) {
      // Kiểm tra xem bài học đã hoàn thành chưa
      const isLessonCompleted = lessonProgress[slug]?.[currentLesson.lesson._id]?.completed;
      
      // Chỉ cập nhật nếu bài học chưa hoàn thành
      if (!isLessonCompleted) {
        await updateProgress(currentLesson.lesson._id, true);
      }
    }
  };
  
  const renderLessonContent = () => {
    if (!currentLesson) return <p className="text-center text-gray-500">Vui lòng chọn bài học</p>;
    const { lesson } = currentLesson;
 
    if (lesson.type === "video") {
      return (
        <div>
          <YouTubePlayer 
            url={lesson.videoUrl} 
            onProgress={handleVideoProgress}
            onVideoComplete={handleVideoComplete}
          />
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${videoProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Tiến độ xem: {Math.round(videoProgress)}%
              {videoProgress >= 80 && !lessonProgress[slug]?.[lesson._id]?.completed && 
                " - Bạn đã hoàn thành bài học này!"}
            </p>
          </div>
        </div>
      );
    } else if (lesson.type === "practice") {
      return (
        <>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Bài tập:</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <CodeEditor 
                value={lesson.practice?.initialCode} 
                readOnly={true}
                language="python"
              />
            </div>
        </div>
  
        <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Viết code của bạn:</h3>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <CodeEditor 
                value={userCode} 
                onChange={(value) => setUserCode(value)}
                language="python"
              />
              
              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={handleRunCode}
                  disabled={isSubmitting}
                  className={`px-4 py-2 rounded ${
                    isSubmitting 
                      ? "bg-gray-400 cursor-not-allowed" 
                      : "bg-green-500 hover:bg-green-600"
                  } text-white`}
                >
                  {isSubmitting ? "Đang chạy..." : "Chạy thử"}
                </button>
                
                {jobStatus && (
                  <div className="text-sm text-gray-600">{jobStatus}</div>
                )}
                
                {testResults.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-bold mb-2">Kết quả kiểm tra:</h3>
                    <div className={`p-4 rounded-lg mb-4 ${
                      testResults.every(r => r.passed) 
                        ? "bg-green-100 border border-green-200" 
                        : "bg-red-100 border border-red-200"
                    }`}>
                      <div className="font-semibold flex items-center gap-2">
                        {testResults.every(r => r.passed) ? (
                          <>
                            <span className="text-green-600">✅ Bài làm đạt yêu cầu!</span>
                            <span className="text-sm text-green-600">
                              ({testResults.filter(r => r.passed).length}/{testResults.length} test cases đúng)
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-red-600">❌ Bài làm chưa đạt yêu cầu</span>
                            <span className="text-sm text-red-600">
                              ({testResults.filter(r => r.passed).length}/{testResults.length} test cases đúng)
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    {testResults.map((result, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg mb-2 ${
                          result.passed ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="font-medium">Test case {index + 1}</div>
                          <div className={result.passed ? "text-green-600" : "text-red-600"}>
                            {result.passed 
                              ? "✅ Đạt yêu cầu" 
                              : "❌ Chưa đạt yêu cầu"}
                          </div>
                        </div>
                        <div className="text-sm mt-2 bg-white p-3 rounded border">
                          <div><span className="font-medium">Input:</span> {result.input || '(không có)'}</div>
                          <div><span className="font-medium">Expected output:</span> {result.expectedOutput}</div>
                          <div><span className="font-medium">Actual output:</span> {result.actualOutput || '(không có output)'}</div>
                          {result.error && (
                            <div className="text-red-600 mt-2">
                              <span className="font-medium">Lỗi:</span>
                              <pre className="mt-1 p-2 bg-red-50 rounded text-sm overflow-x-auto">
                                {result.error.split('\n').map((line, i) => (
                                  <div key={i}>{line}</div>
                                ))}
                              </pre>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
        </div>
        </>
      );
    } else {
      const clearContent = DOMPurify.sanitize(lesson.content || "");
      return (
        <div 
        className="prose prose-lg prose-gray max-w-none"
        dangerouslySetInnerHTML={{ __html: clearContent }} 
      />
      );
    }
  };

  const handleRunCode = async () => {
    try {
      setIsSubmitting(true);
      setTestResults([]);
      setJobStatus("Đang chạy code của bạn...");
      
      const response = await LessonService.runCode({
        code: userCode,
        testCases: currentLesson.lesson.practice.testCases,
        lessonId: currentLesson.lesson._id
      });
      
      if (response.success && response.results) {
        setTestResults(response.results);
        
        if (response.allPassed) {
          setJobStatus("🎉 Chúc mừng! Bạn đã hoàn thành bài tập.");
          // Cập nhật tiến độ khi pass bài tập
          await updateProgress(currentLesson.lesson._id, true);
        } else {
          setJobStatus("❌ Bài làm chưa đạt yêu cầu. Hãy thử lại!");
        }
      }
    } catch (error) {
      console.error("Error submitting code:", error);
      setJobStatus(`Lỗi: ${error.message || "Không thể gửi code"}`);
    } finally {
      setIsSubmitting(false);
    }
  };
   // Hàm để kiểm tra kết quả theo định kỳ
   const startPolling = (id) => {
    // Xóa interval cũ nếu có
    if (pollInterval) {
      clearInterval(pollInterval);
    }
    
    // Tạo interval mới để kiểm tra kết quả
    const intervalId = setInterval(async () => {
      try {
        const result = await LessonService.checkCodeExecutionResult(id);
        
        setJobStatus(result.message || result.status);
        
        // Nếu đã hoàn thành, hiển thị kết quả và dừng polling
        if (result.completed) {
          setTestResults(result.result.results);
          clearInterval(intervalId);
        
          setIsSubmitting(false);
        }
      } catch (error) {
        console.error("Error checking job status:", error);
        setJobStatus(`Lỗi kiểm tra: ${error.message}`);
        clearInterval(intervalId);
       
        setIsSubmitting(false);
      }
    }, 2000); // Kiểm tra mỗi 2 giây
    
    
  };

  // Cập nhật tiến độ khi hoàn thành bài học
  const updateProgress = async (lessonId, completed = true) => {
    try {
      const response = await ProgressService.saveProgress(
        courseDetail._id,
        lessonId,
        completed
      );
      
      // Cập nhật Redux state ngay lập tức với dữ liệu mới nhất
      dispatch(updateCourseProgress({
        progress: response.progress || 0,
        totalLessons: response.totalLessons || 0,
        completedLessons: response.completedLessons || 0
      }));

      // Cập nhật thông tin khóa học nếu có thay đổi
      if (response.course) {
        dispatch(setCourseDetail({
          ...courseDetail,
          totalLessons: response.totalLessons
        }));
      }
      
      // Cập nhật lessonProgress trong Redux
      dispatch(updateLessonProgress({
        courseId: slug,
        lessonId,
        completed
      }));
      
      // Lưu bài học hiện tại
      if (currentLesson) {
        dispatch(setLastLesson({
          courseId: slug,
          lessonId: currentLesson.lesson._id,
          chapterId: currentLesson.chapterId
        }));
      }

      // Phát ra sự kiện để HeaderLearningComponent cập nhật
      window.dispatchEvent(new CustomEvent('progressUpdated'));
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };
  // animate-pulse animation nhấp nháy chấm xanh
  
  // Render lesson status với loading state
  const renderLessonStatus = (lesson) => {
    if (isLoadingProgress) {
      return <div className="w-4 h-4 rounded-full bg-gray-300 animate-pulse" />;
    }
    
    const isCompleted = lessonProgress[slug]?.[lesson._id]?.completed;
    return (
      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
        isCompleted ? "bg-green-500" : "bg-gray-300"
      }`}>
        {isCompleted && <Check size={12} className="text-white" />}
      </div>
    );
  };

  return (
    <>
      <Helmet>
  <title>{courseDetail?.title || "HocPython | Khóa học"} </title>
</Helmet>
      <div className={`flex ${isSidebarOpen ? "w-9/12" : "w-full"} bg-white flex-col`}>
        <div className="bg-white p-4 pb-28">
          {currentLesson && (
            <>
            <h2 className="text-2xl font-bold mb-4">{currentLesson.lesson.title}</h2>
             
            </>
          )}
          {renderLessonContent()}
        </div>
      </div>

      {/* Sidebar */}
      <div className={`flex ${isSidebarOpen ? "w-3/12" : "hidden"}`}>
        {isSidebarOpen && (
          <div className="py-4 w-full h-full bg-white shadow-md">
            <h2 className="text-xl font-bold text-center mb-4">Nội dung khóa học</h2>
            <ul className="list flex flex-col gap-2 px-4">
              {content ? (
                content?.map((chapter) => (
                  <li key={chapter._id} className="w-full">
                    <div
                      onClick={() => toggleChapter(chapter._id)}
                      className="flex justify-between items-center bg-gray-100 px-3 py-2 cursor-pointer rounded-lg hover:bg-gray-200"
                    >
                      <span className="font-bold">{chapter.title}</span>
                      {openChapters[chapter._id] ? <ChevronDown /> : <ChevronRight />}
                    </div>

                    {openChapters[chapter._id] && (
                      <ul className="ml-4 mt-2">
                        {chapter.lessons.map((lesson) => (
                          <li
                            key={lesson._id}
                            onClick={() => handleSelectLesson(lesson, chapter._id)}
                            className={`flex justify-between items-center ${
                              currentLesson && currentLesson.lesson._id === lesson._id
                                ? "bg-blue-100 text-blue-600"
                                : "hover:bg-gray-100"
                            } p-2 cursor-pointer rounded-md`}
                          >
                            <div className="flex items-center gap-2">
                              {renderLessonStatus(lesson)}
                            <span>{lesson.title}</span>
                            </div>
                            <span className="text-sm text-gray-500">{lesson.duration} phút</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))
              ) : (
                <p className="text-center text-gray-500">Không tìm thấy nội dung khóa học.</p>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-100">
        <div className="flex py-2 gap-4 item-center justify-center">
          <button 
            onClick={goToPreviousLesson}
            className="flex gap-2 items-center px-4 py-2 bg-white text-blue-500 rounded-full border border-black"
          >
            <ChevronLeft size={16} />
            <span className="text-sm">Bài trước</span>
          </button>
          <button 
            onClick={goToNextLesson}
            className="flex gap-2 items-center px-4 py-2 rounded-full border bg-blue-500 text-white border-black"
          >
            <span className="text-sm">Bài tiếp theo</span>
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="absolute flex gap-2 right-4 bottom-3 items-center">
          {isSidebarOpen ? <div className=" ">{courseDetail?.title}</div> : <div className="">{courseDetail?.title}</div>}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="p-1 rounded-full hover:cursor-pointer border-black border bg-white"
          >
            {isSidebarOpen ? <MoveRight strokeWidth={3} size={16} /> : <Menu strokeWidth={3} size={16} />}
          </button>
        </div>
      </div>
    </>
  );
};

export default LearningPage;