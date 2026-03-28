'use client';

import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout';
import { Card, Button, Input, Badge, Modal, Loader } from '@/components/ui';
import styles from './jobs.module.css';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  postedAt: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/jobs');
      const data = await res.json();
      setJobs(data.jobs || []);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Find Your Next Opportunity</h1>
          <Input
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <Loader fullScreen />
        ) : (
          <div className={styles.grid}>
            {filteredJobs.map((job) => (
              <Card key={job.id}>
                <div className={styles.jobCard}>
                  <h3>{job.title}</h3>
                  <p className={styles.company}>{job.company}</p>
                  <div className={styles.meta}>
                    <Badge variant="secondary">{job.type}</Badge>
                    <span>{job.location}</span>
                  </div>
                  <p className={styles.salary}>{job.salary}</p>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setSelectedJob(job)}
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {selectedJob && (
          <Modal
            isOpen={!!selectedJob}
            onClose={() => setSelectedJob(null)}
            title={selectedJob.title}
          >
            <div className={styles.jobDetails}>
              <p><strong>Company:</strong> {selectedJob.company}</p>
              <p><strong>Location:</strong> {selectedJob.location}</p>
              <p><strong>Type:</strong> {selectedJob.type}</p>
              <p><strong>Salary:</strong> {selectedJob.salary}</p>
              <p><strong>Posted:</strong> {selectedJob.postedAt}</p>
              <div className={styles.description}>
                <h4>Description</h4>
                <p>{selectedJob.description}</p>
              </div>
              <Button variant="primary" fullWidth>
                Apply Now
              </Button>
            </div>
          </Modal>
        )}
      </div>
    </MainLayout>
  );
}
