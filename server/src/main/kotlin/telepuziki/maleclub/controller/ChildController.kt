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
        @AuthenticationPrincipal userDetails: UserDetailsImpl,
        @RequestParam("age_filter") ageFilter: Boolean = false
    ): ResponseEntity<List<Any>> {
        val childList: List<Any>
        if (userDetails.isAdmin()) {
            childList = childRepository.getChildList(ageFilter = ageFilter)
        }
        else {
            val parentId = userDetails.getId()
            childList = childRepository.getChildList(
                parentId = parentId,
                ageFilter = ageFilter
            )
        }
        var childListMapped = listOf<Map<String, Any>>()
        for (childListItem in childList) {
            val childListItemMapped = mapOf(
                "id" to childListItem[0],
                "firstname" to childListItem[1],
                "peculiarities" to childListItem[2],
                "count_visit" to childListItem[3],
                "user_id" to childListItem[4],
                "birthdate" to childListItem[5]
            )
            childListMapped = childListMapped.plus(childListItemMapped)
        }
        return ResponseEntity(
            childListMapped,
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
        @RequestParam(name = "firstname") firstname: String,
        @RequestParam(name = "peculiarities") peculiarities: String,
        @AuthenticationPrincipal userDetails: UserDetailsImpl
    ): ResponseEntity<Boolean> {
        val currentUserId = userDetails.getId()
        val child = childRepository.findByIdOrNull(id)
        if (child == null)
            return ResponseEntity(false, HttpStatus.NOT_FOUND)
        if (child.userId != currentUserId && userDetails.isNotAdmin())
            return ResponseEntity(false, HttpStatus.FORBIDDEN)
        val newChild = child.copy(firstname = firstname, peculiarities = peculiarities)
        childRepository.save(newChild)
        return ResponseEntity(true, HttpStatus.OK)
    }
}
