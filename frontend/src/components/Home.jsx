import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./Usercontext";
import gsap from "gsap";
import axiosInstance from "../../config/axios";

function Home() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);
  const [reload, setreload] = useState(true);

  useEffect(() => {

    if (isModalOpen) {
      gsap.from(".box", {
        duration: 0.4,
        opacity: 0,
        ease: "back.out(1.7)",
        scale: 0.5,
      });
    }
  }, [isModalOpen]);



  useEffect(() => {

    axiosInstance.get("/projects/allprojects")
      .then(function (response) {
        console.log(response.data);
        setProjects(response.data.allproject);
      })
      .catch(function (error) {
        console.log(error);
      });


  }, [reload]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    gsap.to(".box", { opacity: 0, scale: 0.5, duration: 0.2, onComplete: () => setIsModalOpen(false) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Project Name:", projectName);
    handleCloseModal();
    axiosInstance.post("/projects/createproject", { name: projectName }).
      then(function (response) {
        setreload(!reload);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="flex px-4 py-4 h-[14vh] min-h-6  ">
      <button className="hover:bg-gray-800 min-h-15 rounded-xl bg-gray-600 p-2" onClick={handleOpenModal}>
        <p className="inline pl-3">Project</p>
        <i className="ri-links-line px-[1vw] py-[1vw] inline-block"></i>
      </button>
      {/*  */}




      <div className="h-100vh flex flex-col gap-2 mt-10">
        {projects.map((project) => {
          return (
            <div onClick={function () {
              navigate(`/project/${project._id}`, { state: { userproject: project } })
            }} className="ml-10 py-1 flex  flex-col  bg-gray-500 rounded-xl justify-center items-center hover:bg-gray-600" key={project._id}>
              <h2 className="inline pl-2 pb-2">{project.name}</h2>
              <i className="px-2 ri-user-line">
                <small className="inline pl-2">colloborators : {project.user?.length || 0}</small>
              </i>

            </div>)
        })}

      </div>

      {/*  */}
      {isModalOpen && (
        <div className="  fixed text-black inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="box bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4 text-black">Enter Project Name</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="border p-2 mb-4 w-full placeholder-gray-500"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Project Name"
                required
              />
              <div className="flex justify-end">
                <button type="button" className="mr-2 px-4 py-2 bg-gray-300 rounded" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
