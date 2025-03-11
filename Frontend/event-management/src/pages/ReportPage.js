import React, { useState } from 'react';

function ReportPage() {
    const [isLoading, setIsLoading] = useState(false);

    const downloadReport = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/report', {
                method: 'GET',
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'attendance_report.csv';
                document.body.appendChild(a);
                a.click();
                a.remove();
            } else {
                console.error('Error downloading report:', response.status);
            }
        } catch (error) {
            console.error('Error downloading report:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1>Attendance Report</h1>
            <button onClick={downloadReport} disabled={isLoading}>
                {isLoading ? 'Downloading...' : 'Download Report'}
            </button>
        </div>
    );
}

export default ReportPage;