
import './App.css';
import { UploadImageForm } from './components/Form/Form';
import { Header } from './components/Header/Header';
import { LandingBanner } from './components/LandingBanner/LandingBanner';
import TeamMembers from './components/Team-members/TeamMembers';
import members from './components/Team-members/constants';

function App() {
  return (
    <div>
      <Header />
      <LandingBanner />
      <TeamMembers members={members} />
      <UploadImageForm />
    </div>
  );
}

export default App
