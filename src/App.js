// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SessionList from './screens/SessionList';
import ScoreBoard from './screens/ScoreBoard';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SessionList />} />
                <Route path="/scoreboard/:sessionId" element={<ScoreBoard />} />
            </Routes>
        </Router>
    );
}

export default App;
