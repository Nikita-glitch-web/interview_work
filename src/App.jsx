
import './App.css';
import { UploadImageForm } from './components/Form/Form';
import { Header } from './components/Header/Header';
import { LandingBanner } from './components/LandingBanner/LandingBanner';
import TeamMembers from './components/Team-members/TeamMembers';
import members from './components/Team-members/content';

function App() {
  return (
    <div className="content">
      <Header />
      <div className="content_wrapper">
        <LandingBanner />
        <TeamMembers members={members} />
        <UploadImageForm />
      </div>
    </div>
  );
}

export default App
