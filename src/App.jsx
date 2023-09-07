import React,{ useState, useEffect, useRef} from 'react';
import './index.css';
import { Player } from '@lottiefiles/react-lottie-player';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc, getFirestore, onSnapshot, collection, addDoc, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { auth,app } from './firebase';
const db = getFirestore(app);

const App = () => {
  const dummy = useRef();
  const [user, setUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState()

  useEffect(() => {
    const q = query(collection(db,"messages"), orderBy("timestamp"))
    const unsubscribe = onSnapshot(q, snapshot => {
      setMessages(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
    return unsubscribe
  },[])

  useEffect(() => {
    onAuthStateChanged(auth,user => {
      if(user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
  },[])

  const sendMessage = async () => {
    await addDoc(collection(db, "messages"),{
      uid: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName,
      text: newMessage,
      timestamp: serverTimestamp()
    })
    setNewMessage("")
    dummy.current.scrollIntoView({behavior: 'smooth'})
  }


  const provider = new GoogleAuthProvider()


  const handleGoogleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, provider )

    } catch (error) {
      console.log(error)
    }
  }

  

  return (
    <div className='app'>
      {user ? (
        <div className='logged'>
          <div className='logged__content'>
            <div className='logged__content-nav'>
              <h2>"Siithalai, තෙතයි!" Am {user.displayName}</h2>
              <button onClick={() => auth.signOut()}>Logout</button>
            </div>
            <div className='logged__container-main'>
              {messages.map(message => (
                <div className='logged__container-main_thread' key={message.id}>
                  <img src={message.data.photoURL} />
                  <section className='logged__container-main_thread-text'>
                  {message.data.text}
                  </section>
                  </div>
              ))}
              <div ref={dummy}></div>
            </div>
            <div className='logged__content-input'>
            <input value={newMessage} onChange={e => setNewMessage(e.target.value)} />
            <button onClick={sendMessage}>
            <img className='logged__content-input_img' width="30" height="30" src="https://img.icons8.com/fluency/48/sent.png" alt="sent"/>
            </button>
            </div>
          </div>
        </div>
      ):(
        <div className='welcome'>
          <div>
            <Player
              className='welcome__anyma'
              autoplay
              loop
              src="https://lottie.host/1acd6ed5-a34e-4930-b741-3baf59e91cb7/wu8U7tMGgP.json"
              />
          </div>
          <div className='welcome__content'>
            <div className='welcome__content-header'>
              <h1>✨The Citadel🍻</h1>
              <h3>
              "Naraka ewa share krnnepa plz"
              </h3>
            </div>
            <div className='welcome__content-cta'>
            <button onClick={handleGoogleLogin}>Login with Google</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
