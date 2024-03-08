import Filters from "./components/Filters";
import MainHeader from "./components/MainHeader";
import MainSection from "./components/MainSection";

export default function App() {

    return (
        <div className="min-h-dvh max-w-screen-2xl font-body bg-light">
            <MainHeader />
            <Filters />
            <MainSection />
        </div>
    )
}
