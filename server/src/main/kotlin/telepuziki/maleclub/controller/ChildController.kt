package telepuziki.maleclub.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*
import telepuziki.maleclub.model.Child
import telepuziki.maleclub.repository.ChildRepository
import telepuziki.maleclub.security.details.UserDetailsImpl

@CrossOrigin(origins = ["http://localhost:3000"])
@RestController
@RequestMapping("/api/v1/child")
class ChildController(@Autowired val childRepository: ChildRepository) {
    @GetMapping("/list")
    fun getAllChildren(): List<Child> {
        return childRepository.findAll()
    }

    @GetMapping("/get")
    fun getChildrenById(
        @RequestParam id: Long,
        @AuthenticationPrincipal userDetails: UserDetailsImpl
    ): ResponseEntity<Child?> {
        val findChild = childRepository.findByIdOrNull(id)
        if (userDetails.getAuthorities().first().authority == "admin")
            return ResponseEntity(findChild, HttpStatus.OK)
        if (findChild != null && findChild.userId != userDetails.getId())
            return ResponseEntity(null, HttpStatus.FORBIDDEN)
        return ResponseEntity(findChild, HttpStatus.OK)
    }

    @PostMapping("/add")
    fun addChild(
        @RequestBody child: Child,
        @AuthenticationPrincipal userDetails: UserDetailsImpl
    ): ResponseEntity<Boolean> {
        val currentUserId = userDetails.getId()
        if (child.userId == -1L) {
            child.userId = currentUserId
        }
        else if (child.userId != currentUserId && userDetails.getAuthorities().first().authority != "admin")
            return ResponseEntity(false, HttpStatus.FORBIDDEN)
        childRepository.save(child)
        return ResponseEntity(true, HttpStatus.OK)
    }
}