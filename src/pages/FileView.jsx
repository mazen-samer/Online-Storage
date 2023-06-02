import { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, cloudStorage } from "../firebase";
import FileContainer from "../components/FileContainer";
import { v4 } from "uuid";
import "./FileView.css";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function FileView() {
  const [files, setFiles] = useState([]);
  const [fileUpload, setFileUpload] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  let { id } = useParams();

  const history = useHistory();

  //First thin that runs on page render
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        console.log(loggedIn);
      } else {
        setLoggedIn(false);
        console.log(loggedIn);
      }
    });
  });

  useEffect(() => {
    const docRef = doc(db, "users", id);
    getDoc(docRef).then((response) => {
      const userFiles = response.data();
      // console.log(userFiles.files);
      setFiles(userFiles.files);
    });
  }, [id]);

  function UploadFile() {
    if (fileUpload === null) return;
    // console.log(fileUpload.name);
    const fileRef = ref(cloudStorage, `${fileUpload.name}`);
    uploadBytes(fileRef, fileUpload)
      .then((response) => {
        alert("Uploaded!");
        // console.log(response);
        getDownloadURL(fileRef)
          .then((fileURL) => {
            // console.log(fileURL);
            setDoc(doc(db, "users", id), {
              files: [...files, fileURL],
            })
              .then((response) => {
                console.log(response);
                getDoc(doc(db, "users", id))
                  .then((response) => {
                    const userFiles = response.data();
                    console.log(userFiles.files);
                    setFiles(userFiles.files);
                  })
                  .catch((error) => {
                    console.log(error.message);
                  });
              })
              .catch((error) => {
                console.log(error.message);
              });
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  function userSignOut() {
    signOut(auth).then(() => {
      console.log("signed out!!!!");
      history.push("/");
    });
  }

  let fileNames = files.map((file) => <FileContainer key={v4()} name={file} />);

  return (
    <div className="file-view">
      <div className="header">
        <h1>Welcome to our Cloud Storage</h1>
        {loggedIn ? (
          <button id="sign-out" onClick={userSignOut}>
            Sign out
          </button>
        ) : (
          <Link id="sign-out" to="/">
            Sign in
          </Link>
        )}
      </div>
      {loggedIn ? (
        <div className="content">
          <div className="files-display">
            {files.length === 0 ? (
              <h2>No files to view</h2>
            ) : (
              <h2>Here are your files</h2>
            )}
            <div className="all-files">{fileNames}</div>
          </div>
          <div className="form">
            <h2>Add your files</h2>
            <p>Drag and drop your files here</p>
            <div className="form-input">
              <input
                type="file"
                onChange={(event) => {
                  setFileUpload(event.target.files[0]);
                }}
              />
              <button type="submit" onClick={UploadFile}>
                Upload file
              </button>
            </div>
          </div>
        </div>
      ) : (
        <h1 id="not-logged">Please log in</h1>
      )}
    </div>
  );
}
