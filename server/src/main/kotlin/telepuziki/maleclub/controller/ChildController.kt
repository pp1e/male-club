package telepuziki.maleclub.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import telepuziki.maleclub.model.Child
import telepuziki.maleclub.repository.ChildRepository

@CrossOrigin(origins = ["http://localhost:3000"])
@RestController
@RequestMapping("/api/v1/child")
class ChildController(@Autowired val childRepository: ChildRepository) {
    @GetMapping("/list")
    fun getAllChildren(): List<Child> {
        return childRepository.findAll()
    }

}