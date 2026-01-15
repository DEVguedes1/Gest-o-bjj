package com.upbizdigitalsolutions.jiujitsu.repository;

import com.upbizdigitalsolutions.jiujitsu.model.Plano;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanoRepository extends JpaRepository<Plano, Long> {
}
