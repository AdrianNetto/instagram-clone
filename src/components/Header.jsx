"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { CiCirclePlus } from "react-icons/ci";
import { signIn, useSession, signOut } from "next-auth/react";
import Modal from "react-modal";
import { app } from "@/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export default function Header() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const filePickerRef = useRef(null);

  function addImageToPost(e) {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImageFileUrl(imageUrl);
    }
  }

  useEffect(() => {
    if (selectedFile) {
      uploadImageToStorage();
    }
  }, [selectedFile]);

  async function uploadImageToStorage() {
    setImageFileUploading(true);

    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + selectedFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("upload is " + progress + "% done");
      },

      (error) => {
        console.error("error", error);
        setImageFileUploading(false);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setImageFileUploading(false);
        });
      }
    );
  }

  return (
    <div className="shadow-sm border-b sticky top-0 bg-white z-30">
      <div className="flex items-center justify-between max-w-6xl mx-4 xl:mx-auto">
        <div className="cursor-pointer h-24 w-24 relative hidden lg:inline-grid">
          <Image
            src="http://www.jennexplores.com/wp-content/uploads/2015/09/Instagram_logo_black.png"
            layout="fill"
            className="object-contain"
            alt="Instagram Logo"
          />
        </div>
        <div className="cursor-pointer h-24 w-10 relative lg:hidden">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png"
            layout="fill"
            className="object-contain"
            alt="Instagram Logo"
          />
        </div>

        <div className="relative mt-1">
          <div className="absolute top-2 left-2">
            <HiMagnifyingGlass className="h-5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-50 pl-10 border-gray-500 text-sm focus:ring-black focus:border-black rounded-md"
          />
        </div>

        {session ? (
          <div className="flex gap-2 items-center">
            <CiCirclePlus
              className="text-2xl cursor-pointer transform hover:scale-125 transition duration-300 hover:text-red-600 h-7 w-7"
              onClick={() => setIsOpen(true)}
            />
            <img
              onClick={() => signOut()}
              src={session.user.image}
              alt="user-image"
              className="h-10 rounded-full cursor-pointer"
            />
          </div>
        ) : (
          <button onClick={() => signIn()}>Sign in</button>
        )}
      </div>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rouded-md shadow-md"
          onRequestClose={() => setIsOpen(false)}
          ariaHideApp={false}
        >
          <div className="flex flex-col justify-center items-center h-[100%]">
            {selectedFile ? (
              <img
                onClick={() => setSelectedFile()}
                src={imageFileUrl}
                alt="selected file"
                className={`w-full max-h-[220px] object-over cursor-pointer ${
                  imageFileUploading ? "animate-pulse" : ""
                }`}
              />
            ) : (
              <>
                <MdOutlinePhotoCamera
                  className="text-5xl text-gray-400 cursor-pointer"
                  onClick={() => filePickerRef.current.click()}
                />
                <input
                  type="file"
                  hidden
                  ref={filePickerRef}
                  accept="image/*"
                  onChange={addImageToPost}
                />
              </>
            )}
          </div>
          <input
            type="text"
            maxLength="150"
            placeholder="Please enter your caption here..."
            className="m-4 border-none text-center w-full focus:ring-0"
          />
          <button className="w-full bg-red-600 text-white p-2 shadow-md rounded-lg hover:brightness-105 disabeld:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100">
            Upload Post
          </button>
          <AiOutlineClose
            className="cursor-pointer absolute top-2 right-2 hover:text-red-600 transition duration-300"
            onClick={() => setIsOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
