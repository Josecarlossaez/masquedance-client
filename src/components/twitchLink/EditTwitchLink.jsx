import React, { useEffect } from 'react'
// CSS
import "../../css/product/create-product.css"
// React
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Services FIREBASE
import { setDoc, doc, getDocs } from 'firebase/firestore'
import { storage } from '../../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { collTwitchLinks } from '../../firebase';

function EditTwitchLink(props) {
    const navigate = useNavigate();
    const {twitchLinkId} = useParams()
    // input values
    const [linkInput, setLinkInput] = useState("")
    const [pictureURL, setPictureUrl] = useState("");

    // errorMessages from BE
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const docs = []
            const querySnapshot = await getDocs(collTwitchLinks);
            console.log("querySnapshot", querySnapshot)
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id })
            })

            setLinkInput(docs[0].link);
            setPictureUrl(docs[0].picture)
        } catch (error) {
            navigate("/error");
        }
    };

    // Takes product info
    const handleTwitchLinkChange = (e) => setLinkInput(e.target.value);

    const [isLoadingPicture, setIsLoadingPicture] = useState(false);

    const handlePictureChange = async (e) => {
        setIsLoadingPicture(true)
        const image = e.target.files[0]
        // * upload image to firebaseStorage
        try {

            // 1 - Location where the picture is gonna be saved
            const storageRef = ref(storage, `images/${image.name}`) // 1- storage, 2-image-name-URL || 1 {the ref}, 2 {file it-self}
            // 2 - uploading the picture to firebase storage
            const snapShot = await uploadBytes(storageRef, image)
            // 3 - picture Url
            const downloadUrl = await getDownloadURL(snapShot.ref)
            setPictureUrl(downloadUrl)
            setIsLoadingPicture(false)

            // 4 - new doc
        } catch (error) {
            navigate("/error");
        }

    };

    // Send the input values to BE
    const handleEditTwitchLink = async (e) => {
        e.preventDefault();

        try {

            const newTwitchLinkRef = doc(collTwitchLinks,twitchLinkId)
            await setDoc(newTwitchLinkRef, {
                link: linkInput,
                picture: pictureURL,

            })
            navigate("/");
        } catch (error) {
            console.log(error)
            if (
                (error.response && error.response.status === 406) ||
                (error.response && error.response.status === 400)
            ) {
                setErrorMessage(error.response.data.message);
            } else {
                navigate("/error");
            }
        }
    };

    return (
        <section className="general-container">
            <div className="form-container">
                <form>
                    <h3>Editar TwitchLink</h3>

                    <div className="input-container">
                        <input value={linkInput} onChange={handleTwitchLinkChange} />
                        <label className={linkInput && "filled"} htmlFor="link">
                            Link
                        </label>
                    </div>
                    <div className="uploader-pic">
                        <input onChange={handlePictureChange} type="file" name="picture" />
                        <label htmlFor="picture">Product Picture</label>
                    </div>
                    {isLoadingPicture === true && <p>...loading picture</p>}
                    {/* Show the upload picture in this form */}
                    {pictureURL !== "" ? (
                        <img
                            src={pictureURL}
                            alt="yourPic"
                            width={200}
                            className="uploader-img"
                        />
                    ) : (
                        <p> [ No Picture Selected ]</p>
                    )}

                    <button
                        type="submit"
                        onClick={handleEditTwitchLink}
                        className="general-btn"
                    >
                        Editar TwitchLink
                    </button>
                    {errorMessage !== "" && (
                        <p className="error-message"> * {errorMessage}</p>
                    )}
                </form>
            </div>
        </section>
    )
}

export default EditTwitchLink