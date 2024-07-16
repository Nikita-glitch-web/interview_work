// eslint-disable-next-line no-unused-vars
import React from "react";
import style from "./TeamMembers.module.css";

const TeamMembers = () => {
  const members = [
    {
      name: "Salvador Stewart Flynn Thomas",
      position: "Leading specialist of the department of cent... ",
      email: "frontend_develop@gmail.com",
      phone: "+38 (098) 278 76 24",
      photo: "https://via.placeholder.com/80",
    },
    {
      name: "Takamaru Ayako Jurrien",
      position: "Lead Independent Director",
      email: "Takamurug@gmail.com",
      phone: "+38 (098) 278 90 24",
      photo: "https://via.placeholder.com/80",
    },
    {
      name: "Ilya",
      position: "Co-Founder and CEO",
      email: "Ilya_founder@gmail.com",
      phone: "+38 (098) 235 44 24",
      photo: "https://via.placeholder.com/80",
    },
    {
      name: "Alexandre",
      position: "Lead Independent Director",
      email: "Alexandr_develop@gmail.com",
      phone: "+38 (098) 198 44 24",
      photo: "https://via.placeholder.com/80",
    },
    {
      name: "Winny",
      position: "Former Senior Director",
      email: "Winny_develop@gmail.com",
      phone: "+38 (098) 278 22 88",
      photo: "https://via.placeholder.com/80",
    },
    {
      name: "Simon",
      position: "President of Commerce",
      email: "Simon@gmail.com",
      phone: "+38 (098) 278 44 00",
      photo: "https://via.placeholder.com/80",
    },
  ];

 
  return (
    <div className={style.team_members}>
      <h2 className={style.members_title}>Working with GET request</h2>
      <div className={style.members_grid}>
        {members.map((member, index) => (
          <div key={index} className={style.member_card}>
            <img
              src={member.photo}
              alt={member.name}
              className={style.member_photo}
            />
            <h3 className={style.member_title}>{member.name}</h3>
            <p className={style.member_text}>{member.position}</p>
            <p className={style.member_text}>{member.email}</p>
            <p className={style.member_text_phone}>{member.phone}</p>
          </div>
        ))}
      </div>
      <div className={style.btn_wrapper}>
        <button className={style.btn}>Show more</button>
      </div>
    </div>
  );
};

export default TeamMembers;
