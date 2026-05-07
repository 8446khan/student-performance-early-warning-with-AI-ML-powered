import React, { useState, useEffect } from "react";
import axios from "axios";

const Timetable = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([]);
    const [extractedData, setExtractedData] = useState({}); // store structured extraction per file

    // ---------------- FETCH FILES ----------------
    const fetchFiles = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:5000/timetables");
            setFiles(res.data.files);
        } catch (err) {
            console.log("Fetch error:", err);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    // ---------------- FILE CHANGE ----------------
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // ---------------- UPLOAD ----------------
    const handleUpload = async () => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token || role !== "coordinator") {
            alert("Access denied. Only coordinator can upload.");
            return;
        }
        if (!file) {
            alert("Please select a file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);

            const res = await axios.post(
                "http://127.0.0.1:5000/upload-timetable",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(res.data.message);
            setFile(null);
            fetchFiles();
        } catch (error) {
            console.log(error);
            alert("Upload failed");
        } finally {
            setLoading(false);
        }
    };

    // ---------------- DELETE ----------------
    const handleDelete = async (fileUrl) => {
        try {
            const token = localStorage.getItem("token");
            const role = localStorage.getItem("role");

            if (!token || role !== "coordinator") {
                alert("Only coordinator can delete");
                return;
            }

            const filename = decodeURIComponent(fileUrl.split("/").pop());

            await axios.delete(
                `http://127.0.0.1:5000/delete-timetable/${filename}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("Deleted successfully");
            fetchFiles();
        } catch (error) {
            console.log(error);
            alert("Delete failed");
        }
    };

    // ---------------- EXTRACT ----------------
    const handleExtract = async (fileUrl) => {
        try {
            setLoading(true);

            const filename = decodeURIComponent(fileUrl.split("/").pop());

            const res = await axios.get(
                `http://127.0.0.1:5000/extract/${filename}`
            );

            setExtractedData((prev) => ({
                ...prev,
                [fileUrl]: res.data.data || [] // dynamic rows
            }));

        } catch (error) {
            console.log(error);
            alert("Extraction failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="md:ml-[30%] min-h-screen bg-gray-100 p-6">

            {/* ---------------- UPLOAD SECTION ---------------- */}
            <div className="flex items-center justify-center">
                <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-lg">

                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        Upload Timetable
                    </h1>
                    <p className="text-gray-500 mb-6 text-sm">
                        Upload timetable in PDF format
                    </p>

                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-slate-700 transition">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <p className="text-gray-500 text-sm">
                                Click to upload or drag & drop
                            </p>
                            <p className="text-xs text-gray-400">
                                Only PDF supported
                            </p>
                        </div>
                        <input
                            type="file"
                            className="hidden"
                            accept=".pdf"
                            onChange={handleFileChange}
                        />
                    </label>

                    {file && (
                        <div className="mt-4 p-3 bg-gray-100 rounded-lg flex justify-between items-center">
                            <span className="text-sm text-gray-700 truncate">
                                {file.name}
                            </span>
                            <button
                                onClick={() => setFile(null)}
                                className="text-red-500 text-sm hover:underline"
                            >
                                Remove
                            </button>
                        </div>
                    )}

                    <button
                        onClick={handleUpload}
                        disabled={loading}
                        className={`w-full mt-6 py-3 rounded-xl text-white font-medium transition 
                            ${loading
                                ? "bg-gray-400"
                                : "bg-slate-800 hover:bg-green-500"
                            }`}
                    >
                        {loading ? "Uploading..." : "Upload Timetable"}
                    </button>
                </div>
            </div>

            {/* ---------------- VIEW SECTION ---------------- */}
            <div className="mt-10 max-w-5xl mx-auto">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Uploaded Timetables
                </h2>

                {files.length === 0 ? (
                    <p className="text-gray-500">No timetables uploaded</p>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        {files.map((fileUrl, index) => (
                            <div
                                key={index}
                                className="bg-white p-4 rounded-xl shadow"
                            >
                                {/* PDF Preview */}
                                <iframe
                                    src={fileUrl}
                                    title="pdf"
                                    className="w-full h-40 rounded"
                                />

                                {/* ACTIONS */}
                                <div className="mt-3 flex justify-between items-center">
                                    <a
                                        href={fileUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        Open
                                    </a>

                                    <button
                                        onClick={() => handleExtract(fileUrl)}
                                        className="text-sm text-green-600 hover:underline"
                                    >
                                        Extract
                                    </button>

                                    <button
                                        onClick={() => handleDelete(fileUrl)}
                                        className="text-sm text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>

                                {/* ---------------- EXTRACTED TABLE ---------------- */}
                                {extractedData[fileUrl] && extractedData[fileUrl].length > 0 && (
                                    <div className="mt-4 overflow-x-auto">
                                        <p className="text-sm font-semibold mb-2 text-gray-700">
                                            Extracted Timetable:
                                        </p>

                                        <table className="w-full border rounded-lg overflow-hidden text-sm">
                                            <thead className="bg-gray-200">
                                                <tr>
                                                    {extractedData[fileUrl][0].map((col, idx) => (
                                                        <th key={idx} className="p-2 border">{col}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {extractedData[fileUrl].slice(1).map((row, i) => (
                                                    <tr key={i} className="text-center hover:bg-gray-50">
                                                        {row.map((cell, j) => (
                                                            <td key={j} className="p-2 border">{cell}</td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Timetable;



