import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faXmark,
    faSearch,
    faPaperclip,
    faPaperPlane
} from "@fortawesome/free-solid-svg-icons";

import { HistoryItem } from "../../utils/types";

interface HistorySidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const apiUrl = process.env.REACT_APP_API_URL;

export default function HistorySidebar(props: HistorySidebarProps) {
    const [histories, setHistories] = useState<HistoryItem[]>([]);
    const [filteredHistories, setFilteredHistories] = useState<HistoryItem[]>([]);
    const [searchString, setSearchString] = useState<string>("");

    const email = useSelector((state: any) => state.user.email);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${apiUrl}/history?email=${email}`);
                const data = await response.json();
                setHistories(data.histories);
                setFilteredHistories(data.histories);
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, [email]);

    useEffect(() => {
        const filteredHistories = histories.filter((item) => {
            return item.prompt.includes(searchString) || item.initialUrl.includes(searchString);
        })
        setFilteredHistories(filteredHistories);
    }, [searchString, histories])

    const { sidebarOpen, setSidebarOpen } = props;
    return (
        <div>
            {sidebarOpen && <div
                className="fixed inset-0 bg-gray-900 bg-opacity-50"
                onClick={() => setSidebarOpen(false)}
            />}
            <div
                className={`fixed w-full sm:w-[500px] h-full flex flex-col px-6 py-8
                    transition-all duration-300 bg-secondary dark:bg-[#0E0C16] 
                    shadow-[-2px_0_4px_-1px_rgba(0,0,0,0.5)] dark:shadow-[-2px_0_4px_-1px_rgba(255,255,255,0.5)] 
                    ${sidebarOpen ? "right-0" : "-right-[100%] sm:-right-[510px]"}`}
            >
                <div className="flex w-full justify-between items-center px-2 ms-2 md:ms-0">
                    <div className="flex w-[calc(100%-50px)] items-center">
                        <div
                            className={`flex justify-center items-center p-2 sm:p-3 rounded-full 
                                    transition-all duration-200 cursor-pointer text-gray-700 text-white 
                                    bg-gradient-primary`}
                        >
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        <h2 className="ms-2 text-lg text-gray-700 dark:text-white truncate">
                            {email.split("@")[0]}
                        </h2>
                    </div>
                    <div
                        className="flex justify-center items-center cursor-pointer text-gray-700 dark:text-white"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                </div>
                <h2 className="mt-6 px-2 text-xl font-bold text-gray-700 dark:text-white">History</h2>
                <div className="px-2">
                    <div className="flex items-center relative mt-4 text-gray-700">
                        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <FontAwesomeIcon icon={faSearch} />
                        </span>
                        <input
                            className="w-full border border-gray-700 rounded-full pl-8 pr-4 py-1.5 outline-none"
                            placeholder="Search your task history..."
                            value={searchString}
                            onChange={(e) => setSearchString(e.target.value)}
                        />
                    </div>
                </div>
                <div className="w-full h-[1px] border-b mt-4"></div>
                <div
                    className="flex-grow overflow-auto w-full mt-4 px-2
                                [&::-webkit-scrollbar]:w-2
                                [&::-webkit-scrollbar-track]:rounded-full
                                [&::-webkit-scrollbar-track]:bg-gray-100/20
                                [&::-webkit-scrollbar-thumb]:rounded-full
                                [&::-webkit-scrollbar-thumb]:bg-gray-300/40
                                dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
                >
                    {filteredHistories.map((item, index) => {
                        const now = new Date();
                        const past = new Date(item.createdAt!);
                        const relativeDays = (now.getTime() - past.getTime()) / (24 * 60 * 60 * 1000);
                        let dateString = "Today";
                        if (relativeDays > 1) {
                            dateString = `${Math.floor(relativeDays)} Days ago`;
                        } else if (relativeDays > 30) {
                            dateString = "Months Ago"
                        }

                        return (
                            <div
                                key={`history_${index}`}
                                className="w-full px-4 py-2 mb-2 rounded-xl border border-gray-400 border-dashed text-gray-700 dark:text-white"
                            >
                                <div className="flex flex-col items-start sm:flex-row sm:justify-between sm:items-center w-full">
                                    <h2 className="w-full font-bold truncate">
                                        {item.prompt}
                                    </h2>
                                    <h2 className="text-sm w-48 sm:text-right">
                                        {dateString}
                                    </h2>
                                </div>
                                <h2 className="mt-2 truncate">
                                    {item.prompt}
                                </h2>
                                <div className="flex w-full mt-1 justify-between items-center">
                                    <span className="flex w-[calc(100%-50px)] items-center">
                                        <FontAwesomeIcon icon={faPaperclip} />
                                        <h2 className="underline w-full ms-2 truncate">
                                            {item.initialUrl}
                                        </h2>
                                    </span>
                                    <button className="flex justify-center items-center rounded-full p-2 bg-primary text-white">
                                        <FontAwesomeIcon icon={faPaperPlane} />
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}