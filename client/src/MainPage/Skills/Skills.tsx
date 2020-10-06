import React, { useEffect, useState } from "react";
import "./Skills.css";
import skill from "../../Types/skill";
import skill_categories from "../../Types/skill_categories";

const Skills = () => {
  const [categories, setCategories] = useState<skill_categories[]>([]);
  const [skills, setSkills] = useState<skill[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  //fetch categories
  useEffect(() => {
    try {
      fetch("/api/skills/categories")
        .then((response) => response.json())
        .then((data) => {
          let cats: skill_categories[] = JSON.parse(JSON.stringify(data));
          setCategories(cats);
          setDataLoaded(true);
        });
    } catch (err) {
      console.error(err.message);
      setDataLoaded(false);
    }
  }, []);

  //fetch skills
  useEffect(() => {
    try {
      fetch("/api/skills")
        .then((response) => response.json())
        .then((data) => {
          let skills: skill[] = JSON.parse(JSON.stringify(data));
          setSkills(skills);
          setDataLoaded(true);
        });
    } catch (err) {
      console.error(err.message);
      setDataLoaded(false);
    }
  }, []);

  function genLists() {
    let lists: any[] = [];
    if (dataLoaded != null && categories != null && skills != null) {
      categories.forEach((cat) => {
        let catListItems: any[] = [];

        skills.forEach((skill) => {
          if (skill.cat_id === cat.cat_id) {
            let colorcode = "";
            switch (skill.skill_level_id) {
              case 3:
                colorcode = "good";
                break;
              case 2:
                colorcode = "mediocre";
                break;
              case 1:
                colorcode = "beginner";
                break;
              default:
                break;
            }

            let skillitem = (
              <li key={cat.cat_id + cat.name}>
                <p className="skillItem">
                  <i className={colorcode + " good fa fa-circle"} />{" "}
                  <i className={skill.icon_name} />
                  {" " + skill.name}
                </p>
              </li>
            );

            catListItems.push(skillitem);
          }
        });

        lists.push(
          <details
            key={cat.cat_id * 59 + "_" + cat.cat_id + cat.name}
            className="skillsListContainer"
          >
            <summary className="skillListTitle">{cat.name}</summary>
            <ul className="skillsList">{catListItems}</ul>
          </details>
        );
      });
    }
    return lists;
  }

  return dataLoaded ? (
    <section id="skills">
      <article className="skillsContainer">
        <h2>Skills</h2>
        <span>
          A list of the elements i enjoy working with and the ones i'm still
          learning.
        </span>
        <br />
        <br />
        <div className="skillsContent">{genLists()}</div>
      </article>
    </section>
  ) : (
    <div></div>
  );
};

export default Skills;
