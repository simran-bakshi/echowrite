// AudioUploader.jsx
import { useState, useEffect } from "react";
import axios from 'axios';

const AudioUploader = () => {
    const [file, setFile] = useState(null);
    const [transcription, setTranscription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [copySuccess, setCopySuccess] = useState(false);

    // Initialize theme
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setIsDarkMode(savedTheme === 'dark');
        document.body.className = savedTheme === 'dark' ? 'dark-mode' : 'light-mode';
    }, []);

    // Toggle theme
    const toggleTheme = () => {
        const newTheme = isDarkMode ? 'light' : 'dark';
        setIsDarkMode(!isDarkMode);
        localStorage.setItem('theme', newTheme);
        document.body.className = newTheme === 'dark' ? 'dark-mode' : 'light-mode';
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setTranscription("");
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type.startsWith('audio/')) {
            setFile(droppedFile);
            setTranscription("");
        }
    };

    // UPDATED VERSION (using relative URL + "audio" field)
    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('audio', file); // IMPORTANT: Must match backend Multipart param name

        setIsLoading(true);

        try {
            const response = await axios.post('/api/transcribe', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            // Expecting text response
            setTranscription(response.data);
        } catch (error) {
            console.error("Error:", error);
            setTranscription("Error: Failed to transcribe audio. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const clearFile = () => {
        setFile(null);
        setTranscription("");
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(transcription);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    const downloadTranscription = () => {
        const element = document.createElement("a");
        const file = new Blob([transcription], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "transcription.txt";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div className="app-container">
            {/* Theme Toggle */}
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                {isDarkMode ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="5"/>
                        <line x1="12" y1="1" x2="12" y2="3"/>
                        <line x1="12" y1="21" x2="12" y2="23"/>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                        <line x1="1" y1="12" x2="3" y2="12"/>
                        <line x1="21" y1="12" x2="23" y2="12"/>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                    </svg>
                )}
            </button>

            <div className="header">
                <div className="icon-wrapper">
                    <div className="gradient-ring"></div>
                    <svg className="mic-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                        <line x1="12" y1="19" x2="12" y2="23"/>
                        <line x1="8" y1="23" x2="16" y2="23"/>
                    </svg>
                </div>
                <h1 className="title">EchoWrite</h1>
                <p className="subtitle">Fast, accurate, and effortless transcription</p>
            </div>

            <div className="main-content">
                <div
                    className={`upload-zone ${isDragging ? 'dragging' : ''} ${file ? 'has-file' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    {!file ? (
                        <>
                            <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="17 8 12 3 7 8"/>
                                <line x1="12" y1="3" x2="12" y2="15"/>
                            </svg>
                            <h3>Drop your audio file here</h3>
                            <p>or click to browse</p>

                            <input
                                type="file"
                                accept="audio/*"
                                onChange={handleFileChange}
                                className="file-input"
                                id="file-upload"
                            />

                            <label htmlFor="file-upload" className="file-label">
                                Choose File
                            </label>

                            <span className="supported-formats">
                                Supports MP3, WAV, M4A, and more
                            </span>
                        </>
                    ) : (
                        <div className="file-selected">
                            <div className="music-animation">
                                <svg className="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 18V5l12-3v13M9 18c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"/>
                                </svg>
                                <div className="sound-wave">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>

                            <div className="file-info">
                                <span className="file-name">{file.name}</span>
                                <span className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                            </div>

                            <button onClick={clearFile} className="clear-btn" aria-label="Remove file">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18"/>
                                    <line x1="6" y1="6" x2="18" y2="18"/>
                                </svg>
                            </button>
                        </div>
                    )}
                </div>

                {file && (
                    <button
                        className={`transcribe-btn ${isLoading ? 'loading' : ''}`}
                        onClick={handleUpload}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner"></span>
                                Transcribing...
                            </>
                        ) : (
                            <>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                                </svg>
                                Start Transcription
                            </>
                        )}
                    </button>
                )}

                {transcription && (
                    <div className="result-container">
                        <div className="result-header">
                            <h2>Transcription Result</h2>
                            <div className="action-buttons">

                                <button
                                    className={`copy-btn ${copySuccess ? 'success' : ''}`}
                                    onClick={copyToClipboard}
                                >
                                    {copySuccess ? (
                                        <>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="20 6 9 17 4 12"/>
                                            </svg>
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                                            </svg>
                                            Copy
                                        </>
                                    )}
                                </button>

                                <button className="download-btn" onClick={downloadTranscription}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                        <polyline points="7 10 12 15 17 10"/>
                                        <line x1="12" y1="15" x2="12" y2="3"/>
                                    </svg>
                                    Download
                                </button>

                            </div>
                        </div>

                        <div className="result-text">
                            {transcription}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AudioUploader;
