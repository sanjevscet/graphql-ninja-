import AddClientModel from "../Components/AddClientModel";
import AddProjectModal from "../Components/AddProjectModal";
import Clients from "../Components/Clients";
import Projects from "../Components/Projects";

export default function Home() {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddClientModel />
        <AddProjectModal />
      </div>

      {/* list Projects */}
      <Projects />
      <hr />
      {/* list Clients */}
      <Clients />
    </>
  );
}
