import { useEffect, useState } from "react"
import HomeLayout from "../../Layout/HomeLayout"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { deleteCourseLecutre, getAllCoursesLectures } from "../../Redux/Slices/LectureSlice"

 function DisplayLecture(){
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {state}=useLocation()
    const {lectures}=useSelector((state)=>state.lecture)
    const {role}=useSelector((state)=>state.auth)

    const [currentVideo,setCurrentVideo]=useState()
    useEffect(()=>{
        console.log(state);
        if(!state) navigate('/courses')
        dispatch(getAllCoursesLectures(state._id))
    },[])

    async function onLectureDelete(courseId,lectureId){
        await dispatch(deleteCourseLecutre({courseId:courseId,lectureId:lectureId}))
        await dispatch(getAllCoursesLectures(courseId))
    }
    return(
        <HomeLayout>
            <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-[5%]">
                <div className="text-center text-2xl font-semibold text-yellow-500">
                    Course Name : {state?.title}

                </div>
                {(lectures && lectures.length>0 ) ?
                (<div className="flex justify-center gap-10 w-full">
                    {/* left section for playing videos and display course deatils to admin */}
                    <div className="space-y-5 w-[29rem] p-2 rounded-lg shadow-[0_0_10px_black]">
                        <video 
                            src={state && lectures[currentVideo]?.lecture?.secure_url}
                            className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                            controls
                            disablePictureInPicture
                            muted
                            controlsList="nodownload"
                            >

                        </video>
                        <div>
                            <h1>
                                <span className="text-yellow-500">Title:{" "}
                                </span>
                                {lectures && lectures[currentVideo]?.title}
                            </h1>
                            <p>
                                <span className="text-yellow-500 line-clamp-4 "> 
                                    Description:{" "}
                                </span>
                                {lectures && lectures[currentVideo]?.description}
                            </p>
                        </div>

                    </div>
                    {/* Right section for displaying list of all lecture */}
                    <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
                        <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                            <p>Lectures List</p>
                            {role==="ADMIN" && (
                                <button onClick={()=>navigate("/course/addlecture",{state:{...state}})} className="btn-accent px-2 py-1 rounded-md font-semibold text-sm bg-purple-700">
                                    Add new Lecture
                                </button>
                            )}
                        </li>
                        {lectures && 
                            lectures.map((lecture,idx)=>{
                                return(
                                    <li key={lecture._id} className="space-y-2">
                                        <p className="cursor-pointer" onClick={()=>setCurrentVideo(idx)}>
                                            <span>
                                                {" "} lecture {idx+1} : {" "}
                                            </span>
                                            {lecture?.title}
                                        </p>
                                        {role==="ADMIN" && (
                                            <button onClick={()=>onLectureDelete(state?._id,lecture?._id)} className="btn-accent px-2 py-1 rounded-md font-semibold text-sm bg-yellow-500">
                                                Delete Lecture
                                            </button>
                                        )}

                                    </li>

                                )
                            })
                        }
                    </ul>
                </div>):(
                    role==="ADMIN" && (
                    <button onClick={()=>navigate("/course/addlecture",{state:{...state}})} className="btn-accent px-2 py-1 rounded-md font-semibold text-sm bg-purple-700">
                        Add new Lecture
                    </button>
                    )
                )}
            </div>
        </HomeLayout>
    )
 }
 export default DisplayLecture