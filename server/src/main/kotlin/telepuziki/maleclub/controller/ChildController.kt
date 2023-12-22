package telepuziki.maleclub.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*
import telepuziki.maleclub.model.Child
import telepuziki.maleclub.repository.ChildRepository
import telepuziki.maleclub.repository.UserRepository
import telepuziki.maleclub.security.details.UserDetailsImpl


@CrossOrigin(origins = ["http://localhost:3000"])
@RestController
@RequestMapping("/api/v1/child")
class ChildController(
    @Autowired val childRepository: ChildRepository,
    @Autowired val userRepository: UserRepository
) {
    @GetMapping("/list")
    fun getAllChildren(
        @AuthenticationPrincipal userDetails: UserDetailsImpl
    ): ResponseEntity<List<Child>> {
        if (userDetails.isAdmin())
            return ResponseEntity(
                childRepository.findAll(),
                HttpStatus.OK
            )
        val parentId = userDetails.getId()
        return ResponseEntity(
            childRepository.findAllByUserId(parentId),
            HttpStatus.OK
        )
    }

    @GetMapping("/get")
    fun getChildrenById(
        @RequestParam id: Long,
        @AuthenticationPrincipal userDetails: UserDetailsImpl
    ): ResponseEntity<Child?> {
        val findChild = childRepository.findByIdOrNull(id)
        if (findChild != null &&
            findChild.userId != userDetails.getId() &&
            userDetails.isNotAdmin()
        )
            return ResponseEntity(null, HttpStatus.FORBIDDEN)
        return ResponseEntity(findChild, HttpStatus.OK)
    }

    @PostMapping("/add")
    fun addChild(
        @RequestBody child: Child,
        @AuthenticationPrincipal userDetails: UserDetailsImpl
    ): ResponseEntity<Boolean> {
        val currentUserId = userDetails.getId()
        var childToAdd = child
        if (child.userId == null) {
            childToAdd = child.copy(userId = currentUserId)
        } else {
            if (!userRepository.existsById(child.userId))
                return ResponseEntity(false, HttpStatus.BAD_REQUEST)
            if (child.userId != currentUserId && userDetails.isNotAdmin())
                return ResponseEntity(false, HttpStatus.FORBIDDEN)
        }
        childRepository.save(childToAdd)
        return ResponseEntity(true, HttpStatus.OK)
    }

    @DeleteMapping("/delete/{id:\\d+}")
    fun deleteChildById(
        @PathVariable("id") id: Long,
        @AuthenticationPrincipal userDetails: UserDetailsImpl
    ): ResponseEntity<Boolean> {
        val currentUserId = userDetails.getId()
        val child = childRepository.findByIdOrNull(id)
        if (child == null)
            return ResponseEntity(false, HttpStatus.NOT_FOUND)
        if (child.userId != currentUserId && userDetails.isNotAdmin())
            return ResponseEntity(false, HttpStatus.FORBIDDEN)
        childRepository.deleteById(id)
        return ResponseEntity(true, HttpStatus.OK)
    }

    @PutMapping("/update/{id:\\d+}")
    fun updateChildById(
        @PathVariable("id") id: Long,
        @RequestBody child: Child,
        @AuthenticationPrincipal userDetails: UserDetailsImpl
    ): ResponseEntity<Boolean> {
        val currentUserId = userDetails.getId()
        if (!childRepository.existsById(id))
            return ResponseEntity(false, HttpStatus.NOT_FOUND)
        if (child.userId != currentUserId && userDetails.isNotAdmin())
            return ResponseEntity(false, HttpStatus.FORBIDDEN)

        val newChild = child.copy(id = id)
        childRepository.save(newChild)
        return ResponseEntity(true, HttpStatus.OK)
    }
}
