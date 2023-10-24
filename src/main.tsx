import ReactDOM from "react-dom/client";
import "./index.css";
import { EcgContextProvider } from "./context";
import { Layout } from "./layout/Layout.tsx";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { FileUploadsContextProvider } from "./context/FileUploads/FileUploadsProvider.tsx";
import { HomePage } from "./modules/HomePage/HomePage.tsx";
import { NotesContextProvider } from "./context/NotesContext/NotesContextProvider.tsx";
import { Notes } from "./modules/Notes/Notes.tsx";
import { navigation } from "./navigation";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <Layout>
      <FileUploadsContextProvider>
        <EcgContextProvider>
          <NotesContextProvider>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path={navigation.notes} element={<Notes />} />
              <Route path="*" element={<div>Looks like you're lost</div>} />
            </Routes>
          </NotesContextProvider>
        </EcgContextProvider>
      </FileUploadsContextProvider>
    </Layout>
  </Router>
);
