import SortCamera from "./components/SortCamera";
import DisplayPhotoGroup from "./components/DisplayPhotoGroup";
import { useStateValue } from "./state/state";
import useMarsQuery from "./hooks/useMarsQuery";
import SortRover from "./components/SortRover";
import Footer from "./components/Footer";
import SortSol from "./components/SortSol";
import SubHeading from "./components/shared/SubHeading";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [{ apiData, roverManifest, apiQuery, currentCamera }] = useStateValue();

  const { rover, sol } = apiQuery;

  // Fetch everything
  useMarsQuery();

  const displayGroup =
    currentCamera === "all"
      ? apiData
      : apiData?.filter((obj) => obj.camera.name === currentCamera);

  return (
    <div className="flex flex-col items-center p-2 sm:p-4 md:pt-8 lg:pt-12">
      <ScrollToTop />
      <h1 className="text-4xl md:text-5xl xl:text-6xl text-center font-extrabold pb-4 lg:pb-8">
        Latest photos from Mars 🚀
      </h1>
      <section
        id="sortMenu"
        className="p-4 sm:m-8 md:p-8 md:m-12 lg:mx-20 xl:mx-28  bg-dark rounded-lg shadow-md"
      >
        <div className="flex flex-wrap justify-between">
          <SortRover />
          <SortSol />
        </div>
        <SortCamera />
      </section>

      {displayGroup && displayGroup.length > 0 ? (
        <>
          <SubHeading>
            Displaying photos from rover {rover}, Mars sol{" "}
            {sol === -1 ? roverManifest?.max_sol : sol}
            {currentCamera === "all" ? "" : `, camera "${currentCamera}"`}:
          </SubHeading>
          <DisplayPhotoGroup photoGroup={displayGroup} />
        </>
      ) : (
        <SubHeading>Could not find any photos for that sol...</SubHeading>
      )}
      <Footer />
    </div>
  );
}

export default App;
