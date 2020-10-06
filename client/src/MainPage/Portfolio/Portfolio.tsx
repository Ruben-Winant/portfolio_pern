import React, { useEffect, useState } from "react";
import "./Portfolio.css";
import Project from "../../Types/Project";

const Portfolio = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  //fetch data
  useEffect(() => {
    try {
      fetch("http://localhost:5000/api/projects")
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

  const genPortfolio = () => {
    let portfolio: any[] = [];
    projects.forEach((project) => {
      portfolio.push(
        <div
          key={"pr_" + project.pid + "_" + project.name}
          className="portfolioCard"
        >
          <a href={project.url} target="_blank">
            <img src={project.img_url} alt={project.name} />
            <span>{project.name}</span>
          </a>
        </div>
      );
    });

    return <div className="portfolioProjects">{portfolio}</div>;
  };

  return dataLoaded ? (
    <section id="portfolio">
      <article className="portfolioContainer">
        <div className="portfolioTop">
          <h2>Portfolio</h2>
          <span>Below you'll find some of the projects i worked on.</span>
        </div>
        <br />
        {genPortfolio()}
      </article>
    </section>
  ) : (
    <div></div>
  );
};

export default Portfolio;
