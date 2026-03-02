import { Navbar, Posts, Sidebar, ViewedPosts } from "./components";
import "./style/global.scss";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main">
        <Sidebar />
        <Posts />
        <ViewedPosts />
      </main>
    </div>
  );
}

export default App;
