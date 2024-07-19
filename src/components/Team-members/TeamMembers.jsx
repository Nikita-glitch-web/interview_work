// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import style from "./TeamMembers.module.css";
import axios from "axios";
import { Button } from "../Controls/Button";
import { Preloader } from "../Form/components";

const TeamMembers = () => {
  const [members, setMembers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchMembers(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMembers = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=3`
      );
      if (response.data.users.length > 0) {
        setMembers((prevMembers) => [...prevMembers, ...response.data.users]);
      } else {
        setHasMore(false);
      }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
    fetchMembers(page + 1);
  };

  const handleImageError = (event) => {
    event.target.src = "https://via.placeholder.com/80";
    event.target.className = style.member_photo;
  };

  return (
    <div id="teamMembers" className={style.team_members}>
      <h2 className={style.members_title}>Working with GET request</h2>
      <div className={style.members_grid}>
        <ul className={style.members_list}>
          {members.map((member, index) => (
            <li key={index} className={style.member_card}>
              <img
                src={member.photo}
                alt={member.name}
                className={style.member_photo}
                onError={handleImageError}
              />
              <p className={style.member_text}>{member.name}</p>
              <p className={style.member_text}>{member.position}</p>
              <p className={style.member_text}>{member.email}</p>
              <p className={style.member_text_phone}>{member.phone}</p>
            </li>
          ))}
        </ul>
      </div>
      {loading && <Preloader />}
      {error && <div>Error: {error.message}</div>}
      <div className={style.btn_wrapper}>
        {hasMore && !loading && (
          <Button text="Show more" onClick={handleShowMore} />
        )}
      </div>
    </div>
  );
};

export default TeamMembers;
