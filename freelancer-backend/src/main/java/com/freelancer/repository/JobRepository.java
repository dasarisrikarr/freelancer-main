package com.freelancer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.freelancer.model.Job;

public interface JobRepository extends JpaRepository<Job, Long> {}
