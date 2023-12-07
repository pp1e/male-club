package telepuziki.maleclub.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.web.bind.annotation.*
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

    @GetMapping("/get")
    fun getChildrenById(@RequestParam id: Long): Child? {
        return childRepository.findByIdOrNull(id)
    }

    @PostMapping("/add")
    fun addChild(@RequestBody child: Child): Child {
        return childRepository.save(child)
    }
}