import React, { useEffect, useContext, useRef } from 'react'
import { useState } from 'react'
import Markdown from 'markdown-to-jsx'
import { useNavigate, useLocation } from 'react-router-dom'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { UserContext } from './Usercontext'
import axiosInstance from '../../config/axios'
import { gsap } from 'gsap'
import socketInstance, { Send, recive } from '../../config/Socket'
import CodeEditor from './Editor';


function SyntaxHighlightedCode({ children, className }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      window.hljs?.highlightElement(ref.current);
    }
  }, [children]);

  return (
    <pre>
      <code ref={ref} className={className}>
        {children}
      </code>
    </pre>
  );
}

function Project() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const newproject = location.state || {};

  const [ispanel, setPanel] = useState(false);
  const [ismodal, setModal] = useState(false);
  const [all_users, setAllusers] = useState([]);
  const [useremail, setUseremail] = useState({});
  const [send, setSend] = useState("");
  const [filetree, Setfiletree] = useState({});
  const [currentobject, Setcurrentobject] = useState({});
  const [messages, setMessages] = useState([]);
  const chatBoxRef = useRef(null);
  const [errormessage, setError] = useState("");



  /////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
  const [finduser, setFinduser] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (finduser.length > 0) {
        searchUser(finduser);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [finduser]);


  const searchUser = async (query) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/users/search?query=${query}`);
      setSearchResults(res.data);
      console.log("Search results:", res.data);
    } catch (error) {
      console.error("Error searching users:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  function useradd() {
    axiosInstance.put('/projects/add-project', { userid: useremail._id, projectid: newproject.userproject._id }).then((res) => {
      // console.log(res.data);
      if(res.data.errmessage){
        setError(res.data.errmessage);
        console.log(res.data.errmessage);
        console.log("Error:",errormessage);
      }else{
        alert("user-added");
      }
    })
      .catch((err) => {
        
        console.log(err);
      })
  }

  useEffect(() => {
    if (ismodal) {
      gsap.from('.modal', {
        duration: 0.4,
        opacity: 0,
        scale: 0.5
      });
    }
  }, [ismodal]);

  const userarray = newproject.userproject.user;

  useEffect(() => {
    axiosInstance.get('/users/allusers').then((res) => {
      setAllusers(res.data);
    })
      .catch((err) => {
        console.log(err);
        
      })

    socketInstance(newproject.userproject._id);
    recive("project-message", (data) => {
      console.log("Data:", data); // Debugging log
      if (data.sender.email === "AI") {
        const parseddata = JSON.parse(data.send);
        console.log("Data:", parseddata); // Debugging log
        if (parseddata.fileTree !== undefined) {
          Setfiletree(parseddata.fileTree);
        }
      }
      setMessages(prevMessages => [...prevMessages, { msg: data.send, username: data.sender.email, acceptor: "client" }]);
      scrollToBottom();
    });

  }, [newproject.userproject._id])

  function writeaitext(message) {
    const object = JSON.parse(message);
    return (
      <div className='client_msg rounded-xl m-1 py-1 ml-auto px-3 bg-gray-700 overflow-x-auto'>
        <small>AI</small>
        <br />
        <Markdown options={{
          overrides: {
            code: {
              component: SyntaxHighlighter,
              props: { language: "javascript", style: dracula }
            }
          }
        }}>
          {object.text}
        </Markdown>
      </div>
    );
  }
  /////////////////////////////////////////////////////


function deleteuser(user){
  axiosInstance.put('/projects/delete-user',{userid:useremail._id,projectid:newproject.userproject._id}).then((res)=>{
    console.log(res.data);
  })
  .catch((err)=>{
    console.log(err);
  });
} 
 // ////////////////////////////////////////////////////
//////////////////////////////////
  function sent() {
    Send("project-message", { send, sender: user });
    setMessages(prevMessages => [
      ...prevMessages,
      { msg: send, username: user.email, acceptor: "server" }
    ]);
    setSend("");
  }

  function scrollToBottom() {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="relative project h-screen w-full flex">
     {errormessage && (
  <div className='fixed text-[#F45B5D] w-fit h-11 z-999 text-center font-bold p-2 left-[60%] rounded-xl'>
    {errormessage}
  </div>
)}
      {/* Modal Section */}
      {ismodal && <div className=' flex flex-col overflow-y-scroll modal z-1000 absolute h-[40%] w-[20%] bg-gray-700 left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] scrollbar-hide scrollbar-thumb-gray-500 rounded-xl'>
        {/*  */}
        <div className="flex flex-col">
          {/* Search Input */}
          <div className=" sticky flex gap-1 p-2  top-0 bg-gray-700 z-10">
            <input
              type="text"
              className="text-black bg-gray-300 min-w-30 rounded-xl text-center"
              placeholder="Search user..."
              onChange={(e) => setFinduser(e.target.value)}
              value={finduser}
            />
            <button className="p-1 bg-gray-400 rounded-xl w-fit active:bg-gray-500 ml-2" onClick={useradd }>
              Add
            </button>
            <i className="absolute ri-close-line text-red-500 text-2xl right-0" onClick={() =>{ setModal(!ismodal);setError("") }}></i>
          </div>

          {/* Search Results */}
          {loading && <p className="text-white p-2">Searching...</p>}
          <div className="mt-2">
            {searchResults.map((user) => (
              <div key={user._id} className={`p-2 bg-gray-400 m-3 rounded-xl cursor-pointer hover:bg-gray-500 ${useremail._id === user._id ? 'bg-gray-600' : ''}`}
                onClick={function () {
                  if (useremail._id === user._id) {
                    setUseremail({});
                  } else {
                    setUseremail(user);
                  }
                }}>
                <i className="ri-user-line text-black rounded-full bg-white h-7 p-2"></i>
                <small className="px-2">{user.email}</small>
              </div>
            ))}
          </div>
        </div>

        {/*  */}
        <div className='mt-10'>
          {all_users.map((user) => {
            return (
              <div
                className={`group_user p-2 bg-gray-400 m-3 rounded-xl cursor-pointer hover:bg-gray-500 ${useremail._id === user._id ? 'bg-gray-600' : ''}`}
                onClick={function () {
                  if (useremail._id === user._id) {
                    setUseremail({});
                  } else {
                    setUseremail(user);
                  }
                }}
              >
                <i className="ri-user-line text-black rounded-full bg-white h-7 p-2"></i>
                <small className='px-2'>{user.email}</small>
              </div>
            )
          })}
        </div>


      </div>}

      {/* Panel Section */}
      <div className={`relative messagebox flex flex-col justify-between items-end h-full w-full md:w-[40%] bg-gray-400 text-white ${ispanel && 'duration-3000'}`}>
        {ispanel && <div className="panel flex flex-col gap-2 z-1000 absolute h-full w-full bg-white overflow-auto transition-all duration-300">
          <div className='p-4'>
            <button className='absolute top-0 right-0 cursor-pointer' onClick={function () {
              setPanel(!ispanel);
            }}>
              <i className="ri-close-line text-red-500 text-2xl"></i>
            </button>
          </div>

          <div className='w-[100%] overflow-y-auto mt-2'>
            {userarray.map((user) => {
              return (<div className='relative group_user p-4 bg-gray-400 m-3 rounded-xl'>
                <i className="ri-user-line text-black rounded-full bg-white h-7 p-2"></i>
                <small className='px-2'>{user.email}</small>
                <i className="absolute ri-delete-bin-line mr-auto right-0 px-3" ></i>
              </div>)
            })}
          </div>
        </div>}

        <div className='head flex justify-between p-4 bg-gray-100 w-full h-12'>
          <i className="ri-group-fill text-black cursor-pointer" onClick={function () {
            setPanel(!ispanel);
          }}></i>
          <div className='text-black flex justify-center items-center gap-2'><small>Add colab</small><i className="ri-user-add-fill text-black" onClick={function () {
            setModal(!ismodal);
          }}></i></div>
        </div>

        {/* message box */}
        <div ref={chatBoxRef} className='chatbox z-20 absolute mt-13 h-[86%] flex flex-col gap-3 py-2 justify-end overflow-y-auto w-full'>
          <div className="scroll overflow-y-auto">
            {messages.map((message) => {
              if (message.acceptor === "client" && message.username !== "AI") {
                return (
                  <div className='server_msg rounded-xl m-1 px-3 py-1 min-w-[40%] w-fit max-w-[60%] bg-gray-700'>
                    <small>{message.username}</small>
                    <p className='break-words'>{message.msg}</p>
                  </div>
                );
              } else {
                if (message.username === "AI") {
                  return writeaitext(message.msg);
                } else {
                  return (
                    <div className='client_msg rounded-xl m-1 min-w-[40%] w-fit max-w-[60%] block py-1 ml-auto px-3 bg-gray-700'>
                      <small>{message.username}</small>
                      <p className='break-words'>{message.msg}</p>
                    </div>
                  );
                }
              }
            })}
          </div>
        </div>

        {/* SEND BUTTON BOX */}
        <div className='z-30 flex head bg-gray-100 w-full h-10'>
          <input
            type="text"
            className='h-[100%] w-full text-black'
            value={send}
            onChange={(e) => { setSend(e.target.value); }}
          />
          <button className='px-3 bg-gray-600 py-2' onClick={sent}>
            <i className="ri-send-plane-fill text-white"></i>
          </button>
        </div>
      </div>

      {/* file names */}
      <div className='content h-full w-full md:w-[60%] bg-gray-400 flex'>
        <div className='h-full w-[20%] bg-gray-500 flex flex-col'>
          {filetree &&
            Object.keys(filetree).map((file, index) => {
              return (
                <div
                  onClick={() => Setcurrentobject(file)}
                  key={index}
                  className={`w-full cursor-pointer flex items-center justify-center h-[6%] border-b-2 border-b-white ${currentobject === file ? "bg-blue-600 text-white" : "bg-gray-900 text-gray-300 hover:bg-gray-700"}`}
                >
                  <h1>{file}</h1>
                </div>
              );
            })}
        </div>
        {<div className='h-full w-[80%] bg-gray-700'>
          <div className="relative h-full w-full min-h-screen">
            <pre className="hljs h-full">
              <code
                className="hljs h-full outline-none"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => {
                  const updatedContent = e.target.innerText;

                  if (!filetree || !currentobject) return; // Ensure filetree and currentobject exist

                  Setfiletree((prevFileTree) => ({
                    ...prevFileTree,
                    [currentobject]: {
                      ...prevFileTree[currentobject],
                      file: { contents: updatedContent },
                    },
                  }));
                }}
                dangerouslySetInnerHTML={{
                  __html: filetree && currentobject && filetree[currentobject]?.file?.contents
                    ? hljs.highlight("javascript", filetree[currentobject].file.contents).value
                    : "", // Prevent errors when filetree or currentobject is undefined
                }}
                style={{
                  whiteSpace: "pre-wrap",
                  paddingBottom: "25rem",
                  counterSet: "line-numbering",
                }}
              ></code>
            </pre>
          </div>


        </div>}

      </div>
    </div>
  )
}

export default Project