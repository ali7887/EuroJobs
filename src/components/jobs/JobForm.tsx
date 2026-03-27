"use client";

import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button/Button";

export default function JobForm() {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "full-time",
    salary: "",
    description: "",
    requirements: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        salary: parseInt(formData.salary),
        employerId: "temp-employer-id", // Replace with actual user ID
        status: "active",
      }),
    });

    if (response.ok) {
      alert("Job posted successfully!");
      setFormData({
        title: "",
        company: "",
        location: "",
        type: "full-time",
        salary: "",
        description: "",
        requirements: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <Input
        label="Job Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />

      <Input
        label="Company"
        value={formData.company}
        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        required
      />

      <Input
        label="Location"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        required
      />

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Job Type
        </label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        >
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="contract">Contract</option>
        </select>
      </div>

      <Input
        label="Salary"
        type="number"
        value={formData.salary}
        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
        required
      />

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg h-32"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Requirements
        </label>
        <textarea
          value={formData.requirements}
          onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg h-32"
          required
        />
      </div>

      <Button type="submit" className="w-full">
        Post Job
      </Button>
    </form>
  );
}
