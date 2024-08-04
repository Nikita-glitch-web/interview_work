
import { useEffect } from 'react';
import './App.css';
import { UploadImageForm } from './components/Form/Form';
import { Header } from './components/Header/Header';
import { LandingBanner } from './components/LandingBanner/LandingBanner';
import { TeamMembers } from './components/Team-members/TeamMembers';

function App() {
  useEffect(() => {
    console.log("App works")
  }, [])
  return (
    <div className="content">
      <Header />
      <div className="content_wrapper">
        <LandingBanner />
        <TeamMembers />
        <UploadImageForm />
      </div>
    </div>
  );
}

export default App
