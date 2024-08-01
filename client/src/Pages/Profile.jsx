
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from "../firebase";
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteFailure, deleteUserSuccess, deleteUserStart } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";




export default function Profile() {
  const {currentUser, loading, error} = useSelector((state)=> state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateUser] = useState(false)
 const dispatch = useDispatch()


  // FireBase storage 
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 && 
  // request.resource.contentType.matches('image/.*');

  useEffect(()=>{
    if(file){
      handleFileUpload(file)
    }
  }, [file])

  const handleFileUpload = (file)=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName );
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    uploadTask.on('state_change', (snapshot)=>{
      const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
      // console.log('upload is' + progress + '% done')
      setFilePerc(Math.round(progress));
    },
    (error)=>{
      setFileUploadError(true)
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((getDownloadURL)=>{
        setFormData({...formData, avatar: getDownloadURL})
      })
    })
  }

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      dispatch(updateUserStart());
      const res = await fetch(`/server/user/update/${currentUser._id}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(updateUserFailure(data.message));
        return;
      }
      // if (data){
      //   dispatch(updateUserSuccess(data.message))
      // }
      dispatch(updateUserSuccess(data));
      setUpdateUser(true);

    }catch(error){
      dispatch(updateUserFailure(error.message))
    }
  }
  const handleDeleteUser = async()=>{
    try{
      dispatch(deleteUserStart());
      const res = await fetch(`server/user/delete/${currentUser._id}`,{
        method: 'DELETE',
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(deleteFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    }catch(error){
      dispatch(deleteFailure(error.message));
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input onChange={(e)=> setFile(e.target.files[0]) } type="file" ref={fileRef} hidden accept="image/*"/>
        <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"  />

        <p className="text-sm self-center">{fileUploadError 
        ? (<span className="text-red-700 ">Error image upload (image must be less than 2mb)</span>) 
        : filePerc > 0 &&  filePerc < 100 ?
        (<span className="text-green-500">{`Uploading in progress ${filePerc} %`}</span>) 
        : 
        filePerc === 100 ? 
        (<span className="text-green-700">Image successfully uploaded!</span>) : ("")  }</p>

        <input 
        type="text" 
        id="username" 
        placeholder="username"  
        defaultValue={currentUser.username}
        className="border p-3 rounded-lg"
        onChange={handleChange}
        />

        <input 
        type="email" 
        id="email" 
        defaultValue={currentUser.email}
        placeholder="email"  
        className="border p-3 rounded-lg"
        onChange={handleChange}
        />

        <input 
        type="password" 
        id="password" 
        defaultValue={currentUser.password}
        placeholder="password"  
        className="border p-3 rounded-lg"
        onChange={handleChange}
        />

        <button disabled={loading} className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95">
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className=" flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign-Out</span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">{updateSuccess ? "User is updated successfully!" : ""}</p>
    </div>
  )
}
