import ChatSection from "../../components/ChatSection";
import ChartSection from "../../components/ChartSection";
import CounterSection from "../../components/CounterSection";

const TeacherHome = () => {

    return (
        <>
            <div className="xl:mx-6 flex flex-col gap-4">
                <CounterSection />
                <ChartSection />
                <ChatSection />
            </div>
        </>
    );
}

export default TeacherHome;