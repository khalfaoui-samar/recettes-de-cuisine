package com.project.backend.restcontroller;

import com.project.backend.entites.Recette;
import com.project.backend.repository.RecetteRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recettes")
@CrossOrigin(origins = "*")
public class RecetteController {
    private final RecetteRepository recetteRepository;

    public RecetteController(RecetteRepository recetteRepository) {
        this.recetteRepository = recetteRepository;
    }

    @GetMapping
    public List<Recette> getAllRecettes() {
        return recetteRepository.findAll();
    }

    @PostMapping
    public Recette addRecette(@RequestBody Recette recette) {
        return recetteRepository.save(recette);
    }
}
