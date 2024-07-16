// eslint-disable-next-line no-unused-vars
import React from "react";
import style from "./TeamMembers.module.css";
import PropTypes from "prop-types";

const TeamMembers = ({ members }) => {
  

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

TeamMembers.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TeamMembers;
