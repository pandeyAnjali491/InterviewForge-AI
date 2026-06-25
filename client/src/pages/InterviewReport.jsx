import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ServerUrl } from '../App';
import { BeatLoader } from "react-spinners"
import Step3Report from '../components/Step3Report';

export default function InterviewReport() {
  const { id } = useParams();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      const startTime = Date.now();

      try {
        const result = await axios.get(
          ServerUrl + "/api/interview/report/" + id,
          { withCredentials: true }
        );

        // Minimum loading time = 2500ms
        const elapsed = Date.now() - startTime;
        const remainingTime = Math.max(2500 - elapsed, 0);

        setTimeout(() => {
          setReport(result.data);
          setLoading(false);
        }, remainingTime);

      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  if (loading) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center gap-4'>
        <BeatLoader size={20} />
        <p className='text-gray-500 text-lg animate-pulse'>
          Generating your interview report...
        </p>
      </div>
    );
  }

  return <Step3Report report={report} />;
}