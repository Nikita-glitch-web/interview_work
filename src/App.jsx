
import './App.css';
import { Header } from './components/Header/Header';
import { LandingBanner } from './components/LandingBanner/LandingBanner';
import TeamMembers from './components/Team-members/TeamMembers';

function App() {
  return (
    <div>
      <Header />
      <LandingBanner />
      <TeamMembers />
    </div>
  );
}

export default App
