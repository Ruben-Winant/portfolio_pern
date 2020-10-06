import React, {
  ChangeEvent,
  FormEvent,
  ReactNode,
  useEffect,
  useState,
} from "react";
import "./EditPortfolio.css";
import Project from "../../../Types/Project";

const EditPortfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProjectName, setNewProjectName] = useState<string>("");
  const [newProjectImage, setNewProjectImage] = useState<string>("");
  const [newProjectLink, setNewProjectLink] = useState<string>("");
  const [newProjectDesc, setNewProjectDesc] = useState<string>("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [resMsg, setResMsg] = useState<string>("");

  //fetch data
  useEffect(() => {
    try {
      fetch("/api/projects")
        .then((response) => response.json())
        .then((data) => {
          setProjects(data);
          setDataLoaded(true);
        });
    } catch (err) {
      console.error(err.message);
      setDataLoaded(false);
    }
  }, []);

  //new project handlers
  const handleNewProjectTitleChanged = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setNewProjectName(event.currentTarget.value);
  };
  const handleNewProjectImageChanged = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setNewProjectImage(event.currentTarget.value);
  };
  const handleNewProjectLinkChanged = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setNewProjectLink(event.currentTarget.value);
  };
  const handleNewProjectDescriptionChanged = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewProjectDesc(event.currentTarget.value);
  };
  const handleNewProjectSubmit = (event: FormEvent) => {
    try {
      let accessToken = localStorage.getItem("accesToken");
      let myHeaders: Headers = new Headers();
      myHeaders.append("Content-Type", "application/json");

      if (accessToken) {
        myHeaders.append("authorization", "Bearer " + accessToken.toString());
      }

      //update personal stuff
      fetch("/api/projects/add", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          name: newProjectName,
          img_url: newProjectImage,
          url: newProjectLink,
          description: newProjectDesc,
        }),
      })
        .then((res) => res.json())
        .then((val) => (val.message ? setResMsg(val.message) : null));
    } catch (error) {
      console.log(error.message);
    }
  };

  //edit project handlers
  const handleEditProjectNameChanged = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    projects.map((project) =>
      project.pid === Number.parseInt(event.currentTarget.name)
        ? (project.name = event.currentTarget.value)
        : null
    );
  };
  const handleEditProjectImageChanged = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    projects.map((project) =>
      project.pid === Number.parseInt(event.currentTarget.name)
        ? (project.img_url = event.currentTarget.value)
        : null
    );
  };
  const handleEditProjectLinkChanged = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    projects.map((project) =>
      project.pid === Number.parseInt(event.currentTarget.name)
        ? (project.url = event.currentTarget.value)
        : null
    );
  };
  const handleEditProjectDescriptionChanged = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    projects.map((project) =>
      project.pid === Number.parseInt(event.currentTarget.name)
        ? (project.description = event.currentTarget.value)
        : null
    );
  };
  const handleProjectDeleteClicked = (id: number) => {
    try {
      let accessToken = localStorage.getItem("accesToken");
      let myHeaders: Headers = new Headers();
      myHeaders.append("Content-Type", "application/json");

      if (accessToken) {
        myHeaders.append("authorization", "Bearer " + accessToken.toString());
      }

      //update personal stuff
      fetch("/api/projects/delete", {
        method: "DELETE",
        headers: myHeaders,
        body: JSON.stringify({
          pid: id,
        }),
      })
        .then((res) => res.json())
        .then((val) =>
          val.message ? (setResMsg(val.message), alert(resMsg)) : null
        );
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleProjectsUpdateSubmit = () => {
    try {
      let accessToken = localStorage.getItem("accesToken");
      let myHeaders: Headers = new Headers();
      myHeaders.append("Content-Type", "application/json");

      if (accessToken) {
        myHeaders.append("authorization", "Bearer " + accessToken.toString());
      }

      //update projects
      projects.forEach((project) =>
        fetch("/api/projects/update", {
          method: "PUT",
          headers: myHeaders,
          body: JSON.stringify({
            pid: project.pid,
            name: project.name,
            img_url: project.img_url,
            url: project.url,
            description: project.description,
          }),
        })
          .then((res) => res.json())
          .then((val) =>
            val.message ? (setResMsg(val.message), alert(resMsg)) : null
          )
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  //generate project cards
  const genProjectsEditList = () => {
    let projectsList: ReactNode[] = [];
    projects.forEach((project) =>
      projectsList.push(
        <div key={project.pid} className="projectList-outer">
          <div className="projectList-inner">
            <div className="projectList">
              <label>title</label>
              <input
                type="text"
                name={project.pid.toString()}
                defaultValue={project.name}
                onChange={(event) => handleEditProjectNameChanged(event)}
              />
            </div>
            <div className="projectList">
              <label>image url</label>
              <input
                type="text"
                name={project.pid.toString()}
                defaultValue={project.img_url}
                onChange={(event) => handleEditProjectImageChanged(event)}
              />
            </div>
            <div className="projectList">
              <label>project link</label>
              <input
                type="text"
                name={project.pid.toString()}
                defaultValue={project.url}
                onChange={(event) => handleEditProjectLinkChanged(event)}
              />
            </div>
            <div className="projectList">
              <label>description</label>
              <textarea
                name={project.pid.toString()}
                defaultValue={project.description}
                onChange={(event) => handleEditProjectDescriptionChanged(event)}
              ></textarea>
              <div
                className="remove"
                onClick={() => handleProjectDeleteClicked(project.pid)}
              >
                <span>
                  Remove <i className="fa fa-trash" />
                </span>
              </div>
            </div>
          </div>
        </div>
      )
    );
    return projectsList;
  };

  return (
    <article>
      <form>
        <div
          className="projectList"
          onClick={() => handleProjectsUpdateSubmit()}
        >
          <h2>Projects</h2>
          <span>
            Update <i style={{ fontSize: 15 }} className="fa fa-refresh" />
          </span>
        </div>
        <div className="projectList-outer">
          <div className="projectList-inner">
            <div className="projectList">
              <label>title</label>
              <input
                onChange={(event) => handleNewProjectTitleChanged(event)}
                value={newProjectName}
                type="text"
              />
            </div>
            <div className="projectList">
              <label>image url</label>
              <input
                onChange={(event) => handleNewProjectImageChanged(event)}
                value={newProjectImage}
                type="text"
              />
            </div>
            <div className="projectList">
              <label>project link</label>
              <input
                onChange={(event) => handleNewProjectLinkChanged(event)}
                value={newProjectLink}
                type="text"
              />
            </div>
            <div className="projectList">
              <label>description</label>
              <textarea
                onChange={(event) => handleNewProjectDescriptionChanged(event)}
                value={newProjectDesc}
              ></textarea>
              <div
                className="remove"
                onClick={(event) => handleNewProjectSubmit(event)}
              >
                <span>
                  Add <i className="fa fa-plus" />
                </span>
              </div>
            </div>
          </div>
        </div>
        {genProjectsEditList()}
      </form>
    </article>
  );
};

export default EditPortfolio;
