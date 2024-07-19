# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


big midle small xsmall

.team_members {
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    margin: 20px auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.members_grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.member_card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 380px;
  max-height: 254px;
  height: 100%;
}

@media (max-width: 768px) {
    .members_grid {
        grid-template-columns: repeat(2, 1fr);

    }
    .member_card {
      width: 344px;
    }
}

@media (max-width: 368px) {
    .members_grid {
        grid-template-columns: 1fr;
    }
}

.member_text_phone {
  padding-bottom: 20px;
  font-family: "Nunito";
  font-size: var(--font-size-regular);
  font-weight: 400;
  line-height: 26px;
  text-align: center;
  margin: 0px;
}

.member_photo {
  border-radius: 50%;
  height: 70px;
  width: 70px;
  object-fit: cover;
  margin: 0px;
  margin-top: 20px;
}

.show-more-button {
  background-color: #ffcc00;
  border: none;
  padding: 10px 20px;
  font-size: var(--font-size-regular);
  cursor: pointer;
  margin-top: 20px;
}

.btn {
  width: 120px;
  height: 34px;
  background: var(--primary-color);
  color: #000000de;
  font-family: "Nunito";
  font-size: var(--font-size-regular);
  font-family: "Nunito", sans-serif;
  text-align: center;
  border-radius: 80px;
  line-height: 26px;
  border: none;
}

.btn_wrapper {
  padding-top: 4%;
}

.members_title {
  font-family: "Nunito";
  font-size: 40px;
  font-weight: 400;
  line-height: 40px;
  text-align: center;
  padding-top: 10%;
}

.member_text {
  font-size: var(--font-size-regular);
  font-weight: 400;
  line-height: 26px;
  text-align: center;
  margin: 0px;
}

.member_title {
  font-size: var(--font-size-regular);
  font-weight: 400;
  line-height: 26px;
  text-align: center;
  padding-bottom: 20px;
  padding-top: 20px;
  margin: 0px;
}

.tooltip {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: auto;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 100%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

old styles