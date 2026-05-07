import React, { useState } from "react";
import axios from "axios";

const ViewExtraction = () => {
    const [text, setText] = useState("");
    const [table, setTable] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // 🔹 Extract raw text
    const handleExtractText = async (fileUrl) => {
        try {
            setLoading(true);
            setError("");

            const filename = decodeURIComponent(fileUrl.split("/").pop());

            const res = await axios.get(
                `http://127.0.0.1:5000/extract/${filename}`
            );

            setText(res.data.text);
            setTable([]); // clear table if switching

        } catch (err) {
            console.log(err);
            setError("Failed to extract text");
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Extract structured timetable
    const handleExtractTable = async (fileUrl) => {
        try {
            setLoading(true);
            setError("");

            const filename = decodeURIComponent(fileUrl.split("/").pop());

            const res = await axios.get(
                `http://127.0.0.1:5000/extract-structured/${filename}`
            );

            setTable(res.data.data);
            setText(""); // clear raw text

        } catch (err) {
            console.log(err);
            setError("Failed to extract table");
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Example file (replace with your uploaded file URL)
    const fileUrl = "http://127.0.0.1:5000/uploads/sample.pdf";

    return (
        <div className="md:ml-[30%] min-h-screen bg-gray-100 p-6">

            <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

                {/* Header */}
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Timetable Extraction
                </h1>

                {/* Buttons */}
                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => handleExtractText(fileUrl)}
                        className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-green-500"
                    >
                        Extract Text
                    </button>

                    <button
                        onClick={() => handleExtractTable(fileUrl)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Extract Table
                    </button>
                </div>

                {/* Loading */}
                {loading && (
                    <p className="text-gray-500">Processing PDF...</p>
                )}

                {/* Error */}
                {error && (
                    <p className="text-red-500">{error}</p>
                )}

                {/* 🔹 RAW TEXT VIEW */}
                {text && (
                    <div className="bg-gray-100 p-4 rounded-lg mt-4 max-h-[400px] overflow-y-auto">
                        <h2 className="font-semibold mb-2">Extracted Text:</h2>
                        <pre className="text-sm whitespace-pre-wrap">
                            {text}
                        </pre>
                    </div>
                )}

                {/* 🔹 TABLE VIEW */}
                {table.length > 0 && (
                    <div className="mt-6 overflow-x-auto">
                        <h2 className="font-semibold mb-2">Timetable:</h2>

                        <table className="w-full border rounded-lg overflow-hidden">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="p-3 border">Day</th>
                                    <th className="p-3 border">Time</th>
                                    <th className="p-3 border">Subject</th>
                                </tr>
                            </thead>
                            <tbody>
                                {table.map((row, index) => (
                                    <tr key={index} className="text-center hover:bg-gray-50">
                                        <td className="p-3 border">{row.day}</td>
                                        <td className="p-3 border">{row.time}</td>
                                        <td className="p-3 border">{row.subject}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

            </div>

        </div>
    );
};

export default ViewExtraction;