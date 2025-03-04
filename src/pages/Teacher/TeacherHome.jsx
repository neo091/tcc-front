import ChatSection from "../../components/ChatSection";
import ChartSection from "../../components/ChartSection";
import CounterSection from "../../components/CounterSection";

const TeacherHome = () => {

    return (
        <>
            <div className="flex flex-col gap-4">
              
                <ChartSection />
                <ChatSection />
                
            </div>
        </>
    );
}

export default TeacherHome;