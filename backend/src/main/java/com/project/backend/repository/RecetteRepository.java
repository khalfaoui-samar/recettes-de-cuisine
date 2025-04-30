package com.project.backend.repository;

import com.project.backend.entites.Recette;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecetteRepository extends JpaRepository<Recette, Long> {
}
