import React, {
  ChangeEvent,
  FormEvent,
  ReactNode,
  useEffect,
  useState,
} from "react";
import skill_categories from "../../../Types/skill_categories";
import skill from "../../../Types/skill";
import "./EditSkills.css";

const EditSkills = () => {
  const [categories, setCategories] = useState<skill_categories[]>([]);
  const [skills, setSkills] = useState<skill[]>([]);
  const [newCategorie, setNewCategorie] = useState<string>("");
  const [newSkillName, setNewSkillName] = useState<string>("");
  const [newSkillIconName, setNewSkillIconName] = useState<string>("");
  const [newSkillLevel, setNewSkillLevel] = useState<number>(1);
  const [newSkillCat, setNewSkillCat] = useState<number>(0);
  const [resMsg, setResMsg] = useState<string>("");
  const [dataLoaded, setDataLoaded] = useState(false);

  //fetch categories
  useEffect(() => {
    try {
      //fetch categories
      fetch("http://localhost:5000/api/skills/categories")
        .then((response) => response.json())
        .then((data) => {
          let cats: skill_categories[] = JSON.parse(JSON.stringify(data));
          setCategories(cats);
          setNewSkillCat(cats[0].cat_id);
          setDataLoaded(true);
        });

      //fetch skills
      fetch("http://localhost:5000/api/skills")
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

  //cat crud
  const handleCatNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
    categories.map((cats) =>
      cats.cat_id.toString() === event.currentTarget.name
        ? (cats.name = event.currentTarget.value)
        : null
    );
    console.log(categories);
  };
  const handleAddCategorieChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setNewCategorie(event.currentTarget.value);
  };
  const handleAddCategorieClick = () => {
    try {
      let accessToken = localStorage.getItem("accesToken");
      let myHeaders: Headers = new Headers();
      myHeaders.append("Content-Type", "application/json");

      if (accessToken) {
        myHeaders.append("authorization", "Bearer " + accessToken.toString());
      }

      //update personal stuff
      fetch("http://localhost:5000/api/skills/categories/add", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          newCategorie: newCategorie,
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
  const handleDeleteCatClick = (cat_id: number) => {
    try {
      let accessToken = localStorage.getItem("accesToken");
      let myHeaders: Headers = new Headers();
      myHeaders.append("Content-Type", "application/json");

      if (accessToken) {
        myHeaders.append("authorization", "Bearer " + accessToken.toString());
      }

      //update personal stuff
      fetch("http://localhost:5000/api/skills/categories/delete", {
        method: "DELETE",
        headers: myHeaders,
        body: JSON.stringify({
          cat_id: cat_id,
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

  //new skill crud
  const handleAddSkillNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setNewSkillName(event.currentTarget.value);
  };
  const handleAddSkillIconNameChanged = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setNewSkillIconName(event.currentTarget.value);
  };
  const handleAddSkillLevelChanged = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setNewSkillLevel(Number.parseInt(event.currentTarget.value));
  };
  const handleAddSkillCatChanged = (event: ChangeEvent<HTMLSelectElement>) => {
    setNewSkillCat(Number.parseInt(event.currentTarget.value));
  };
  const handleAddSkillClick = (event: FormEvent) => {
    try {
      let accessToken = localStorage.getItem("accesToken");
      let myHeaders: Headers = new Headers();
      myHeaders.append("Content-Type", "application/json");

      if (accessToken) {
        myHeaders.append("authorization", "Bearer " + accessToken.toString());
      }

      //update personal stuff
      fetch("http://localhost:5000/api/skills/add", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          cat_id: newSkillCat,
          name: newSkillName,
          icon_name: newSkillIconName,
          skill_level_id: newSkillLevel,
        }),
      })
        .then((res) => res.json())
        .then((val) =>
          val.message ? (setResMsg(val.message), alert(resMsg)) : null
        );
    } catch (error) {
      console.log(error.message);
    }

    event.preventDefault();
  };

  //crud skills
  const handleSkillNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
    skills.map((skill) =>
      skill.cat_id.toString() === event.currentTarget.name
        ? (skill.name = event.currentTarget.value)
        : null
    );
  };
  const handleSkillIconNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
    skills.forEach((skill) =>
      skill.cat_id.toString() === event.currentTarget.name
        ? (skill.icon_name = event.currentTarget.value)
        : null
    );
  };
  const handleSkillLevelChanged = (event: ChangeEvent<HTMLSelectElement>) => {
    skills.forEach((skill) =>
      skill.cat_id.toString() === event.currentTarget.name
        ? (skill.skill_level_id = Number.parseInt(event.currentTarget.value))
        : null
    );
  };
  const handleDeleteSkillClick = (skill_id: number) => {
    try {
      let accessToken = localStorage.getItem("accesToken");
      let myHeaders: Headers = new Headers();
      myHeaders.append("Content-Type", "application/json");

      if (accessToken) {
        myHeaders.append("authorization", "Bearer " + accessToken.toString());
      }

      //update personal stuff
      fetch("http://localhost:5000/api/skills/delete", {
        method: "DELETE",
        headers: myHeaders,
        body: JSON.stringify({
          skill_id: skill_id,
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

  //generate the lists
  const listCategories = () => {
    let listItems: any[] = [];
    //add inputs for each categories
    categories.forEach((cat) => {
      listItems.push(
        <li className="skill-cat-li" key={cat.cat_id}>
          <input
            onChange={(val) => {
              handleCatNameChanged(val);
            }}
            type="text"
            defaultValue={cat.name}
            name={cat.cat_id.toString()}
          />
          <i
            onClick={() => handleDeleteCatClick(cat.cat_id)}
            className="fa fa-trash"
          />
        </li>
      );
    });
    //add an input for adding new ones
    listItems.push(
      <li key={"newCat"} className="skill-cat-li">
        <input
          name="new field"
          value={newCategorie}
          onChange={(val) => handleAddCategorieChanged(val)}
          type="text"
        />
        <i onClick={() => handleAddCategorieClick()} className="fa fa-plus" />
      </li>
    );
    return listItems;
  };
  const listSkills = () => {
    let catLists: any[] = [];

    categories.forEach((cat) => {
      let catSkills: any[] = [];
      skills.forEach((skill) =>
        cat.cat_id === skill.cat_id
          ? catSkills.push(
              <li key={skill.skill_id}>
                <input
                  name={skill.cat_id.toString()}
                  type="text"
                  onChange={(val) => handleSkillNameChanged(val)}
                  defaultValue={skill.name}
                />
                <input
                  name={skill.cat_id.toString()}
                  type="text"
                  defaultValue={skill.icon_name}
                  onChange={(val) => handleSkillIconNameChanged(val)}
                />
                <select
                  onChange={(val) => handleSkillLevelChanged(val)}
                  name={skill.cat_id.toString()}
                  defaultValue={skill.skill_level_id}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
                <i
                  onClick={() => handleDeleteSkillClick(skill.skill_id)}
                  className="fa fa-trash"
                />
              </li>
            )
          : null
      );

      let list = (
        <div key={"list_" + cat.cat_id} className="skill-cat-input">
          <label>{cat.name}</label>
          <ul className="catSkillList">{catSkills}</ul>
        </div>
      );

      catLists.push(list);
    });

    return catLists;
  };
  const emptySkillFields = () => {
    let catOptions: ReactNode[] = [];
    categories.forEach((cat) =>
      catOptions.push(
        <option key={cat.cat_id} value={cat.cat_id}>
          {cat.name}
        </option>
      )
    );
    return (
      <div className="empty-skill-container">
        <div className="empty-skill-input">
          <label>name</label>
          <input
            value={newSkillName}
            onChange={(val) => handleAddSkillNameChanged(val)}
            type="text"
          />
        </div>
        <div className="empty-skill-input">
          <label>icon</label>
          <input
            value={newSkillIconName}
            onChange={(val) => handleAddSkillIconNameChanged(val)}
            type="text"
          />
        </div>
        <div className="empty-skill-input">
          <label>skill level</label>
          <select
            value={newSkillLevel}
            onChange={(val) => handleAddSkillLevelChanged(val)}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </div>
        <div className="empty-skill-input">
          <label>categorie</label>
          <select
            value={newSkillCat}
            onChange={(val) => handleAddSkillCatChanged(val)}
          >
            {catOptions}
          </select>
        </div>
      </div>
    );
  };

  //form handler
  const handleSubmit = () => {
    try {
      let accessToken = localStorage.getItem("accesToken");
      let myHeaders: Headers = new Headers();
      myHeaders.append("Content-Type", "application/json");

      if (accessToken) {
        myHeaders.append("authorization", "Bearer " + accessToken.toString());
      }

      //update categories
      categories.forEach((uCat) =>
        fetch("%PUBLIC_URL%/api/skills/categories/update", {
          method: "PUT",
          headers: myHeaders,
          body: JSON.stringify({
            cat_id: uCat.cat_id,
            name: uCat.name,
          }),
        })
          .then((res) => res.json())
          .then((val) =>
            val.message ? (setResMsg(val.message), alert(resMsg)) : null
          )
      );

      //update skills
      skills.forEach((uSkill) =>
        fetch("%PUBLIC_URL%ß/api/skills/update", {
          method: "PUT",
          headers: myHeaders,
          body: JSON.stringify({
            cat_id: uSkill.cat_id,
            name: uSkill.name,
            skill_level_id: uSkill.skill_level_id,
            icon_name: uSkill.icon_name,
            skill_id: uSkill.skill_id,
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

  return dataLoaded ? (
    <article>
      <form>
        <div className="skill-cat-input" onClick={() => handleSubmit()}>
          <h2>Skills</h2>
          <span>
            Update <i style={{ fontSize: 15 }} className="fa fa-refresh" />
          </span>
        </div>

        <div className="skill-outer">
          <div className="skill-inner">
            <div className="skill-cat-input">
              <label>Categories</label>
              <ul>{listCategories()}</ul>
            </div>
            <div>{listSkills()}</div>
            <hr />
            <div className="skill-cat-input">
              <label>Add new skill</label>
              {emptySkillFields()}
              <div
                className="remove"
                onClick={(event) => handleAddSkillClick(event)}
              >
                <span>
                  Add <i className="fa fa-plus" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </article>
  ) : (
    <div></div>
  );
};

export default EditSkills;
